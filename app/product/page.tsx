import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Globe, FileCheck, Lock, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, softwareAppJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Product — Audit Logging Built for Compliance",
  description:
    "Capture, protect, and prove critical actions with tamper-evident audit logs, search, exports, and residency controls.",
  path: "/product",
  image: "/og/security.png",
});

const features = [
  {
    title: "Immutable, tamper-evident logs",
    description:
      "Every event is hashed and linked in a chain. Altering or deleting past entries breaks the chain — so auditors can trust the trail.",
    icon: Lock,
  },
  {
    title: "Multi-region data residency",
    description:
      "Store logs in the regions your customers and regulations require. EU data in EU, US in US — with clear geographic guarantees.",
    icon: Globe,
  },
  {
    title: "Retention and archive",
    description:
      "Configurable retention per stream. Hot queryable storage plus long-term archive. No more “we only keep 30 days” during an audit.",
    icon: FileCheck,
  },
  {
    title: "Auditor-ready exports",
    description:
      "Export in CSV, JSON, or packaged evidence bundles. Timestamped, hash-verified, and formatted for compliance reviews.",
    icon: FileCheck,
  },
  {
    title: "RBAC and access control",
    description:
      "Control who can read, search, and export logs. Audit the auditors — we log access to the audit log.",
    icon: Shield,
  },
  {
    title: "Webhooks and real-time",
    description:
      "Stream events to your SIEM or internal systems. Real-time delivery with at-least-once semantics.",
    icon: Zap,
  },
];

export default function ProductPage() {
  const webPageLd = webPageJsonLd({
    title: "Product",
    description:
      "HyreLog product overview: immutable audit logging, multi-region residency, retention, and auditor-ready exports.",
    path: "/product",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Product", path: "/product" },
  ]);
  const softwareLd = softwareAppJsonLd({
    description:
      "Capture, protect, and prove critical actions with tamper-evident audit logs, search, exports, and residency controls.",
  });

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd, softwareLd]} />
      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Compliance-grade audit logging, built for scale
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              HyreLog gives you immutable audit trails, multi-region data residency, and
              auditor-ready exports — so you can pass security reviews without building and
              maintaining your own hash-chain infrastructure.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild>
                <Link href="/waitlist">Join the waitlist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl font-semibold">Features</h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">Why not observability tools?</h2>
            <p className="mt-2 text-muted-foreground">
            Datadog, CloudWatch, and other observability platforms are great for metrics and
            debugging. But enterprise security reviews and compliance frameworks often require
            something different: <strong>audit logging</strong> with provable immutability and
            data residency.
          </p>
          <div className="mt-8 flex flex-col gap-4 rounded-lg border bg-muted/30 p-6">
            <div className="flex gap-3">
              <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="font-medium">Observability ≠ audit trail</h3>
                <p className="text-sm text-muted-foreground">
                  Logs in observability tools can be modified, deleted, or retained only for short
                  periods. Auditors need a cryptographically verifiable, tamper-evident trail with
                  clear retention and export guarantees.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="font-medium">Region and residency</h3>
                <p className="text-sm text-muted-foreground">
                  Many observability stacks don’t offer fine-grained data residency (e.g. “EU only”).
                  Compliance and customer contracts often require it for audit logs.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              HyreLog is built specifically for audit logging: hash-chain immutability,
              region-aware storage, retention policies, and exports that auditors expect. If you’d
              like to compare approaches, see our{" "}
              <Link href="/blog" className="underline hover:no-underline">
                blog
              </Link>{" "}
              for articles on audit logging vs observability.
            </p>
          </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold">Ready to get started?</h2>
            <p className="mt-2 text-muted-foreground">
              See how HyreLog fits your compliance and residency requirements.
            </p>
            <Button asChild className="mt-6">
              <Link href="/waitlist">Join the waitlist</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
