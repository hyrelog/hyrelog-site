import type { ZodError } from "zod";

/**
 * Zod 4: use error.issues (flatten() deprecated).
 * Build a map of field name -> first message for that field.
 */
export function fieldErrorsFromZod(error: ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] !== undefined ? String(issue.path[0]) : "_";
    if (!out[key]) out[key] = [];
    out[key].push(issue.message);
  }
  return out;
}

export function firstErrorMessage(error: ZodError, fallback = "Please check your entries."): string {
  const first = error.issues[0];
  return first?.message ?? fallback;
}
