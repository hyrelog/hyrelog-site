import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getBlogSlugsUncached(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const slugs: string[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const dirPath = path.join(CONTENT_DIR, e.name);
    const hasMdx = fs.existsSync(path.join(dirPath, "index.mdx"));
    const hasMd = fs.existsSync(path.join(dirPath, "index.md"));
    if (hasMdx || hasMd) slugs.push(e.name);
  }
  return slugs;
}

export interface BlogFrontmatter {
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  updatedAt?: string;
  author?: string;
  authorUrl?: string;
  categories: string[];
  tags: string[];
  slug: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  /** Optional header image for post and list cards (e.g. /blog/headers/my-post.jpg) */
  image?: string;
  readingTimeMinutes?: number;
  draft: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTimeMinutes: number;
}

interface BlogSnapshot {
  slugs: string[];
  posts: BlogPost[];
  bySlug: Map<string, BlogPost>;
}

let cachedSnapshot: BlogSnapshot | null = null;

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/** Get slugs from content/blog/<name>/index.mdx or index.md */
export async function getBlogSlugs(): Promise<string[]> {
  return Promise.resolve(getSnapshot().slugs);
}

function getPostBySlugUncached(slug: string): BlogPost | null {
  const dirPath = path.join(CONTENT_DIR, slug);
  const mdxPath = path.join(dirPath, "index.mdx");
  const mdPath = path.join(dirPath, "index.md");
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!fullPath) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as Record<string, unknown>;
  if (frontmatter.draft === true) return null;

  const tags = Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [];
  const categories = Array.isArray(frontmatter.categories) ? (frontmatter.categories as string[]) : [];
  const readingTime =
    typeof frontmatter.readingTimeMinutes === "number"
      ? frontmatter.readingTimeMinutes
      : estimateReadingTime(content);

  const normalized: BlogFrontmatter = {
    title: String(frontmatter.title ?? ""),
    subtitle: frontmatter.subtitle != null ? String(frontmatter.subtitle) : undefined,
    description: String(frontmatter.description ?? ""),
    date: String(frontmatter.date ?? ""),
    updatedAt: frontmatter.updatedAt != null ? String(frontmatter.updatedAt) : undefined,
    author: frontmatter.author != null ? String(frontmatter.author) : undefined,
    authorUrl: frontmatter.authorUrl != null ? String(frontmatter.authorUrl) : undefined,
    categories,
    tags,
    slug: String(frontmatter.slug ?? slug),
    canonicalUrl: frontmatter.canonicalUrl != null ? String(frontmatter.canonicalUrl) : undefined,
    ogImage: frontmatter.ogImage != null ? String(frontmatter.ogImage) : undefined,
    ogImageAlt: frontmatter.ogImageAlt != null ? String(frontmatter.ogImageAlt) : undefined,
    image: frontmatter.image != null ? String(frontmatter.image) : undefined,
    readingTimeMinutes: typeof frontmatter.readingTimeMinutes === "number" ? frontmatter.readingTimeMinutes : undefined,
    draft: frontmatter.draft === true,
  };

  return {
    slug, // URL slug = folder name
    frontmatter: normalized,
    content,
    readingTimeMinutes: readingTime,
  };
}

/** Single post by slug (cached per slug at build) */
export function getPostBySlug(slug: string): BlogPost | null {
  return getSnapshot().bySlug.get(slug) ?? null;
}

function getAllPostsUncached(): BlogPost[] {
  const slugs = getBlogSlugsUncached();
  const posts = slugs
    .map((s) => getPostBySlugUncached(s))
    .filter((p): p is BlogPost => p !== null);
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/** All published posts, sorted by date */
export async function getAllPosts(): Promise<BlogPost[]> {
  return Promise.resolve(getSnapshot().posts);
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === currentSlug);
  if (!current) return all.slice(0, limit);
  const currentTags = new Set(current.frontmatter.tags);
  const scored = all
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const tagOverlap = p.frontmatter.tags.filter((t) => currentTags.has(t)).length;
      return { post: p, score: tagOverlap };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.frontmatter.categories.forEach((c) => set.add(c)));
  return Array.from(set).sort();
}

function getSnapshot(): BlogSnapshot {
  if (cachedSnapshot) return cachedSnapshot;
  const posts = getAllPostsUncached();
  cachedSnapshot = {
    slugs: posts.map((p) => p.slug),
    posts,
    bySlug: new Map(posts.map((p) => [p.slug, p])),
  };
  return cachedSnapshot;
}
