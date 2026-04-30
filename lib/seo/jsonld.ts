import { brandLogos, defaultDescription, siteName, siteUrl } from "./config";

export function organizationJsonLd(params?: { sameAs?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}${brandLogos.dark}`,
    description: defaultDescription,
    sameAs: params?.sameAs ?? [],
  };
}

export function softwareAppJsonLd(params?: { description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud",
    description: params?.description ?? defaultDescription,
    url: siteUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function blogPostingJsonLd(params: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const postUrl = `${siteUrl}/blog/${params.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    url: postUrl,
    mainEntityOfPage: postUrl,
    image: params.image ?? `${siteUrl}/og/blog.png`,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: params.author
      ? { "@type": "Person", name: params.author }
      : { "@type": "Organization", name: siteName },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${brandLogos.dark}`,
      },
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{
    name: string;
    path: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
