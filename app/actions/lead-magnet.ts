"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { rateLimitOrThrow } from "@/lib/security/rate-limit";
import { validateHoneypot } from "@/lib/security/honeypot";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { extractTurnstileToken } from "@/lib/security/turnstile-token";
import { getClientIp } from "@/lib/security/ip";
import { getUserAgent } from "@/lib/security/ua";
import { sendLeadMagnetEmail } from "@/lib/email/resend";
import { generateToken, hashToken } from "@/lib/crypto/tokens";
import { fieldErrorsFromZod, firstErrorMessage } from "@/lib/zod-error";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const MAGNETS = ["soc2-audit-trail-checklist"] as const;

const RequestSchema = z.object({
  email: z.email(),
  magnet: z.enum(MAGNETS),
  consent: z
    .union([z.boolean(), z.literal("on"), z.string()])
    .optional()
    .transform((v) => v === true || v === "on" || v === "true"),
  turnstileToken: z.string().optional().nullable(),
  pagePath: z.string().max(500).optional(),
});

export async function requestLeadMagnet(
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const { prisma } = await import("@/lib/db");
    await rateLimitOrThrow("lead_magnet_request");
    validateHoneypot(formData);

    const raw = {
      email: formData.get("email"),
      magnet: formData.get("magnet"),
      consent: formData.get("consent"),
      turnstileToken: extractTurnstileToken(formData),
      pagePath: formData.get("pagePath"),
    };
    const parsed = RequestSchema.safeParse(raw);
    if (!parsed.success) {
      const first = fieldErrorsFromZod(parsed.error);
      const msg = first.email?.[0] ?? first.magnet?.[0] ?? firstErrorMessage(parsed.error);
      return { ok: false, message: msg };
    }

    const { email, magnet, consent, turnstileToken, pagePath } = parsed.data;
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
    };

    await prisma.leadMagnetRequest.create({
      data: { email, magnet, tokenHash, meta },
    });

    const existingLead = await prisma.emailLead.findFirst({
      where: { email, source: "lead-magnet" },
      orderBy: { createdAt: "desc" },
    });
    if (existingLead) {
      await prisma.emailLead.update({
        where: { id: existingLead.id },
        data: {
          pagePath: pagePath ?? null,
          consent: consent ?? false,
          meta: { ...meta, magnet, pagePath: pagePath ?? undefined },
        },
      });
    } else {
      await prisma.emailLead.create({
        data: {
          email,
          source: "lead-magnet",
          pagePath: pagePath ?? null,
          consent: consent ?? false,
          tags: ["soc2"],
          meta: { ...meta, magnet, pagePath: pagePath ?? undefined },
        },
      });
    }

    const downloadUrl = `${SITE_URL}/resources/download?token=${encodeURIComponent(token)}`;
    const sendRes = await sendLeadMagnetEmail({
      email,
      downloadUrl,
      magnet,
    });
    if (!sendRes.ok)
      return { ok: false, message: sendRes.error ?? "Failed to send email." };

    return { ok: true, message: "Check your inbox for the download link." };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}

const RedeemSchema = z.object({ token: z.string().min(1) });

export async function redeemLeadMagnet(
  token: string
): Promise<{ ok: boolean; message: string; downloadPath?: string }> {
  const { prisma } = await import("@/lib/db");
  const parsed = RedeemSchema.safeParse({ token });
  if (!parsed.success) return { ok: false, message: "Invalid or expired link." };

  const tokenHash = hashToken(parsed.data.token);
  const req = await prisma.leadMagnetRequest.findFirst({
    where: { tokenHash, redeemedAt: null },
  });
  if (!req) return { ok: false, message: "Invalid or expired link." };

  await prisma.leadMagnetRequest.update({
    where: { id: req.id },
    data: { redeemedAt: new Date(), tokenHash: null },
  });

  const downloadPath =
    req.magnet === "soc2-audit-trail-checklist"
      ? "/resources/soc2-audit-trail-checklist.pdf"
      : "/resources/download";
  return { ok: true, message: "Download ready.", downloadPath };
}
