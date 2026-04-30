const HONEYPOT_FIELD = "website";

export function validateHoneypot(formData: FormData): void {
  const value = formData.get(HONEYPOT_FIELD);
  if (value != null && String(value).trim().length > 0) {
    throw new Error("Invalid request.");
  }
}

export function getHoneypotFieldName(): string {
  return HONEYPOT_FIELD;
}
