import { headers } from "next/headers";

export async function getUserAgent(): Promise<string | null> {
  const h = await headers();
  return h.get("user-agent");
}
