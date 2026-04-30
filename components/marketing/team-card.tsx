import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function TeamCard() {
  return (
    <Card className="rounded-2xl border bg-card shadow-sm">
      <CardContent className="p-6">
        <Badge variant="outline" className="uppercase tracking-[0.14em] text-xs">
          Team
        </Badge>
        <h3 className="mt-4 text-xl font-semibold">Mark Rosenberg</h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Founder / Product &amp; Engineering
        </p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Mark is a product and engineering leader focused on building reliable platform systems.
          His background spans software products across multiple industries, with a current focus
          on compliance-grade infrastructure for modern B2B SaaS teams.
        </p>
      </CardContent>
    </Card>
  );
}
