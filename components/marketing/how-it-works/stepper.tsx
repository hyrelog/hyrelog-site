import { Card, CardContent } from '@/components/ui/card';
import { ImagePlaceholder } from '@/components/marketing/image-placeholder';

const steps = [
    {
        number: '01',
        title: 'Capture every critical action',
        bullets: [
            'Send events via API/SDK from app, admin, and system workflows',
            'Standard event schema: actor, action, target, timestamp, metadata',
            'Designed for audit trails (not just logs)'
        ],
        imagePath: '/marketing/step-capture.png',
        suggestedPath: '/public/marketing/step-capture.png',
        recommendation:
            'Use event ingestion UI or code + payload vector illustration.'
    },
    {
        number: '02',
        title: 'Make history tamper-evident',
        bullets: [
            'Cryptographic integrity (hash-linked event chains)',
            'Retention + archival policies',
            'Role-based access to audit data'
        ],
        imagePath: '/marketing/step-protect.png',
        suggestedPath: '/public/marketing/step-protect.png',
        recommendation: 'Use a hash-chain or verified-integrity status visual.'
    },
    {
        number: '03',
        title: 'Export evidence auditors trust',
        bullets: [
            'Auditor-ready exports (CSV/JSON; Evidence Packs in higher tiers)',
            'Filtering, timelines, and verification tooling',
            'Security review questions answered fast'
        ],
        imagePath: '/marketing/step-prove.png',
        suggestedPath: '/public/marketing/step-prove.png',
        recommendation:
            'Use evidence-pack/export concept with a verified badge.'
    }
];

export function HowItWorksStepper() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-6xl space-y-12">
                    {steps.map((step, idx) => (
                        <div
                            key={step.number}
                            className="grid items-start gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-10"
                        >
                            <Card
                                className={`order-2 rounded-2xl border bg-card shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md lg:h-full ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
                            >
                                <CardContent className="flex h-full flex-col justify-center p-6">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-full bg-primary/12 text-base font-bold text-primary">
                                            {step.number}
                                        </div>
                                        <h3 className="text-2xl font-semibold tracking-tight">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <ul className="space-y-3 text-muted-foreground">
                                        {step.bullets.map((bullet) => (
                                            <li
                                                key={bullet}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="mt-2 inline-block size-1.5 rounded-full bg-primary" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            <ImagePlaceholder
                                src={step.imagePath}
                                alt={step.title}
                                suggestedPath={step.suggestedPath}
                                recommendation={step.recommendation}
                                className={`order-1 lg:h-full ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
                                fit="contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
