import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCtaBand() {
  return (
    <section className="border-t bg-premium py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border bg-card/80 p-8 text-center shadow-xl backdrop-blur md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Next step
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to make compliance a competitive advantage?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Make enterprise security reviews smoother with a tamper-evident audit trail designed
            for scale.
          </p>
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
            <Button asChild variant="ghost" size="lg">
              <Link href="/security">Read security</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
