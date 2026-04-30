import type { Metadata } from "next";
import Link from "next/link";
import { confirmNewsletter } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Confirm subscription",
  description: "Confirm your HyreLog newsletter subscription.",
  path: "/newsletter/confirm",
  noIndex: true,
});

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function NewsletterConfirmPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const result = token
    ? await confirmNewsletter(token)
    : { ok: false, message: "Invalid or expired link." };

  return (
    <div className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-md text-center">
          {result.ok ? (
            <>
              <h1 className="text-2xl font-semibold">You&apos;re subscribed</h1>
              <p className="mt-2 text-muted-foreground">{result.message}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/product">View product</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/security">Security & compliance</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Link invalid or expired</h1>
              <p className="mt-2 text-muted-foreground">{result.message}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/blog">Back to blog</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
