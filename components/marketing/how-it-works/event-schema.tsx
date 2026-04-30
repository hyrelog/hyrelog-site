import Link from 'next/link';
import { Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ImagePlaceholder } from '@/components/marketing/image-placeholder';

const exampleEvent = `{
  "actor": {
    "type": "user",
    "id": "usr_123",
    "email": "alex@company.com"
  },
  "action": "invoice.approved",
  "target": {
    "type": "invoice",
    "id": "inv_8391"
  },
  "timestamp": "2026-02-19T10:21:13.002Z",
  "context": {
    "ip": "203.0.113.42",
    "userAgent": "Mozilla/5.0 ...",
    "requestId": "req_4f7c9a"
  },
  "metadata": {
    "amount": 4990,
    "currency": "USD",
    "approvalFlow": "finance-primary"
  }
}`;

export function HowItWorksEventSchema() {
    return (
        <section className="border-y bg-premium py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-6xl">
                    <Badge
                        variant="outline"
                        className="uppercase tracking-[0.16em] text-xs"
                    >
                        What you send
                    </Badge>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                        A simple audit event schema
                    </h2>
                    <p className="mt-3 max-w-3xl text-muted-foreground">
                        Keep payloads consistent and useful for investigations,
                        security reviews, and exports. For controls and
                        architecture details,{' '}
                        <Link
                            href="/security"
                            className="underline underline-offset-4"
                        >
                            see Security
                        </Link>{' '}
                        and{' '}
                        <Link
                            href="/pricing"
                            className="underline underline-offset-4"
                        >
                            Pricing
                        </Link>
                        .
                    </p>

                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        <Card className="rounded-2xl border bg-card shadow-sm">
                            <CardContent className="p-0">
                                <pre className="overflow-x-auto rounded-2xl bg-muted/35 p-5 text-sm leading-6">
                                    <code>{exampleEvent}</code>
                                </pre>
                            </CardContent>
                        </Card>
                        <ImagePlaceholder
                            src="/marketing/schema-illustration.png"
                            alt="Schema field mapping"
                            suggestedPath="/public/marketing/schema-illustration.png"
                            recommendation="Use a field-map vector connecting actor/action/target/context/metadata."
                            fit="contain"
                        />
                    </div>

                    <Card className="mt-6 rounded-2xl border bg-card shadow-sm">
                        <CardContent className="flex items-start gap-3 p-5 text-sm text-muted-foreground">
                            <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                            <p>
                                <span className="font-semibold text-foreground">
                                    Tip:
                                </span>{' '}
                                Most teams start by instrumenting auth, admin
                                actions, permission changes, exports, and
                                billing.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
