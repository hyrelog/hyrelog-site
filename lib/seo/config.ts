export const siteName = "HyreLog";
export const siteUrl = process.env.SITE_URL?.trim() || "https://hyrelog.com";
export const defaultTitle = "HyreLog — Immutable Audit Logging for SaaS";
export const defaultDescription =
  "Compliance-grade audit logging with tamper-evident integrity, regional data residency controls, and auditor-ready exports.";
export const defaultLocale = "en_US";
export const twitterHandle = "";

export const brandLogos = {
  dark: "/brand/hyrelog-logo-dark.png",
  light: "/brand/hyrelog-logo-light.png",
} as const;

export const defaultKeywords = [
  "audit logging",
  "immutable audit logs",
  "tamper-evident audit trail",
  "data residency audit logging",
  "enterprise security reviews",
  "SOC2-aligned audit trails",
] as const;
