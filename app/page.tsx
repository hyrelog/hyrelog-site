import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Globe,
  FileCheck,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Hero } from "@/components/marketing/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "HyreLog — Immutable Audit Logging for SaaS",
  description:
    "Compliance-grade audit logging with tamper-evident integrity, regional data residency controls, and auditor-ready exports.",
  path: "/",
  image: "/og/default.png",
});

const steps = [
  {
    title: "Instrument once",
    description: "Send events from your app via API or SDK. We handle ingestion, ordering, and integrity.",
    icon: Zap,
    bullets: ["Single API surface", "SDK for your stack"],
  },
  {
    title: "Store with integrity",
    description: "Every event is hashed and chained. Tampering is cryptographically detectable.",
    icon: Lock,
    bullets: ["Hash-chain immutability", "Cryptographic proofs"],
  },
  {
    title: "Export for auditors",
    description: "Region-specific retention, RBAC, and one-click exports in formats auditors expect.",
    icon: FileCheck,
    bullets: ["CSV, JSON, evidence packages", "Region-aware retention"],
  },
];

const features = [
  { title: "Tamper-evident logs", desc: "Hash-chain immutability", icon: Lock },
  { title: "Multi-region residency", desc: "Data stays where you need it", icon: Globe },
  { title: "Retention & archive", desc: "Hot storage and long-term archive", icon: FileCheck },
  { title: "Auditor-ready exports", desc: "CSV, JSON, and evidence packages", icon: FileCheck },
  { title: "RBAC & access control", desc: "Who can see what", icon: Shield },
  { title: "Webhooks", desc: "Real-time event streaming", icon: Zap },
];

const sectionClass = "py-20";

export default function HomePage() {
  const webPageLd = webPageJsonLd({
    title: "HyreLog",
    description:
      "Compliance-grade audit logging infrastructure with immutable trails, region-aware residency, and auditor-ready exports.",
    path: "/",
  });
  const breadcrumbLd = breadcrumbJsonLd([{ name: "Home", path: "/" }]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <Hero />

      {/* Who it's for / Problem */}
      <section className={`${sectionClass} border-b bg-premium bg-grid bg-noise`}>
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Built for teams under the microscope
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-semibold md:text-3xl">
            When auditors ask how you prove immutability, you need answers — not spreadsheets
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            B2B SaaS going upmarket — fintech, health, HR, security, GovTech — facing SOC 2,
            GDPR, and security review pressure.
          </p>
        </div>
      </section>

      {/* How it works — 3-step timeline */}
      <section className={`${sectionClass} border-b`}>
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-center text-2xl font-semibold md:text-3xl">
            Three steps from your app to auditor-ready evidence
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Instrument once, store with integrity, export when auditors ask.
          </p>
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
            <div className="grid gap-10 md:grid-cols-3 md:gap-6">
              {steps.map((step, i) => (
                <Card
                  key={step.title}
                  className="relative rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="absolute -top-4 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border bg-background text-primary shadow">
                    <step.icon className="size-5" />
                  </div>
                  <CardHeader className="pt-10">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className={`${sectionClass} border-b bg-premium bg-grid bg-noise`}>
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Capabilities
          </p>
          <h2 className="mt-3 text-center text-2xl font-semibold md:text-3xl">
            Everything you need for compliance-grade audit logs
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Tamper-evident storage, region controls, and auditor-ready exports in one platform.
          </p>
          <div className="mx-auto mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security review ready */}
      <section className={`${sectionClass} border-b`}>
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Security & compliance
          </p>
          <h2 className="mt-3 text-center text-2xl font-semibold md:text-3xl">
            Security review ready
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Designed for SOC 2, GDPR, and ISO-aligned environments. We give you the controls and
            evidence structure auditors expect — without the cost of building it yourself.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm shadow-sm">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
              Tamper-evident audit trail
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm shadow-sm">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
              Data residency controls
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm shadow-sm">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
              Retention & export
            </div>
          </div>
          <p className="mt-8 text-center">
            <Link href="/security" className="text-sm font-medium text-primary underline hover:no-underline">
              View Security
            </Link>
            {" · "}
            <Link href="/product" className="text-sm font-medium text-primary underline hover:no-underline">
              Integration & product
            </Link>
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/security">View Security</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section className={`${sectionClass} border-b bg-premium bg-grid bg-noise`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Free resource
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              SOC 2 Audit Trail Checklist
            </h2>
            <p className="mt-2 text-muted-foreground">
              Prepare for security reviews with our practical checklist.
            </p>
            <Button asChild className="mt-6">
              <Link href="/resources/soc2-audit-trail-checklist">Get the checklist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Money slide CTA */}
      <section className={`${sectionClass} border-b`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 shadow-lg md:p-12">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              Turn compliance into revenue.
            </h2>
            <ul className="mx-auto mt-8 max-w-md space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                Unblock enterprise deals faster
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                Reduce audit prep from weeks to minutes
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                Stop building fragile audit tables
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/waitlist">
                  Join the waitlist
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact for details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className={`${sectionClass}`}>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">
            Trusted by teams who take compliance seriously
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            (Testimonials and case studies coming soon.)
          </p>
        </div>
      </section>
    </div>
  );
}
