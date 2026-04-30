import type { Metadata } from "next";
import Link from "next/link";
import { LeadMagnetForm } from "./lead-magnet-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = buildMetadata({
  title: "SOC 2 Audit Trail Checklist",
  description:
    "Download our free SOC 2 audit trail checklist to prepare for security reviews and compliance.",
  path: "/resources/soc2-audit-trail-checklist",
});

const MAGNET = "soc2-audit-trail-checklist";

export default function Soc2ChecklistPage() {
  const webPageLd = webPageJsonLd({
    title: "SOC 2 Audit Trail Checklist",
    description:
      "Download the SOC 2 audit trail checklist for security reviews and compliance readiness.",
    path: "/resources/soc2-audit-trail-checklist",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "SOC 2 Audit Trail Checklist", path: "/resources/soc2-audit-trail-checklist" },
  ]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />

      <section className="border-b bg-premium bg-grid bg-noise py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              SOC 2 Audit Trail Checklist
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Is your SaaS audit logging ready for enterprise security reviews?
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
              A practical framework used by SaaS CTOs and platform teams to prepare for SOC 2
              assessments and enterprise procurement.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="#download-checklist">Download the Checklist</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Used by teams preparing for SOC 2, ISO 27001, and enterprise security questionnaires.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Enterprise deals increasingly hinge on audit logging.
            </h2>
            <p className="mt-4 text-muted-foreground">Security reviewers now ask:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Can logs be altered?</li>
              <li>Where is audit data stored?</li>
              <li>How long is it retained?</li>
              <li>Can you produce defensible exports?</li>
            </ul>
            <p className="mt-5 text-muted-foreground">
              Most SaaS teams discover gaps too late.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold md:text-3xl">What This Checklist Covers</h2>
            <p className="mt-4 text-muted-foreground">
              This framework helps you evaluate:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Audit log coverage and completeness",
                "Tamper protection and integrity controls",
                "Retention and regional storage policies",
                "Evidence export readiness",
                "Monitoring and governance alignment",
              ].map((item) => (
                <Card key={item} className="rounded-xl border bg-card">
                  <CardContent className="p-5 text-sm text-muted-foreground">{item}</CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-5 text-muted-foreground">
              It reflects common questions raised during enterprise security reviews.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold md:text-3xl">Who This Is For</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>SaaS founders moving upmarket</li>
              <li>CTOs preparing for SOC 2</li>
              <li>Platform and infrastructure teams</li>
              <li>Security and GRC leaders</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b bg-premium py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl rounded-2xl border bg-card p-8">
            <h2 className="text-2xl font-semibold md:text-3xl">Why we made this</h2>
            <p className="mt-4 text-muted-foreground">
              HyreLog builds immutable audit logging infrastructure for modern SaaS.
            </p>
            <p className="mt-2 text-muted-foreground">
              We created this checklist based on patterns seen in enterprise security reviews and
              compliance processes.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link href="/security" className="underline hover:no-underline">
                See how HyreLog supports security review readiness
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="download-checklist" className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Be prepared before the security questionnaire arrives.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Download the SOC 2 Audit Trail Checklist via email.
            </p>
            <LeadMagnetForm magnet={MAGNET} />
            <p className="mt-4 text-sm text-muted-foreground">
              No spam. Just practical compliance guidance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
