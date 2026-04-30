"use client";

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

export function TurnstileWidget() {
  // Temporarily disabled while production Turnstile issues are being resolved.
  return null;
}
