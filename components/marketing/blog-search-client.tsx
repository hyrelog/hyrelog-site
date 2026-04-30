"use client";

import { useState, useMemo } from "react";
import { type BlogPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlogSearchClientProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogSearchClient({ posts: initialPosts, tags }: BlogSearchClientProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = initialPosts;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(q) ||
          p.frontmatter.description.toLowerCase().includes(q) ||
          p.frontmatter.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTag) {
      list = list.filter((p) => p.frontmatter.tags.includes(selectedTag));
    }
    return list;
  }, [initialPosts, query, selectedTag]);

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
          aria-label="Search blog posts"
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={cn(
                "rounded-md px-2 py-1 text-sm transition-colors",
                selectedTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  "rounded-md px-2 py-1 text-sm transition-colors",
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-8 border-t pt-8">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">No posts match your filters.</p>
        ) : (
          filtered.map((post) => (
            <article key={post.slug} className="border-b pb-8 last:border-0 last:pb-0">
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:underline md:text-2xl">
                  {post.frontmatter.title}
                </h2>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {post.frontmatter.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readingTimeMinutes} min read</span>
                  {post.frontmatter.tags.length > 0 && (
                    <>
                      <span>·</span>
                      <span className="flex gap-1">
                        {post.frontmatter.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </span>
                    </>
                  )}
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
