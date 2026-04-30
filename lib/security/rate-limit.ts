import { getClientIp } from "@/lib/security/ip";
import { getUserAgent } from "@/lib/security/ua";

const MAX = Math.max(1, parseInt(process.env.RATE_LIMIT_MAX ?? "5", 10) || 5);
const WINDOW_SEC = Math.max(1, parseInt(process.env.RATE_LIMIT_WINDOW_SEC ?? "60", 10) || 60);
const WINDOW_MS = WINDOW_SEC * 1000;

const store = new Map<string, number[]>();
const MAX_ENTRIES = 20_000;

function prune() {
  if (store.size <= MAX_ENTRIES) return;
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  for (const [key, timestamps] of store.entries()) {
    const recent = timestamps.filter((t) => t > cutoff);
    if (recent.length === 0) store.delete(key);
    else store.set(key, recent);
  }
}

function keyFor(actionName: string, ip: string, ua: string): string {
  const u = (ua ?? "").slice(0, 64);
  return `${ip}:${u}:${actionName}`;
}

/**
 * Throws if rate limit exceeded. Call after getClientIp/getUserAgent.
 */
export async function rateLimitOrThrow(actionName: string): Promise<void> {
  const ip = await getClientIp();
  const ua = await getUserAgent();
  const k = keyFor(actionName, ip ?? "unknown", ua ?? "");

  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = store.get(k) ?? [];
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= MAX) {
    throw new Error("Too many requests. Please try again in a minute.");
  }

  recent.push(now);
  store.set(k, recent);
  if (store.size > MAX_ENTRIES) prune();
}
