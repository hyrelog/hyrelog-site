import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";

export function HowItWorksRegions() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="uppercase tracking-[0.16em] text-xs">
              Regions & residency
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Regional control built in
            </h2>
            <div className="mt-5 space-y-3 text-muted-foreground">
              <p>Choose where audit data lives and keep conversations grounded in clear controls.</p>
              <p>
                Enterprise configurations support stricter options like EU-only and AU-only
                residency boundaries.
              </p>
              <p>
                HyreLog is designed for data residency discussions that come up in enterprise
                procurement and security reviews.
              </p>
            </div>
            <Card className="mt-6 rounded-2xl border bg-card shadow-sm">
              <CardContent className="p-5 text-sm text-muted-foreground">
                Supports SOC2-aligned environments with region-aware storage and retention options.
              </CardContent>
            </Card>
          </div>
          <ImagePlaceholder
            src="/marketing/regions-diagram.png"
            alt="Regions diagram with US EU AU nodes"
            suggestedPath="/public/marketing/regions-diagram.png"
            recommendation="Use a clean map or clustered-node vector with US/EU/AU region labels."
            fit="contain"
          />
        </div>
      </div>
    </section>
  );
}
