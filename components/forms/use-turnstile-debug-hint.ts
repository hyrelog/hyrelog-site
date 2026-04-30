"use client";

import { useRef } from "react";

export function useTurnstileDebugHint() {
  const formRef = useRef<HTMLFormElement | null>(null);

  function updateTurnstileDebugHint(result: { ok: boolean; message: string } | null) {
    void result;
    return;
  }

  return { formRef, turnstileDebugHint: null as string | null, updateTurnstileDebugHint };
}
