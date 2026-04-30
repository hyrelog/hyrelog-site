import { createHash, randomBytes } from "crypto";

const TOKEN_BYTES = 32;

/**
 * URL-safe random token (for confirm/redeem links).
 */
export function generateToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

/**
 * SHA-256 hash of token. Store only the hash in DB; never store plaintext.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}
