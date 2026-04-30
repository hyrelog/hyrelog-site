import { AlertTriangle, Building2, FileWarning, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const timelineItems = [
  {
    title: "The enterprise deal that stalled",
    description:
      "A promising deal slowed down when security reviewers asked for a clear, verifiable audit trail.",
    icon: Building2,
  },
  {
    title: "The DIY audit-table trap",
    description:
      "Homegrown audit tables looked fine until schema drift, weak integrity guarantees, and retention gaps appeared.",
    icon: FileWarning,
  },
  {
    title: "The security review reality check",
    description:
      "Teams needed tamper evidence, residency answers, and exports that could stand up in enterprise scrutiny.",
    icon: AlertTriangle,
  },
  {
    title: "HyreLog: infrastructure purpose-built for audit trails",
    description:
      "We built dedicated audit logging infrastructure that treats evidence quality as a product requirement.",
    icon: ShieldCheck,
  },
];

export function AboutTimeline() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {timelineItems.map((item, index) => (
        <Card key={item.title} className="rounded-2xl border bg-card shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                <item.icon className="size-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Step {index + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
