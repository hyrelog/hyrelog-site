import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2, Fingerprint, Globe2, ShieldCheck, Users } from "lucide-react";
import { AboutHero } from "@/components/marketing/about-hero";
import { AboutTimeline } from "@/components/marketing/about-timeline";
import { FinalCtaBand } from "@/components/marketing/final-cta-band";
import { PrinciplesGrid } from "@/components/marketing/principles-grid";
import { TeamCard } from "@/components/marketing/team-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { breadcrumbJsonLd, buildMetadata, organizationJsonLd, webPageJsonLd } from "@/lib/seo";

const ABOUT_PATH = "/about";
const ABOUT_TITLE = "About — Why We Built HyreLog";
const ABOUT_DESCRIPTION =
  "HyreLog was built to make audit trails provable: tamper-evident integrity, residency controls, and exports for enterprise reviews.";

export const metadata: Metadata = buildMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: ABOUT_PATH,
  image: "/og/about.png",
});

const whatWeDo = [
  {
    title: "Immutable integrity",
    text: "Cryptographic chaining and verification-friendly design for a tamper-evident audit trail.",
    icon: Fingerprint,
  },
  {
    title: "Regional data residency controls",
    text: "Region-aware audit storage to satisfy enterprise and regulatory requirements with confidence.",
    icon: Globe2,
  },
  {
    title: "Auditor-ready exports & forensics",
    text: "Structured evidence exports that support investigations, reviews, and SOC2-aligned audit trails.",
    icon: FileCheck2,
  },
];

export default function AboutPage() {
  const orgLd = organizationJsonLd();
  const webPageLd = webPageJsonLd({
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    path: ABOUT_PATH,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: ABOUT_PATH },
  ]);

  return (
    <div>
      <JsonLd data={[orgLd, webPageLd, breadcrumbLd]} />

      <AboutHero />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Badge variant="outline" className="uppercase tracking-[0.16em] text-xs">
              Origin story
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Why we started</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Teams move fast, ship features, and land traction. Then the upmarket motion starts,
                and enterprise buyers ask hard questions: Can you prove who changed what, where
                data lives, and whether records can be trusted?
              </p>
              <p>
                That is where DIY audit tables often break down. Observability platforms are
                essential, but they are not built to guarantee immutable audit logs under enterprise
                scrutiny. Residency questions also show up late and can stall security reviews.
              </p>
              <p>
                HyreLog was built as dedicated infrastructure for this exact moment. If you want to{" "}
                <Link href="/how-it-works" className="underline underline-offset-4">
                  see how HyreLog works
                </Link>
                , review our{" "}
                <Link href="/security" className="underline underline-offset-4">
                  security review ready approach
                </Link>
                ,{" "}
                <Link href="/contact" className="underline underline-offset-4">
                  talk to us
                </Link>
                , or{" "}
                <Link href="/waitlist" className="underline underline-offset-4">
                  join the waitlist
                </Link>
                .
              </p>
            </div>
            <AboutTimeline />
          </div>
        </div>
      </section>

      <section className="border-y bg-premium py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Badge variant="outline" className="uppercase tracking-[0.16em] text-xs">
              What we do
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Infrastructure purpose-built for compliance-grade audit logging
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {whatWeDo.map((item) => (
                <Card key={item.title} className="rounded-2xl border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <item.icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Badge variant="outline" className="uppercase tracking-[0.16em] text-xs">
              What we believe
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Principles</h2>
            <PrinciplesGrid />
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/20 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Badge variant="outline" className="uppercase tracking-[0.16em] text-xs">
              Who we are
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Built by product and engineering leadership
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <TeamCard />
              <Card className="rounded-2xl border bg-card shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Users className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">We&apos;re building for</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    CTOs, platform leads, and security/GRC teams at B2B SaaS companies moving
                    upmarket.
                  </p>
                  <Separator className="my-5" />
                  <p className="text-sm text-muted-foreground">
                    Teams that need clear evidence in enterprise security reviews without slowing
                    down product velocity.
                  </p>
                  <div className="mt-5 inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                    <ShieldCheck className="mr-2 size-3.5" />
                    Enterprise security reviews, handled with confidence
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="uppercase tracking-[0.16em] text-xs">
              Where we&apos;re going
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              From audit logging to trust infrastructure
            </h2>
            <p className="mt-5 text-muted-foreground">
              Our direction is clear: stronger verification APIs, better retention and archival
              policy tooling, and practical compliance automation workflows that help teams move
              faster with more confidence.
            </p>
          </div>
        </div>
      </section>

      <FinalCtaBand />
    </div>
  );
}
