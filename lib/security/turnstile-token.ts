function firstNonEmpty(values: FormDataEntryValue[]): string | null {
  for (let i = values.length - 1; i >= 0; i--) {
    const value = values[i];
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return null;
}

export function extractTurnstileToken(formData: FormData): string | null {
  const custom = firstNonEmpty(formData.getAll("turnstileToken"));
  if (custom) return custom;

  const cloudflareDefault = firstNonEmpty(formData.getAll("cf-turnstile-response"));
  if (cloudflareDefault) return cloudflareDefault;

  return null;
}
