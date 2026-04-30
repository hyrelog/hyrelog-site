"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { rateLimitOrThrow } from "@/lib/security/rate-limit";
import { validateHoneypot } from "@/lib/security/honeypot";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { extractTurnstileToken } from "@/lib/security/turnstile-token";
import { getClientIp } from "@/lib/security/ip";
import { getUserAgent } from "@/lib/security/ua";
import { sendWaitlistThanksEmail } from "@/lib/email/resend";
import { fieldErrorsFromZod, firstErrorMessage } from "@/lib/zod-error";

const WaitlistSchema = z.object({
  email: z.email(),
  name: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  consent: z
    .union([z.boolean(), z.literal("on"), z.string()])
    .optional()
    .transform((v) => v === true || v === "on" || v === "true"),
  turnstileToken: z.string().optional().nullable(),
  pagePath: z.string().max(500).optional(),
});

export async function submitWaitlist(
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const { prisma } = await import("@/lib/db");
    await rateLimitOrThrow("waitlist");
    validateHoneypot(formData);

    const raw = {
      email: formData.get("email"),
      name: formData.get("name"),
      company: formData.get("company"),
      message: formData.get("message"),
      consent: formData.get("consent"),
      turnstileToken: extractTurnstileToken(formData),
      pagePath: formData.get("pagePath"),
    };
    const parsed = WaitlistSchema.safeParse(raw);
    if (!parsed.success) {
      const first = fieldErrorsFromZod(parsed.error);
      const msg = first.email?.[0] ?? firstErrorMessage(parsed.error);
      return { ok: false, message: msg };
    }

    const { email, name, company, message, consent, turnstileToken, pagePath } = parsed.data;
    await verifyTurnstile(turnstileToken ?? null);

    const ip = await getClientIp();
    const ua = await getUserAgent();
    const h = await headers();
    const referrer = h.get("referer") ?? undefined;
    const meta = {
      ip: ip ?? undefined,
      ua: ua ? ua.slice(0, 300) : undefined,
      referrer: referrer ? referrer.slice(0, 500) : undefined,
      pagePath: pagePath ?? undefined,
      submittedAt: new Date().toISOString(),
    };

    const existingLead = await prisma.emailLead.findFirst({
      where: { email, source: "waitlist" },
      orderBy: { createdAt: "desc" },
    });

    if (existingLead) {
      await prisma.emailLead.update({
        where: { id: existingLead.id },
        data: {
          name: name ?? null,
          company: company ?? null,
          message: message ?? null,
          pagePath: pagePath ?? null,
          consent: consent ?? false,
          tags: ["waitlist"],
          meta,
        },
      });
    } else {
      await prisma.emailLead.create({
        data: {
          email,
          source: "waitlist",
          name: name ?? null,
          company: company ?? null,
          message: message ?? null,
          pagePath: pagePath ?? null,
          tags: ["waitlist"],
          consent: consent ?? false,
          meta,
        },
      });
    }

    const sendRes = await sendWaitlistThanksEmail({ email, name: name ?? undefined });
    if (!sendRes.ok)
      return { ok: false, message: sendRes.error ?? "Failed to confirm waitlist signup." };

    return { ok: true, message: "Thanks, you're on the waitlist. We'll keep you posted." };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
