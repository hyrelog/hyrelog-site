"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { useTurnstileDebugHint } from "@/components/forms/use-turnstile-debug-hint";
import { submitBookDemoLead } from "@/app/actions/book-demo";

function FormInner({
  state,
  pending,
  values,
  onChange,
}: {
  state: { ok: boolean; message: string } | null;
  pending: boolean;
  values: {
    name: string;
    email: string;
    company: string;
    message: string;
    consent: boolean;
  };
  onChange: (
    key: "name" | "email" | "company" | "message" | "consent",
    value: string | boolean
  ) => void;
}) {
  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="bd-name" className="text-sm font-medium">
            Name *
          </label>
          <Input
            id="bd-name"
            name="name"
            required
            placeholder="Jane Smith"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="bd-email" className="text-sm font-medium">
            Email *
          </label>
          <Input
            id="bd-email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="bd-company" className="text-sm font-medium">
          Company
        </label>
        <Input
          id="bd-company"
          name="company"
          placeholder="Acme Inc."
          value={values.company}
          onChange={(e) => onChange("company", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="bd-message" className="text-sm font-medium">
          Message (optional)
        </label>
        <Textarea
          id="bd-message"
          name="message"
          rows={3}
          placeholder="What are you looking to solve?"
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bd-consent"
          name="consent"
          value="on"
          className="rounded border-input"
          checked={values.consent}
          onChange={(e) => onChange("consent", e.target.checked)}
        />
        <label htmlFor="bd-consent" className="text-sm text-muted-foreground">
          I agree to be contacted about HyreLog.
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
        {pending ? "Submitting..." : "Join the waitlist"}
      </Button>
    </>
  );
}

export function BookDemoForm() {
  const pathname = usePathname();
  const { formRef, turnstileDebugHint, updateTurnstileDebugHint } = useTurnstileDebugHint();
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    consent: false,
  });
  const [state, formAction, isPending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) => {
      return submitBookDemoLead(formData);
    },
    null
  );

  useEffect(() => {
    updateTurnstileDebugHint(state);
  }, [state, updateTurnstileDebugHint]);

  useEffect(() => {
    if (state?.ok && typeof window.turnstile?.reset === "function") {
      setValues({
        name: "",
        email: "",
        company: "",
        message: "",
        consent: false,
      });
      window.turnstile.reset();
    }
  }, [state?.ok]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
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
        values={values}
        onChange={(key, value) => {
          setValues((prev) => {
            if (key === "consent") {
              return { ...prev, consent: Boolean(value) };
            }
            return { ...prev, [key]: String(value) };
          });
        }}
      />
    </form>
  );
}
