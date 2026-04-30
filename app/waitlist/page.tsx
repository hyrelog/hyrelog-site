import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Waitlist — Get Early Access to HyreLog",
  description:
    "Join the HyreLog waitlist for early access and launch updates. Be ready for your next enterprise security review.",
  path: "/waitlist",
  image: "/og/waitlist.png",
});

export default function WaitlistPage() {
  const webPageLd = webPageJsonLd({
    title: "Join the waitlist",
    description:
      "Join the HyreLog waitlist for early access and launch updates on immutable audit logging.",
    path: "/waitlist",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Waitlist", path: "/waitlist" },
  ]);

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Join the waitlist</h1>
          <p className="mt-4 text-muted-foreground">
            Get beta access updates and launch pricing announcements for HyreLog.
          </p>
          <WaitlistForm />
          <p className="mt-8 text-sm text-muted-foreground">
            Need more detail now?{" "}
            <Link href="/contact" className="underline hover:no-underline">
              Contact for details
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
