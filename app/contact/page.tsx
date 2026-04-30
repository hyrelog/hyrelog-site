import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/marketing/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Talk to HyreLog",
  description:
    "Contact HyreLog for pricing details, residency options, and enterprise security review questions.",
  path: "/contact",
  image: "/og/default.png",
});

export default function ContactPage() {
  const webPageLd = webPageJsonLd({
    title: "Contact",
    description:
      "Get in touch with HyreLog about compliance-grade audit logging, demos, and implementation questions.",
    path: "/contact",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Contact us</h1>
            <p className="mt-4 text-muted-foreground">
              Contact us for details on audit logging for your stack. We&apos;ll get back to you
              quickly.
            </p>
            <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-md bg-muted" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
