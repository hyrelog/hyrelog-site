"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { useTurnstileDebugHint } from "@/components/forms/use-turnstile-debug-hint";
import { subscribeNewsletter } from "@/app/actions/newsletter";

function NewsletterFormInner({
  state,
  pending,
  sourcePlacement,
  email,
  consent,
  onEmailChange,
  onConsentChange,
}: {
  state: { ok: boolean; message: string } | null;
  pending: boolean;
  sourcePlacement: string;
  email: string;
  consent: boolean;
  onEmailChange: (value: string) => void;
  onConsentChange: (checked: boolean) => void;
}) {
  return (
    <>
      <input type="hidden" name="sourcePlacement" value={sourcePlacement} />
      <div className="flex gap-2">
        <Input
          type="email"
          name="email"
          placeholder="you@company.com"
          required
          className="min-w-0 flex-1"
          aria-label="Email for newsletter"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <Button type="submit" disabled={pending}>
          {pending ? "…" : "Subscribe"}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="newsletter-consent"
          name="consent"
          value="on"
          className="rounded border-input"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
        />
        <label htmlFor="newsletter-consent" className="text-sm text-muted-foreground">
          I agree to receive product updates and compliance tips (optional).
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
    </>
  );
}

export function NewsletterForm({ sourcePlacement = "footer" }: { sourcePlacement?: string }) {
  const pathname = usePathname();
  const { formRef, turnstileDebugHint, updateTurnstileDebugHint } = useTurnstileDebugHint();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) => {
      return subscribeNewsletter(formData);
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
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="pagePath" value={pathname ?? ""} />
      {turnstileDebugHint && (
        <p className="text-xs text-amber-700 dark:text-amber-400" role="status">
          {turnstileDebugHint}
        </p>
      )}
      <NewsletterFormInner
        state={state}
        pending={isPending}
        sourcePlacement={sourcePlacement}
        email={email}
        consent={consent}
        onEmailChange={setEmail}
        onConsentChange={setConsent}
      />
    </form>
  );
}
