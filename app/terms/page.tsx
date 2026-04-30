import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for HyreLog.",
  path: "/terms",
});

export default function TermsPage() {
  const webPageLd = webPageJsonLd({
    title: "Terms of Service",
    description: "Terms of service for HyreLog.",
    path: "/terms",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ]);

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            <p>
              This is a placeholder. Replace with your actual terms of service. Include sections on
              acceptance, use of the service, accounts, payment, data and privacy, intellectual
              property, limitations of liability, termination, and governing law.
            </p>
            <p>
              Consult legal counsel to draft terms appropriate for your jurisdiction and business.
            </p>
          </div>
          <p className="mt-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground underline">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
