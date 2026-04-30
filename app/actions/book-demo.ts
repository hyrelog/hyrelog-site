"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { rateLimitOrThrow } from "@/lib/security/rate-limit";
import { validateHoneypot } from "@/lib/security/honeypot";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { extractTurnstileToken } from "@/lib/security/turnstile-token";
import { getClientIp } from "@/lib/security/ip";
import { getUserAgent } from "@/lib/security/ua";
import { sendBookDemoLeadEmail } from "@/lib/email/resend";
import { fieldErrorsFromZod, firstErrorMessage } from "@/lib/zod-error";

const BookDemoSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }).max(200),
  email: z.email(),
  company: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  consent: z
    .union([z.boolean(), z.literal("on"), z.string()])
    .optional()
    .transform((v) => v === true || v === "on" || v === "true"),
  turnstileToken: z.string().optional().nullable(),
  pagePath: z.string().max(500).optional(),
});

export async function submitBookDemoLead(
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const { prisma } = await import("@/lib/db");
    await rateLimitOrThrow("book_demo");
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
    const parsed = BookDemoSchema.safeParse(raw);
    if (!parsed.success) {
      const first = fieldErrorsFromZod(parsed.error);
      const msg =
        first.name?.[0] ?? first.email?.[0] ?? firstErrorMessage(parsed.error);
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
        source: "book-demo",
        name,
        company: company ?? null,
        message: message ?? null,
        pagePath: pagePath ?? null,
        tags: ["high-intent"],
        consent: consent ?? false,
        meta: {
          ip: ip ?? undefined,
          ua: ua ? ua.slice(0, 300) : undefined,
          referrer: referrer ? referrer.slice(0, 500) : undefined,
          pagePath: pagePath ?? undefined,
        },
      },
    });

    const res = await sendBookDemoLeadEmail({
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
    if (!res.ok)
      return { ok: false, message: res.error ?? "Failed to submit. Please try again." };

    return { ok: true, message: "Thanks! We'll share waitlist and launch updates soon." };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
