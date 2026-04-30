import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { HowItWorksEventSchema } from "@/components/marketing/how-it-works/event-schema";
import { HowItWorksFinalCta } from "@/components/marketing/how-it-works/final-cta";
import { HowItWorksHero } from "@/components/marketing/how-it-works/hero";
import { HowItWorksRegions } from "@/components/marketing/how-it-works/regions";
import { HowItWorksSecurityFaq } from "@/components/marketing/how-it-works/security-faq";
import { HowItWorksStepper } from "@/components/marketing/how-it-works/stepper";

const PATH = "/how-it-works";
const TITLE = "How It Works — From Events to Evidence in 3 Steps";
const DESCRIPTION =
  "Send audit events via API/SDK, protect them with tamper-evident integrity and regional controls, and export evidence auditors trust.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: "/og/how-it-works.png",
});

export default function HowItWorksPage() {
  const webPageLd = webPageJsonLd({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "How it works", path: PATH },
  ]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <HowItWorksHero />
      <HowItWorksStepper />
      <Separator />
      <HowItWorksEventSchema />
      <HowItWorksRegions />
      <HowItWorksSecurityFaq />
      <HowItWorksFinalCta />
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
            Explore implementation and controls in{" "}
            <Link href="/security" className="underline underline-offset-4">
              Security
            </Link>
            , view plans in{" "}
            <Link href="/pricing" className="underline underline-offset-4">
              Pricing
            </Link>
            , or{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Contact
            </Link>{" "}
            us directly.
          </p>
        </div>
      </section>
    </div>
  );
}
