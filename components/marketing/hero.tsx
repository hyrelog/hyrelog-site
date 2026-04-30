'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
    // Set this to your final hero asset path when ready, e.g. "/marketing/audit-flow-vector.webp"
    const heroImageSrc = '/resources/audit.jpg';

    return (
        <section className="relative overflow-hidden border-b bg-background py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="w-full text-center lg:text-left">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Immutable audit trails for modern SaaS.
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl lg:mx-0">
                            Pass enterprise security reviews with
                            tamper-evident, region-aware audit logging.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                            <Button asChild size="lg" className="text-base">
                                <Link href="/waitlist">Join the waitlist</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="text-base"
                            >
                                <Link href="/contact">Contact for details</Link>
                            </Button>
                        </div>
                        <p className="mt-8 text-sm text-muted-foreground">
                            Typical integration: &lt; 1 day · Region controls ·
                            Auditor-ready exports
                        </p>
                        <div className="mt-12 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
                                Supports SOC2-aligned environments
                            </span>
                            <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
                                GDPR / data residency controls
                            </span>
                            <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
                                Tamper-evident integrity proofs
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="rounded-2xl border border-dashed bg-card/60 p-6 shadow-sm">
                            <div className="flex aspect-4/3 items-center justify-center rounded-xl border bg-white p-6 text-center">
                                {heroImageSrc ? (
                                    <Image
                                        src={heroImageSrc}
                                        alt="Vector illustration of tamper-evident audit logging flow with regional residency controls"
                                        width={1200}
                                        height={900}
                                        className="h-full w-full rounded-lg object-contain"
                                        priority
                                    />
                                ) : (
                                    <div>
                                        <ImageIcon className="mx-auto size-8 text-muted-foreground" />
                                        <p className="mt-3 text-sm font-medium">
                                            Image placeholder
                                        </p>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Recommended: clean vector
                                            illustration of an audit event
                                            flowing through a tamper-evident
                                            hash chain into an evidence
                                            dashboard, with subtle region pins
                                            (EU/US/AU) to signal data residency.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
