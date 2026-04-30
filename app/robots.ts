import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const noIndex = process.env.NEXT_PUBLIC_NO_INDEX === "true";

  if (noIndex) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/newsletter/confirm", "/resources/download"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
