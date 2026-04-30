"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { useTurnstileDebugHint } from "@/components/forms/use-turnstile-debug-hint";
import { submitContact } from "@/app/actions/contact";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const pathname = usePathname();
  const { formRef, turnstileDebugHint, updateTurnstileDebugHint } = useTurnstileDebugHint();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    consent: false,
  });
  const [state, formAction, isPending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) => {
      return submitContact(formData);
    },
    null
  );

  useEffect(() => {
    updateTurnstileDebugHint(state);
  }, [state, updateTurnstileDebugHint]);

  useEffect(() => {
    if (state?.ok) {
      trackEvent("contact_submit_success", { page: pathname ?? "/contact" });
      setFormValues({
        name: "",
        email: "",
        company: "",
        message: "",
        consent: false,
      });
      if (typeof window.turnstile?.reset === "function") {
        window.turnstile.reset();
      }
    }
  }, [state?.ok, pathname]);

  return (
    <form ref={formRef} action={formAction} className="mt-8 space-y-6">
      <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-medium">
            Name *
          </label>
          <Input
            id="contact-name"
            name="name"
            required
            placeholder="Jane Smith"
            value={formValues.name}
            onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email *
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            value={formValues.email}
            onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-company" className="text-sm font-medium">
          Company
        </label>
        <Input
          id="contact-company"
          name="company"
          placeholder="Acme Inc."
          value={formValues.company}
          onChange={(e) => setFormValues((prev) => ({ ...prev, company: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message * (min 20 characters)
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your audit and compliance needs..."
          value={formValues.message}
          onChange={(e) => setFormValues((prev) => ({ ...prev, message: e.target.value }))}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="contact-consent"
          name="consent"
          value="on"
          className="rounded border-input"
          checked={formValues.consent}
          onChange={(e) => setFormValues((prev) => ({ ...prev, consent: e.target.checked }))}
        />
        <label htmlFor="contact-consent" className="text-sm text-muted-foreground">
          I agree to be contacted about HyreLog (optional).
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
      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
