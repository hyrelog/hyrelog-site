import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrackLink } from "@/components/analytics/track-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Expected Plans and Usage (Beta)",
  description:
    "Expected beta pricing for HyreLog audit logging plans. Join the waitlist for launch updates, limits, and enterprise options.",
  path: "/pricing",
  image: "/og/pricing.png",
});

const tiers = [
  {
    name: "Free (Developer)",
    description: "For individual builders validating audit logging",
    price: "$0",
    features: [
      "50k events/mo",
      "7-day retention",
      "1 project",
      "Community support",
      "Basic search",
    ],
    highlighted: false,
  },
  {
    name: "Starter",
    description: "For early production workloads",
    price: "US$99/mo",
    features: [
      "1M events/mo",
      "30-day retention",
      "3 projects",
      "Basic exports (CSV/JSON)",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For teams moving upmarket",
    price: "US$399/mo",
    features: [
      "10M events/mo",
      "90-day retention",
      "Advanced search",
      "Webhooks",
      "Dashboards",
      "SSO optional add-on",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    description: "For high-volume compliance operations",
    price: "US$999/mo",
    features: [
      "50M events/mo",
      "1-year retention",
      "Multi-tenant workspaces",
      "Team roles",
      "Priority support",
      "Evidence pack exports",
    ],
    highlighted: false,
  },
  {
    name: "Enterprise",
    description: "Custom plans for strict security and legal requirements",
    price: "Custom",
    features: [
      "100M+ events/mo",
      "3-7 year retention options",
      "Data residency controls (EU-only / AU-only)",
      "Dedicated infrastructure options",
      "SLA, DPA, and legal hold",
      "SIEM streaming, SCIM, and audit access workflows",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  const webPageLd = webPageJsonLd({
    title: "Pricing",
    description:
      "HyreLog pricing plans for compliance-grade audit logging with immutable trails and region-aware controls.",
    path: "/pricing",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <section className="border-b bg-premium bg-grid bg-noise py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Pricing
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Expected pricing for compliance-grade audit logging, including SOC2-aligned audit
              trails, tamper-evident integrity, and enterprise security review needs.
            </p>
            <Card className="mx-auto mt-8 max-w-2xl border-primary/30 bg-card/80 text-left shadow-lg">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">Expected pricing (beta)</h2>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                These are our current expected plans and inclusions. Pricing and limits may change
                before GA. Join the waitlist for launch updates and early access.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-5">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={
                  tier.highlighted
                    ? "relative border-primary bg-linear-to-b from-primary/10 to-card shadow-xl shadow-primary/20"
                    : "border bg-card shadow-sm"
                }
              >
                <CardHeader>
                  {tier.highlighted && (
                    <Badge className="mb-2 w-fit">Most popular</Badge>
                  )}
                  {tier.highlighted && (
                    <Sparkles className="mb-2 size-4 text-primary" aria-hidden />
                  )}
                  <h2 className="text-lg font-semibold">{tier.name}</h2>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                  <p className="text-2xl font-bold">{tier.price}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="size-4 shrink-0 text-green-600 dark:text-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-center">
            <Button asChild size="lg">
              <TrackLink
                href="/waitlist"
                eventName="pricing_cta_click"
                eventParams={{ placement: "pricing-primary" }}
              >
                Join the waitlist
              </TrackLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <TrackLink
                href="/contact"
                eventName="pricing_cta_click"
                eventParams={{ placement: "pricing-secondary" }}
              >
                Contact for details
              </TrackLink>
            </Button>
            <p className="w-full text-sm text-muted-foreground">
              Beta access and launch pricing updates go to waitlist members.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold">Feature comparison</h2>
            <p className="mt-2 text-muted-foreground">
              Quick view for audit logging pricing and enterprise security review requirements.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border bg-card">
              <table className="min-w-[980px] w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="sticky left-0 bg-muted/40 px-4 py-3 text-left font-semibold">
                      Capability
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Free</th>
                    <th className="px-4 py-3 text-left font-semibold">Starter</th>
                    <th className="px-4 py-3 text-left font-semibold">Growth</th>
                    <th className="px-4 py-3 text-left font-semibold">Business</th>
                    <th className="px-4 py-3 text-left font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["events/mo", "50k", "1M", "10M", "50M", "100M+"],
                    ["retention", "7 days", "30 days", "90 days", "1 year", "3-7 years"],
                    ["projects", "1", "3", "10", "25", "Custom"],
                    ["search", "Basic", "Basic", "Advanced", "Advanced", "Advanced"],
                    ["exports", "Basic", "CSV/JSON", "CSV/JSON", "Evidence packs", "Custom"],
                    ["webhooks", "-", "-", "Included", "Included", "Included"],
                    ["dashboards", "-", "-", "Included", "Included", "Included"],
                    ["roles/RBAC", "-", "-", "Basic", "Advanced", "Advanced"],
                    ["multi-tenant workspaces", "-", "-", "-", "Included", "Included"],
                    ["SSO", "Add-on", "Add-on", "Add-on", "Included", "Included"],
                    ["SCIM", "-", "-", "Add-on", "Add-on", "Included"],
                    ["SIEM streaming", "-", "-", "Add-on", "Add-on", "Included"],
                    ["evidence packs", "-", "-", "-", "Included", "Included"],
                    ["residency locks", "-", "-", "Add-on", "Add-on", "Included"],
                    ["BYOK", "-", "-", "-", "Add-on", "Included"],
                    ["SLA/DPA", "-", "-", "DPA", "SLA + DPA", "Advanced legal controls"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b last:border-b-0">
                      <td className="sticky left-0 bg-card px-4 py-3 font-medium capitalize">
                        {row[0]}
                      </td>
                      {row.slice(1).map((value, idx) => (
                        <td
                          key={`${row[0]}-${idx}-${value}`}
                          className="px-4 py-3 text-muted-foreground"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold">Overages</h2>
            <p className="mt-3 text-muted-foreground">
              Simple per-1M events pricing (e.g., US$X per additional 1M) with volume discounts.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Final overage pricing may change during beta.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-premium py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold">Add-ons</h2>
            <p className="mt-2 text-muted-foreground">
              Expand from core immutable audit logs to full trust infrastructure controls.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                "SSO/SAML + SCIM",
                "SIEM streaming (Splunk/Sentinel/Datadog)",
                "Legal Hold / eDiscovery exports",
                "Multi-region replication & residency locks",
                "Customer-managed keys (KMS / BYOK)",
                "Evidence Pack automation (SOC2/ISO request-ready bundles)",
              ].map((addon) => (
                <Card key={addon} className="rounded-2xl border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <p className="font-medium">{addon}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">Pricing FAQ</h2>
            <Accordion type="single" collapsible className="mt-6 rounded-2xl border px-6">
              <AccordionItem value="obs-vs-audit">
                <AccordionTrigger>Is HyreLog observability?</AccordionTrigger>
                <AccordionContent>
                  No. HyreLog is purpose-built audit logging for tamper-evident trails, retention,
                  residency, and exportable evidence, while observability focuses on debugging and
                  operational telemetry.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="altered-logs">
                <AccordionTrigger>Can logs be altered?</AccordionTrigger>
                <AccordionContent>
                  HyreLog is designed with tamper-evident integrity proofs so unauthorized
                  modification attempts are detectable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="residency-controls">
                <AccordionTrigger>Data residency controls?</AccordionTrigger>
                <AccordionContent>
                  Regional controls are available across plans, with residency locks and stricter
                  controls in higher tiers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="integration-time">
                <AccordionTrigger>How fast can we integrate?</AccordionTrigger>
                <AccordionContent>
                  Typical integrations are often under one day, depending on your stack and review
                  needs. Timelines are not guaranteed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="auditor-exports">
                <AccordionTrigger>Can we export for auditors?</AccordionTrigger>
                <AccordionContent>
                  Yes. CSV/JSON exports are available in lower tiers, and evidence packs are
                  included in Business and Enterprise.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="exceed-limits">
                <AccordionTrigger>What happens if we exceed limits?</AccordionTrigger>
                <AccordionContent>
                  Overage pricing applies per additional 1M events, with volume discounts for
                  higher usage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold">Ready for launch updates?</h2>
            <p className="mt-3 text-muted-foreground">
              Join the waitlist for early beta access and pricing updates, or contact us for plan
              details tailored to your requirements.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <TrackLink
                  href="/waitlist"
                  eventName="pricing_cta_click"
                  eventParams={{ placement: "pricing-bottom-primary" }}
                >
                  Join the waitlist
                </TrackLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <TrackLink
                  href="/contact"
                  eventName="pricing_cta_click"
                  eventParams={{ placement: "pricing-bottom-secondary" }}
                >
                  Contact for details
                </TrackLink>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Beta access and launch pricing updates go to waitlist members.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
