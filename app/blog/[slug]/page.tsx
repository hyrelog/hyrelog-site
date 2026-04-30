import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getBlogSlugs, getRelatedPosts } from "@/lib/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, blogPostingJsonLd, SITE_URL, webPageJsonLd } from "@/lib/seo";
import { MarkdownContent } from "@/components/marketing/markdown-content";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  const f = post.frontmatter;
  const image = f.ogImage
    ? f.ogImage.startsWith("http")
      ? f.ogImage
      : `${SITE_URL}${f.ogImage}`
    : "/og/blog.png";

  return buildMetadata({
    title: f.title,
    description: f.description,
    path: `/blog/${slug}`,
    canonical: f.canonicalUrl,
    image,
    openGraphType: "article",
    publishedTime: f.date,
    authors: f.author ? [f.author] : undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);
  const f = post.frontmatter;
  const jsonLd = blogPostingJsonLd({
    title: f.title,
    description: f.description,
    slug: post.slug,
    datePublished: f.date,
    dateModified: f.updatedAt ?? f.date,
    author: f.author,
    image: f.ogImage ? (f.ogImage.startsWith("http") ? f.ogImage : `${SITE_URL}${f.ogImage}`) : `${SITE_URL}/og/blog.png`,
  });
  const webPageLd = webPageJsonLd({
    title: f.title,
    description: f.description,
    path: `/blog/${post.slug}`,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: f.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[jsonLd, webPageLd, breadcrumbLd]} />
      <article className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <header className="mb-10">
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Blog
              </Link>
              {(post.frontmatter.image ?? post.frontmatter.ogImage) && (
                <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={post.frontmatter.image ?? post.frontmatter.ogImage ?? ""}
                    alt={post.frontmatter.ogImageAlt ?? ""}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              )}
              <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                {post.frontmatter.title}
              </h1>
              {post.frontmatter.subtitle && (
                <p className="mt-2 text-xl text-muted-foreground">
                  {post.frontmatter.subtitle}
                </p>
              )}
              <p className="mt-2 text-lg text-muted-foreground">
                {post.frontmatter.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.frontmatter.updatedAt && post.frontmatter.updatedAt !== post.frontmatter.date && (
                  <>
                    <span>·</span>
                    <span>Updated {new Date(post.frontmatter.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </>
                )}
                <span>·</span>
                <span>{post.readingTimeMinutes} min read</span>
                {post.frontmatter.author && (
                  <>
                    <span>·</span>
                    {post.frontmatter.authorUrl ? (
                      <a href={post.frontmatter.authorUrl} className="hover:underline" rel="author">
                        {post.frontmatter.author}
                      </a>
                    ) : (
                      <span>{post.frontmatter.author}</span>
                    )}
                  </>
                )}
                {post.frontmatter.categories.length > 0 && (
                  <span className="ml-2 flex flex-wrap gap-1">
                    {post.frontmatter.categories.map((cat) => (
                      <span key={cat} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {cat}
                      </span>
                    ))}
                  </span>
                )}
                {post.frontmatter.tags.length > 0 && (
                  <span className="ml-2 flex flex-wrap gap-1">
                    {post.frontmatter.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                      >
                        {tag}
                      </Link>
                    ))}
                  </span>
                )}
              </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MarkdownContent content={post.content} />
            </div>

            {related.length > 0 && (
              <aside className="mt-16 border-t pt-10">
                <h2 className="text-lg font-semibold">Related posts</h2>
                <ul className="mt-4 space-y-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-muted-foreground hover:text-foreground hover:underline"
                      >
                        {p.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <aside className="mt-16 rounded-lg border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold">Get compliance tips in your inbox</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Subscribe for updates on audit logging and security reviews.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/contact">Get updates</Link>
                </Button>
              </div>
            </aside>

            <div className="mt-12">
              <Button asChild variant="outline">
                <Link href="/blog">Back to blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
