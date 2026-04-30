import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImagePlaceholder } from '@/components/marketing/image-placeholder';

export function HowItWorksHero() {
    return (
        <section className="border-b bg-premium bg-grid bg-noise py-20 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <Badge
                            variant="outline"
                            className="mb-5 uppercase tracking-[0.16em] text-xs"
                        >
                            How it works
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            From events -&gt; evidence. In three steps.
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
                            HyreLog captures audit events, protects them with
                            tamper-evident integrity and regional controls, and
                            produces auditor-ready evidence when you need it.
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
                    </div>
                    <ImagePlaceholder
                        src="/marketing/how-it-works-hero.png"
                        alt="Architecture visual showing SaaS events into HyreLog regions and auditor exports"
                        suggestedPath="/public/marketing/how-it-works-hero.png"
                        recommendation="Use a clean architecture vector: SaaS app -> HyreLog regional pipeline -> exports and verifier."
                        priority
            fit="contain"
                    />
                </div>
            </div>
        </section>
    );
}
