import {
  CircleCheckBig,
  Repeat,
  TrendingUp,
  Globe,
  Wrench,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const principles = [
  {
    title: "Trust is built with evidence",
    body: "Integrity proofs and auditability are baseline requirements, not optional extras.",
    icon: CircleCheckBig,
  },
  {
    title: "Security reviews should be repeatable",
    body: "Answers to enterprise questionnaires should come from reliable systems, not one-off cleanup work.",
    icon: Repeat,
  },
  {
    title: "Compliance should accelerate revenue, not block it",
    body: "Strong audit evidence helps teams close deals faster with fewer late-stage surprises.",
    icon: TrendingUp,
  },
  {
    title: "Residency and retention are product features",
    body: "Data location and retention policy control should be explicit, enforceable, and visible.",
    icon: Globe,
  },
  {
    title: "Developer experience matters",
    body: "Integration should be fast so platform teams can adopt immutable audit logs without heavy friction.",
    icon: Wrench,
  },
];

export function PrinciplesGrid() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {principles.map((principle) => (
        <Card key={principle.title} className="rounded-2xl border bg-card shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary">
              <principle.icon className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">{principle.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{principle.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
