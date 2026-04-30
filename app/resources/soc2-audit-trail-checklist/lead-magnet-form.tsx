"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { useTurnstileDebugHint } from "@/components/forms/use-turnstile-debug-hint";
import { requestLeadMagnet } from "@/app/actions/lead-magnet";

function FormInner({
  state,
  pending,
  magnet,
  email,
  consent,
  onEmailChange,
  onConsentChange,
}: {
  state: { ok: boolean; message: string } | null;
  pending: boolean;
  magnet: string;
  email: string;
  consent: boolean;
  onEmailChange: (value: string) => void;
  onConsentChange: (checked: boolean) => void;
}) {
  return (
    <>
      <input type="hidden" name="magnet" value={magnet} />
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="lm-email" className="text-sm font-medium">
            Email *
          </label>
          <Input
            id="lm-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="lm-consent"
            name="consent"
            value="on"
            className="rounded border-input"
            checked={consent}
            onChange={(e) => onConsentChange(e.target.checked)}
          />
          <label htmlFor="lm-consent" className="text-sm text-muted-foreground">
            I agree to receive product updates (optional).
          </label>
        </div>
        <TurnstileWidget />
        {state && !state.ok && (
          <p className="text-sm text-destructive" role="alert">
            {state.message}
          </p>
        )}
        {state?.ok && (
          <p className="text-sm text-green-600 dark:text-green-400" role="status">
            {state.message}
          </p>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Get the checklist"}
        </Button>
      </div>
    </>
  );
}

export function LeadMagnetForm({ magnet }: { magnet: string }) {
  const pathname = usePathname();
  const { formRef, turnstileDebugHint, updateTurnstileDebugHint } = useTurnstileDebugHint();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) => {
      return requestLeadMagnet(formData);
    },
    null
  );

  useEffect(() => {
    updateTurnstileDebugHint(state);
  }, [state, updateTurnstileDebugHint]);

  useEffect(() => {
    if (state?.ok && typeof window.turnstile?.reset === "function") {
      setEmail("");
      setConsent(false);
      window.turnstile.reset();
    }
  }, [state?.ok]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="pagePath" value={pathname ?? ""} />
      {turnstileDebugHint && (
        <p className="text-xs text-amber-700 dark:text-amber-400" role="status">
          {turnstileDebugHint}
        </p>
      )}
      <FormInner
        state={state}
        pending={isPending}
        magnet={magnet}
        email={email}
        consent={consent}
        onEmailChange={setEmail}
        onConsentChange={setConsent}
      />
    </form>
  );
}
