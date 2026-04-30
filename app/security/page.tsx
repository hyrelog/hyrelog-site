import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Security — Tamper-Evident Logs, Residency, and Exports",
  description:
    "HyreLog supports SOC2-aligned environments with integrity proofs, access controls, retention policies, and auditor-ready exports.",
  path: "/security",
  image: "/og/security.png",
});

const faqs = [
  {
    q: "How does hash-chain immutability work?",
    a: "Each log entry includes a cryptographic hash of the previous entry. If anyone changes or deletes a past entry, the chain breaks and the tampering is detectable. Auditors can verify integrity by re-computing hashes along the chain.",
  },
  {
    q: "Where is my data stored?",
    a: "You choose the region(s) for each log stream. Data stays in that region for processing and storage. We do not replicate audit logs to other regions unless you explicitly configure it.",
  },
  {
    q: "Who can access the audit logs?",
    a: "Access is controlled via role-based access control (RBAC). You define who can read, search, and export. All access to the audit log is itself logged for accountability.",
  },
  {
    q: "How long do you retain logs?",
    a: "Retention is configurable per stream. We support hot (queryable) storage and optional long-term archive. You set the policies to match your compliance requirements.",
  },
  {
    q: "What export formats do you support?",
    a: "Exports are available in CSV, JSON, and packaged evidence bundles that include hashes and timestamps. Formats are designed to be auditor-friendly and verifiable.",
  },
];

export default function SecurityPage() {
  const webPageLd = webPageJsonLd({
    title: "Security & Compliance",
    description:
      "How HyreLog delivers tamper-evident audit logs, regional residency controls, and auditor-ready exports.",
    path: "/security",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Security & Compliance", path: "/security" },
  ]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Security & compliance
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              HyreLog is designed for SOC 2, GDPR, and ISO-aligned environments. We provide
              tamper-evident audit trails, multi-region data residency, and the controls and
              exports that auditors expect.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Hash-chain immutability</h2>
          <p className="mt-4 text-muted-foreground">
            Every event is hashed and linked to the previous one. This creates a chain where
            altering any entry would invalidate all subsequent hashes. Auditors (or your own
            tooling) can verify the chain by recomputing hashes and comparing. We never allow
            in-place edits or undeclared deletions — so the trail is provably tamper-evident.
          </p>
          </div>
        </div>
      </section>

      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Data residency</h2>
          <p className="mt-4 text-muted-foreground">
            You choose the region for each log stream. Data is processed and stored only in that
            region, supporting GDPR and other data residency requirements. No cross-region
            replication of audit data unless you explicitly configure it.
          </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Access controls & retention</h2>
          <p className="mt-4 text-muted-foreground">
            Role-based access control (RBAC) determines who can read, search, and export logs.
            Access to the audit log is itself logged. Retention is configurable per stream — hot
            storage for recent querying and optional long-term archive for compliance.
          </p>
          </div>
        </div>
      </section>

      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Exports for auditors</h2>
          <p className="mt-4 text-muted-foreground">
            Export in CSV, JSON, or packaged evidence bundles. Exports include timestamps and
            hashes so auditors can verify integrity. Designed to be dropped into security
            reviews and compliance submissions without extra work.
          </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-semibold">FAQ</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm text-muted-foreground">
              We support SOC 2, GDPR, and ISO-aligned environments. HyreLog is designed to give
              you the evidence structure auditors look for — we do not claim certifications we
              don’t hold; we provide the logging infrastructure that supports your compliance
              program.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact?ref=security">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
