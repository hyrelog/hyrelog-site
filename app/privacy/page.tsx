import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for HyreLog.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const webPageLd = webPageJsonLd({
    title: "Privacy Policy",
    description: "Privacy policy for HyreLog.",
    path: "/privacy",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            <p>
              This is a placeholder. Replace with your actual privacy policy. Include what data you
              collect, how you use it, retention, sharing, cookies, user rights (e.g. access,
              deletion), and contact information. Align with GDPR and other applicable laws.
            </p>
            <p>Consult legal counsel to draft a privacy policy appropriate for your operations.</p>
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
