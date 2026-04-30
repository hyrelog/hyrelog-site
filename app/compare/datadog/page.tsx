import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Observability vs Audit Logging",
  description:
    "Observability platforms are built for metrics and debugging. Enterprise audit trails require tamper-evidence, residency, and retention. When you need both.",
  path: "/compare/datadog",
});

export default function CompareDatadogPage() {
  const webPageLd = webPageJsonLd({
    title: "Observability vs Audit Logging",
    description:
      "When observability tooling is enough and when a dedicated, tamper-evident audit trail is required.",
    path: "/compare/datadog",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Observability vs Audit Logging", path: "/compare/datadog" },
  ]);

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">
            Observability vs audit logging: what’s the difference?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Observability tools (e.g. Datadog, New Relic, Grafana) help you understand and debug
            your systems with logs, metrics, and traces. They’re not designed to be tamper-evident
            audit trails with guaranteed data residency and long retention.
          </p>
          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            <h2>When observability is the right tool</h2>
            <p>
              Use observability platforms for operational insight: latency, errors, request flows,
              and recent logs. Retention is often short; the goal is debugging and alerting, not
              legal or compliance evidence.
            </p>
            <h2>When you need an audit log</h2>
            <p>
              For SOC 2, GDPR, and security reviews, auditors expect an <strong>audit trail</strong>:
              who did what, when, and where, with cryptographic integrity (e.g. hash chains),
              defined retention, and data residency. That’s a different design than general-purpose
              observability.
            </p>
            <h2>Using both</h2>
            <p>
              Many teams use observability for operations and a dedicated audit-logging product for
              compliance. HyreLog focuses on the latter: immutable, region-aware audit trails and
              auditor-ready exports.
            </p>
          </div>
          <div className="mt-10">
            <Button asChild>
              <Link href="/contact?ref=compare">Talk to us</Link>
            </Button>
          </div>
          <p className="mt-6">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground underline">
              Read more on our blog
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
