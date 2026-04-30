import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function HowItWorksSecurityFaq() {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="uppercase tracking-[0.16em] text-xs">
            Security review ready
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Common questions from security and platform teams
          </h2>
          <Accordion type="single" collapsible className="mt-8 rounded-2xl border bg-card px-6">
            <AccordionItem value="obs">
              <AccordionTrigger>Is this observability?</AccordionTrigger>
              <AccordionContent>
                No. HyreLog is purpose-built audit logging with tamper-evident integrity,
                retention, residency controls, and evidence exports.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="altered">
              <AccordionTrigger>Can logs be altered?</AccordionTrigger>
              <AccordionContent>
                HyreLog uses tamper-evident integrity proofs so unauthorized changes can be
                detected.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="integrate">
              <AccordionTrigger>How fast to integrate?</AccordionTrigger>
              <AccordionContent>
                Typical implementation is often under one day depending on your stack and workflows
                (not guaranteed).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="siem">
              <AccordionTrigger>Can we stream to SIEM?</AccordionTrigger>
              <AccordionContent>
                SIEM streaming (for tools like Splunk/Sentinel) is available on enterprise-focused
                plans and add-ons.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="retention">
              <AccordionTrigger>Do you support long retention?</AccordionTrigger>
              <AccordionContent>
                Business includes one-year retention, and Enterprise supports 3-7 year options.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <p className="mt-5 text-sm text-muted-foreground">
            Need deeper details?{" "}
            <Link href="/security" className="underline underline-offset-4">
              See Security
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
