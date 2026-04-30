"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { rateLimitOrThrow } from "@/lib/security/rate-limit";
import { validateHoneypot } from "@/lib/security/honeypot";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { extractTurnstileToken } from "@/lib/security/turnstile-token";
import { getClientIp } from "@/lib/security/ip";
import { getUserAgent } from "@/lib/security/ua";
import { sendContactEmail, sendAutoReply } from "@/lib/email/resend";
import { fieldErrorsFromZod, firstErrorMessage } from "@/lib/zod-error";

const ContactSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }).max(200),
  email: z.email(),
  company: z.string().max(200).optional(),
  message: z.string().min(20, { error: "Message must be at least 20 characters" }).max(10_000),
  consent: z
    .union([z.boolean(), z.literal("on"), z.string()])
    .optional()
    .transform((v) => v === true || v === "on" || v === "true"),
  turnstileToken: z.string().optional().nullable(),
  pagePath: z.string().max(500).optional(),
});

function inferTags(message: string): string[] {
  const m = message.toLowerCase();
  const tags: string[] = [];
  if (/\bsoc\s*2\b|soc2/.test(m)) tags.push("soc2");
  if (/\bgdpr\b/.test(m)) tags.push("gdpr");
  if (/\bfintech\b/.test(m)) tags.push("fintech");
  return tags;
}

export async function submitContact(
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const { prisma } = await import("@/lib/db");
    await rateLimitOrThrow("contact");
    validateHoneypot(formData);

    const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
      consent: formData.get("consent"),
      turnstileToken: extractTurnstileToken(formData),
      pagePath: formData.get("pagePath"),
    };
    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = fieldErrorsFromZod(parsed.error);
      const msg =
        first.name?.[0] ??
        first.email?.[0] ??
        first.message?.[0] ??
        firstErrorMessage(parsed.error);
      return { ok: false, message: msg };
    }

    const { name, email, company, message, consent, turnstileToken, pagePath } = parsed.data;
    await verifyTurnstile(turnstileToken ?? null);

    const ip = await getClientIp();
    const ua = await getUserAgent();
    const h = await headers();
    const referrer = h.get("referer") ?? undefined;

    await prisma.emailLead.create({
      data: {
        email,
        source: "contact",
        name,
        company: company ?? null,
        message,
        pagePath: pagePath ?? null,
        tags: inferTags(message),
        consent: consent ?? false,
        meta: {
          ip: ip ?? undefined,
          ua: ua ? ua.slice(0, 300) : undefined,
          referrer: referrer ? referrer.slice(0, 500) : undefined,
          submittedAt: new Date().toISOString(),
          pagePath: pagePath ?? undefined,
        },
      },
    });

    const res = await sendContactEmail({
      name,
      email,
      company,
      message,
      meta: {
        ip: ip ?? "",
        ua: ua ? ua.slice(0, 200) : "",
        pagePath: pagePath ?? "",
      },
    });
    if (!res.ok) return { ok: false, message: res.error ?? "Failed to send. Please try again." };

    await sendAutoReply(email, name);
    return { ok: true, message: "Thanks! We've received your message and will get back to you soon." };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
