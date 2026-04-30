import type { Metadata } from "next";
import Link from "next/link";
import { redeemLeadMagnet } from "@/app/actions/lead-magnet";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Download resource",
  description: "Download your HyreLog resource.",
  path: "/resources/download",
  noIndex: true,
});

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResourceDownloadPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const result = token
    ? await redeemLeadMagnet(token)
    : { ok: false, message: "Invalid or expired link.", downloadPath: undefined };

  return (
    <div className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-md text-center">
          {result.ok && result.downloadPath ? (
            <>
              <h1 className="text-2xl font-semibold">Download ready</h1>
              <p className="mt-2 text-muted-foreground">{result.message}</p>
              <Button asChild className="mt-8" size="lg">
                <a href={result.downloadPath} download>
                  Download PDF
                </a>
              </Button>
              <p className="mt-6">
                <Link href="/resources/soc2-audit-trail-checklist" className="text-sm text-muted-foreground underline hover:no-underline">
                  Request again
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Link invalid or expired</h1>
              <p className="mt-2 text-muted-foreground">
                {result.message} Request a new link below.
              </p>
              <Button asChild className="mt-8">
                <Link href="/resources/soc2-audit-trail-checklist">
                  Get the checklist
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
