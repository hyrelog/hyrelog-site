import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = buildMetadata({
  title: "Solutions — Audit Logging Use Cases by Industry and Requirement",
  description:
    "Explore HyreLog solutions for SOC2, GDPR, residency controls, retention policy, and industry-specific audit logging workflows.",
  path: "/solutions",
  image: "/og/default.png",
});

interface SolutionsIndexPageProps {
  searchParams?: Promise<{ vertical?: string; q?: string }>;
}

export default async function SolutionsIndexPage({ searchParams }: SolutionsIndexPageProps) {
  const resolvedSearch = (await searchParams) ?? {};
  const vertical = resolvedSearch.vertical?.toLowerCase() ?? "all";
  const q = resolvedSearch.q?.toLowerCase() ?? "";

  const filtered = solutions.filter((solution) => {
    const verticalMatch = vertical === "all" || solution.vertical === vertical;
    const queryMatch =
      q.length === 0 ||
      solution.title.toLowerCase().includes(q) ||
      solution.description.toLowerCase().includes(q);
    return verticalMatch && queryMatch;
  });

  const webPageLd = webPageJsonLd({
    title: "Solutions",
    description:
      "Explore practical audit logging use cases for compliance, security reviews, and industry-specific requirements.",
    path: "/solutions",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
  ]);

  const verticals = ["all", "compliance", "security", "industry", "operations"] as const;

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Solutions</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            High-intent guides for teams evaluating immutable audit logs, tamper-evident audit
            trails, data residency controls, and enterprise security review readiness.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {verticals.map((item) => (
              <Link
                key={item}
                href={`/solutions?vertical=${encodeURIComponent(item)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className={`rounded-full border px-3 py-1 text-sm ${
                  item === vertical ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
                }`}
              >
                {item[0].toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>

          <form className="mt-4">
            <label htmlFor="solution-search" className="sr-only">
              Search solutions
            </label>
            <input
              id="solution-search"
              name="q"
              defaultValue={q}
              placeholder="Search solution pages"
              className="w-full max-w-md rounded-md border bg-background px-3 py-2 text-sm"
            />
            <input type="hidden" name="vertical" value={vertical} />
          </form>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((solution) => (
              <Card key={solution.slug} className="rounded-2xl border bg-card shadow-sm">
                <CardHeader>
                  <Badge variant="outline" className="w-fit capitalize">
                    {solution.vertical}
                  </Badge>
                  <h2 className="text-lg font-semibold">
                    <Link href={`/solutions/${solution.slug}`} className="hover:underline">
                      {solution.title}
                    </Link>
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
