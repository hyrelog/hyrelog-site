import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { JsonLd } from '@/components/seo/json-ld';
import { FramedPlaceholder } from '@/components/marketing/framed-placeholder';
import { solutions, solutionsBySlug } from '@/content/solutions';
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from '@/lib/seo';

interface SolutionPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
    params
}: SolutionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const solution = solutionsBySlug.get(slug);
    if (!solution) return { title: 'Not Found' };

    return buildMetadata({
        title: `${solution.title}`,
        description: solution.description,
        path: `/solutions/${solution.slug}`,
        image: solution.ogImage ?? '/og/default.png'
    });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { slug } = await params;
    const solution = solutionsBySlug.get(slug);
    if (!solution) notFound();

    const breadcrumbLd = breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Solutions', path: '/solutions' },
        { name: solution.title, path: `/solutions/${solution.slug}` }
    ]);
    const webPageLd = webPageJsonLd({
        title: solution.title,
        description: solution.description,
        path: `/solutions/${solution.slug}`
    });
    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: solution.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
    };

    return (
        <div className="py-16 md:py-20">
            <JsonLd data={[webPageLd, breadcrumbLd, faqLd]} />
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-5xl">
                    <Badge variant="outline" className="capitalize">
                        {solution.vertical} solution
                    </Badge>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                        {solution.title}
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                        {solution.description}
                    </p>
                    {/* 
                    <div className="relative mt-8 overflow-hidden rounded-2xl border bg-muted/40 p-4">
                        {solution.ogImage ? (
                            <Image
                                src={solution.ogImage}
                                alt={`${solution.title} illustration`}
                                width={1200}
                                height={630}
                                className="h-auto w-full rounded-xl object-cover"
                                priority
                            />
                        ) : (
                            <Image
                                src="/marketing/architecture-pipeline.png"
                                alt={`${solution.title} illustration`}
                                width={600}
                                height={315}
                                className="w-1/5 rounded-xl object-cover"
                                priority
                            />
                        )}
                    </div> */}

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="/waitlist">Join the waitlist</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/contact">Contact for details</Link>
                        </Button>
                    </div>

                    <section className="mt-12 grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold">
                                    Use cases
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {solution.useCases.map((item) => (
                                        <li key={item}>- {item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold">
                                    Key benefits
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {solution.keyBenefits.map((item) => (
                                        <li key={item}>- {item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mt-12 space-y-8">
                        {solution.sections.map((section) => (
                            <article key={section.heading}>
                                <h2 className="text-2xl font-semibold">
                                    {section.heading}
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    {section.body}
                                </p>
                            </article>
                        ))}
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold">
                            Related reads
                        </h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {solution.relatedPosts.map((postSlug) => (
                                <Link
                                    key={postSlug}
                                    href={`/blog/${postSlug}`}
                                    className="rounded-full border px-3 py-1 text-sm hover:bg-muted"
                                >
                                    {postSlug.replaceAll('-', ' ')}
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold">FAQ</h2>
                        <Accordion
                            type="single"
                            collapsible
                            className="mt-4 rounded-xl border px-4"
                        >
                            {solution.faq.map((item, index) => (
                                <AccordionItem
                                    key={item.question}
                                    value={`${solution.slug}-${index}`}
                                >
                                    <AccordionTrigger>
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>

                    <section className="mt-12 rounded-2xl border bg-card p-6">
                        <p className="text-muted-foreground">
                            Explore implementation detail in{' '}
                            <Link href="/how-it-works" className="underline">
                                How it works
                            </Link>
                            , control design in{' '}
                            <Link href="/security" className="underline">
                                Security
                            </Link>
                            , and plan options in{' '}
                            <Link href="/pricing" className="underline">
                                Pricing
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
