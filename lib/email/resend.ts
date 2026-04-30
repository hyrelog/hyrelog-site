import { Resend } from "resend";
import { render } from "@react-email/render";
import React from "react";
import { ContactInternalEmail } from "./templates/contact-internal";
import { ContactAutoReplyEmail } from "./templates/contact-auto-reply";
import { NewsletterConfirmEmail } from "./templates/newsletter-confirm";
import { LeadMagnetEmail } from "./templates/lead-magnet";
import { BookDemoEmail } from "./templates/book-demo";
import { WaitlistThanksEmail } from "./templates/waitlist-thanks";

const client = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.CONTACT_FROM_EMAIL ?? "HyreLog <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? "";

export async function sendContactEmail(payload: {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
  meta?: Record<string, string>;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) {
    console.error("[Resend] RESEND_API_KEY not set.");
    return { ok: false, error: "Email service not configured." };
  }
  const to = TO || "contact@hyrelog.com";
  const subject = payload.subject ?? `Contact: ${payload.name} (${payload.company ?? "—"})`;
  const html = await render(
    React.createElement(ContactInternalEmail, {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      message: payload.message,
      subject: payload.subject,
      meta: payload.meta,
    })
  );
  const { error } = await client.emails.send({
    from: FROM,
    to,
    replyTo: payload.email,
    subject,
    html,
  });
  if (error) {
    console.error("[Resend] Send failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function sendAutoReply(to: string, name: string): Promise<{ ok: boolean }> {
  if (!client || !TO) return { ok: true };
  const html = await render(React.createElement(ContactAutoReplyEmail, { name }));
  const { error } = await client.emails.send({
    from: FROM,
    to,
    subject: "We received your message — HyreLog",
    html,
  });
  return { ok: !error };
}

export async function sendNewsletterConfirmEmail(payload: {
  email: string;
  confirmUrl: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: "Email service not configured." };
  const html = await render(
    React.createElement(NewsletterConfirmEmail, { confirmUrl: payload.confirmUrl })
  );
  const { error } = await client.emails.send({
    from: FROM,
    to: payload.email,
    subject: "Confirm your subscription — HyreLog",
    html,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function sendLeadMagnetEmail(payload: {
  email: string;
  downloadUrl: string;
  magnet: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: "Email service not configured." };
  const title =
    payload.magnet === "soc2-audit-trail-checklist"
      ? "SOC 2 Audit Trail Checklist"
      : "Your resource";
  const html = await render(
    React.createElement(LeadMagnetEmail, {
      title,
      downloadUrl: payload.downloadUrl,
    })
  );
  const { error } = await client.emails.send({
    from: FROM,
    to: payload.email,
    subject: `${title} — HyreLog`,
    html,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function sendBookDemoLeadEmail(payload: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  meta?: Record<string, string>;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: "Email service not configured." };
  const to = TO || "contact@hyrelog.com";
  const html = await render(
    React.createElement(BookDemoEmail, {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      message: payload.message,
      meta: payload.meta,
    })
  );
  const { error } = await client.emails.send({
    from: FROM,
    to,
    replyTo: payload.email,
    subject: `Waitlist request: ${payload.name} (${payload.company ?? "—"})`,
    html,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function sendWaitlistThanksEmail(payload: {
  email: string;
  name?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: "Email service not configured." };
  const html = await render(React.createElement(WaitlistThanksEmail, { name: payload.name }));
  const { error } = await client.emails.send({
    from: FROM,
    to: payload.email,
    subject: "You're on the HyreLog waitlist",
    html,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
