"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function hasDoNotTrackEnabled() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return false;
  return (
    navigator.doNotTrack === "1" ||
    (window as Window & { doNotTrack?: string }).doNotTrack === "1" ||
    (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack === "1"
  );
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || hasDoNotTrackEnabled()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}
