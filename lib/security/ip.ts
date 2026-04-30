import { headers } from "next/headers";

/**
 * Best-effort client IP from next/headers.
 * Checks: x-forwarded-for (first), x-real-ip, cf-connecting-ip.
 */
export async function getClientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = h.get("x-real-ip");
  if (real) return real;
  const cf = h.get("cf-connecting-ip");
  if (cf) return cf;
  return null;
}
