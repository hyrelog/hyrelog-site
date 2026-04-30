import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { BlogListingClient } from "@/components/marketing/blog-listing-client";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Audit Logging, Security Reviews, and Data Residency",
  description:
    "Guides on immutable audit logs, SOC2 audit trails, enterprise security reviews, and building compliance-ready SaaS.",
  path: "/blog",
  image: "/og/blog.png",
});

/** Pre-rendered at build for instant load; use NEXT_PRIVATE_STATIC_WORKERS=1 if build hangs */
export const dynamic = "force-static";

export default async function BlogIndexPage() {
  const [posts, tags, categories] = await Promise.all([
    getAllPosts(),
    getAllTags(),
    getAllCategories(),
  ]);
  const webPageLd = webPageJsonLd({
    title: "Blog",
    description:
      "Articles on audit logging, SOC 2, GDPR, tamper-evident trails, and compliance for modern SaaS.",
    path: "/blog",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <section className="border-b py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
            <p className="mt-4 text-muted-foreground">
              Audit logging, compliance, and security for modern SaaS. Tamper-evident trails,
              SOC 2, GDPR, and data residency.
            </p>
            <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-md bg-muted" />}>
              <BlogListingClient
                posts={posts}
                tags={tags}
                categories={categories}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
