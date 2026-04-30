import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (p) => `
    <item>
      <title>${escapeXml(p.frontmatter.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <description>${escapeXml(p.frontmatter.description)}</description>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
