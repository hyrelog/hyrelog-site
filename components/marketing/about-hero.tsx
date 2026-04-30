import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AboutHero() {
  return (
    <section className="border-b bg-premium bg-grid bg-noise py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge variant="outline" className="mb-5 uppercase tracking-[0.16em] text-xs">
              About HyreLog
            </Badge>
            <div className="mb-5">
              <Logo size="md" href="/" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Audit trails shouldn&apos;t be an afterthought.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
              HyreLog exists to make every critical action provable - tamper-evident, region-aware,
              and ready for enterprise security reviews.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
            <p className="mt-5 text-sm text-muted-foreground">
              Built for immutable audit logs, tamper-evident audit trails, and data residency audit
              logging in SOC2-aligned environments.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/8 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl border bg-card/80 p-4 shadow-2xl backdrop-blur">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src="/resources/about.jpg"
                  alt="HyreLog team and product mission visual"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
