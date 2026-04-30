import type { Metadata } from "next";
import {
  defaultDescription,
  defaultKeywords,
  defaultLocale,
  defaultTitle,
  siteName,
  siteUrl,
  twitterHandle,
} from "./config";
export {
  siteName as SITE_NAME,
  siteUrl as SITE_URL,
  defaultDescription as DEFAULT_DESCRIPTION,
} from "./config";
export {
  organizationJsonLd,
  softwareAppJsonLd,
  softwareAppJsonLd as softwareApplicationJsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
} from "./jsonld";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalUrl(path = "/") {
  return absoluteUrl(path);
}

interface BuildMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

export function buildMetadata(input: BuildMetadataInput = {}): Metadata {
  const title = input.title ?? defaultTitle;
  const description = input.description ?? defaultDescription;
  const canonical = input.canonical ?? canonicalUrl(input.path ?? "/");
  const image = absoluteUrl(input.image ?? "/og/default.png");
  const robots = input.noIndex ? { index: false, follow: false } : { index: true, follow: true };

  return {
    title: { absolute: title },
    description,
    keywords: [...defaultKeywords],
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
        "x-default": canonical,
      },
    },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: defaultLocale,
      type: input.openGraphType ?? "website",
      publishedTime: input.publishedTime,
      authors: input.authors,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: twitterHandle || undefined,
    },
  };
}

export function webPageJsonLd(params: { title: string; description?: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.title,
    description: params.description ?? defaultDescription,
    url: canonicalUrl(params.path),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}

