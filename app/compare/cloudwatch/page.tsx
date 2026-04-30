import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cloud Logging vs Audit Logging",
  description:
    "Cloud-native logging is great for operations. For compliance and security reviews, you often need a dedicated audit log with immutability and residency guarantees.",
  path: "/compare/cloudwatch",
});

export default function CompareCloudWatchPage() {
  const webPageLd = webPageJsonLd({
    title: "Cloud Logging vs Audit Logging",
    description:
      "How cloud-native logs differ from compliance-grade, tamper-evident audit trails with residency guarantees.",
    path: "/compare/cloudwatch",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cloud Logging vs Audit Logging", path: "/compare/cloudwatch" },
  ]);

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">
            Cloud logging vs compliance-grade audit logging
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Cloud logging services (e.g. CloudWatch, Cloud Logging) give you centralized logs and
            search. They’re not built to provide tamper-evident audit trails with hash-chain
            integrity, guaranteed data residency, and long-term retention for auditors.
          </p>
          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            <h2>What cloud logging is good for</h2>
            <p>
              Centralized collection, search, and alerting on application and infrastructure logs.
              Retention and region are configurable but the primary use case is operations, not
              compliance evidence.
            </p>
            <h2>What auditors need</h2>
            <p>
              Auditors need to see that your audit trail is <strong>immutable</strong> (e.g.
              hash-chained), retained for a defined period, and stored in the right region. They
              want exportable evidence, not just “we have logs in the cloud.”
            </p>
            <h2>HyreLog’s focus</h2>
            <p>
              HyreLog is built for audit logging: tamper-evident storage, multi-region residency,
              retention policies, and exports that meet compliance expectations. You can keep
              using your cloud provider for general logging and add HyreLog for the audit trail.
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
