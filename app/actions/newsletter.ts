"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { rateLimitOrThrow } from "@/lib/security/rate-limit";
import { validateHoneypot } from "@/lib/security/honeypot";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { extractTurnstileToken } from "@/lib/security/turnstile-token";
import { getClientIp } from "@/lib/security/ip";
import { getUserAgent } from "@/lib/security/ua";
import { sendNewsletterConfirmEmail } from "@/lib/email/resend";
import { generateToken, hashToken } from "@/lib/crypto/tokens";
import { fieldErrorsFromZod, firstErrorMessage } from "@/lib/zod-error";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const SubscribeSchema = z.object({
  email: z.email(),
  consent: z
    .union([z.boolean(), z.literal("on"), z.string()])
    .optional()
    .transform((v) => v === true || v === "on" || v === "true"),
  turnstileToken: z.string().optional().nullable(),
  pagePath: z.string().max(500).optional(),
  sourcePlacement: z.string().max(200).optional(),
});

export async function subscribeNewsletter(
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const { prisma } = await import("@/lib/db");
    await rateLimitOrThrow("newsletter_subscribe");
    validateHoneypot(formData);

    const raw = {
      email: formData.get("email"),
      consent: formData.get("consent"),
      turnstileToken: extractTurnstileToken(formData),
      pagePath: formData.get("pagePath"),
      sourcePlacement: formData.get("sourcePlacement"),
    };
    const parsed = SubscribeSchema.safeParse(raw);
    if (!parsed.success) {
      const first = fieldErrorsFromZod(parsed.error);
      const msg = first.email?.[0] ?? firstErrorMessage(parsed.error, "Please enter a valid email.");
      return { ok: false, message: msg };
    }

    const { email, consent, turnstileToken, pagePath, sourcePlacement } = parsed.data;
    await verifyTurnstile(turnstileToken ?? null);

    const token = generateToken();
    const tokenHash = hashToken(token);
    const ip = await getClientIp();
    const ua = await getUserAgent();
    const h = await headers();
    const referrer = h.get("referer") ?? undefined;

    const meta = {
      ip: ip ?? undefined,
      ua: ua ? ua.slice(0, 300) : undefined,
      referrer: referrer ? referrer.slice(0, 500) : undefined,
      pagePath: pagePath ?? undefined,
      sourcePlacement: sourcePlacement ?? undefined,
    };

    const existing = await prisma.emailLead.findFirst({
      where: { email, source: "newsletter" },
      orderBy: { createdAt: "desc" },
    });

    if (existing) {
      await prisma.emailLead.update({
        where: { id: existing.id },
        data: {
          tokenHash,
          pagePath: pagePath ?? null,
          consent: consent ?? false,
          confirmed: false,
          confirmedAt: null,
          meta,
        },
      });
    } else {
      await prisma.emailLead.create({
        data: {
          email,
          source: "newsletter",
          pagePath: pagePath ?? null,
          consent: consent ?? false,
          confirmed: false,
          tokenHash,
          tags: [],
          meta,
        },
      });
    }

    const confirmUrl = `${SITE_URL}/newsletter/confirm?token=${encodeURIComponent(token)}`;
    const sendRes = await sendNewsletterConfirmEmail({ email, confirmUrl });
    if (!sendRes.ok)
      return { ok: false, message: sendRes.error ?? "Failed to send confirmation." };

    return { ok: true, message: "Check your inbox to confirm." };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}

const ConfirmSchema = z.object({ token: z.string().min(1, { error: "Invalid link" }) });

export async function confirmNewsletter(
  token: string
): Promise<{ ok: boolean; message: string }> {
  const { prisma } = await import("@/lib/db");
  const parsed = ConfirmSchema.safeParse({ token });
  if (!parsed.success) return { ok: false, message: "Invalid or expired link." };

  const tokenHash = hashToken(parsed.data.token);
  const lead = await prisma.emailLead.findFirst({
    where: { source: "newsletter", tokenHash },
  });
  if (!lead) return { ok: false, message: "Invalid or expired link." };

  await prisma.emailLead.update({
    where: { id: lead.id },
    data: {
      confirmed: true,
      confirmedAt: new Date(),
      tokenHash: null,
    },
  });
  return { ok: true, message: "You're subscribed. We'll be in touch." };
}
