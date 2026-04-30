import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorksFinalCta() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border bg-card p-8 text-center shadow-xl md:p-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to ship audit trails that unblock enterprise deals?
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/waitlist">
                Join the waitlist
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact for details</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Get early access, launch updates, and beta pricing details.
          </p>
        </div>
      </div>
    </section>
  );
}
