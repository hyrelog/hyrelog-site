import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";
import { solutions } from "@/content/solutions";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS = [
  "",
  "/product",
  "/about",
  "/how-it-works",
  "/security",
  "/pricing",
  "/blog",
  "/contact",
  "/waitlist",
  "/solutions",
  "/terms",
  "/privacy",
  "/compare/datadog",
  "/compare/cloudwatch",
  "/resources/soc2-audit-trail-checklist",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.updatedAt ?? post.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const solutionsMtime = fs.existsSync(path.join(process.cwd(), "content", "solutions.ts"))
    ? fs.statSync(path.join(process.cwd(), "content", "solutions.ts")).mtime
    : new Date();
  const solutionEntries = solutions.map((solution) => ({
    url: `${SITE_URL}/solutions/${solution.slug}`,
    lastModified: solutionsMtime,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: path ? `${SITE_URL}${path}` : SITE_URL,
    lastModified: new Date(),
    changeFrequency: (path === "" ? "weekly" : path === "/blog" ? "daily" : "monthly") as "daily" | "weekly" | "monthly" | "yearly",
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...solutionEntries];
}
