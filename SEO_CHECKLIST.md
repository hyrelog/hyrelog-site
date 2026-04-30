# SEO Checklist

## Implemented in code

- Metadata coverage in App Router with centralized helpers in `lib/seo/`.
- Canonical URLs generated consistently from `SITE_URL`.
- Open Graph and Twitter tags applied via `buildMetadata()`.
- Dynamic metadata for blog posts in `app/blog/[slug]/page.tsx`.
- Sitemap in `app/sitemap.ts` includes static pages, blog posts, and solutions pages.
- Robots in `app/robots.ts` allows indexing by default and supports preview noindex via `NEXT_PUBLIC_NO_INDEX=true`.
- JSON-LD coverage:
  - Organization on root layout.
  - SoftwareApplication on product.
  - Breadcrumbs on subpages and dynamic pages.
  - BlogPosting on blog detail pages.
  - FAQPage on solutions detail pages.
- OG image path strategy defined (`/og/*.png`) with explicit per-page image assignments.
- Favicon/icon/apple-touch metadata configured in `app/layout.tsx`.
- Internal linking conventions present on marketing, blog, and solution pages.
- Semantic headings and landmark usage (`main`, ordered heading flow).
- Image handling uses `next/image` where image assets exist.
- Page-speed protections:
  - Mostly server-rendered pages.
  - Minimal client JS for SEO-sensitive routes.
  - No heavy analytics framework.
- Redirect strategy preserved (`/book-demo` redirects to `/waitlist`).
- Non-public token pages are `noindex` and dynamic where appropriate.
- 404 behavior uses `notFound()` on dynamic routes like blog and solutions.

## How to verify

1. Run local checks:
   - `pnpm build`
   - `pnpm start`
2. Confirm metadata in page source:
   - Open a route.
   - Inspect `<title>`, canonical `<link rel="canonical">`, OG, Twitter tags.
3. Validate OpenGraph cards:
   - Facebook Sharing Debugger.
   - X/Twitter Card Validator.
4. Run Lighthouse:
   - Chrome DevTools -> Lighthouse.
   - Check SEO + Accessibility + Performance for home/product/pricing/blog/solutions.
5. Validate sitemap:
   - Open `/sitemap.xml`.
   - Confirm static pages + `/blog/*` + `/solutions/*` appear.
6. Validate robots:
   - Open `/robots.txt`.
   - Confirm `Allow: /` and absolute sitemap URL in production.
7. Validate canonical URLs:
   - Spot-check pages for correct absolute canonical under production domain.
8. Validate JSON-LD:
   - Use Google Rich Results Test on product/blog post/solutions page.
9. Confirm no accidental noindex:
   - Inspect response headers and source for `noindex` on public pages.
10. Confirm status codes:
   - Public pages return `200`.
   - Unknown blog/solutions slugs return `404`.
