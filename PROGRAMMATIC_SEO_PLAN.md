# Programmatic SEO Plan

## Framework implemented

- Route pattern: `app/solutions/[slug]/page.tsx`
- Index route: `app/solutions/page.tsx`
- Structured data source: `content/solutions.ts`
- Static generation via `generateStaticParams()` for each solution slug
- Per-page metadata via `generateMetadata()` using structured content
- JSON-LD on each page:
  - `WebPage`
  - `BreadcrumbList`
  - `FAQPage` (only when FAQ exists)

## Content quality guardrails

- Each solution has unique title, description, sections, FAQs, use cases, and benefits.
- Copy is intent-based and useful for high-intent security/compliance buyers.
- No keyword stuffing or spun templates.
- Every page includes meaningful internal links to:
  - `/security`
  - `/pricing`
  - `/how-it-works`
  - relevant `/blog/[slug]` posts

## Current seed set (10)

1. `soc2-audit-trails`
2. `gdpr-audit-logging`
3. `data-residency-controls`
4. `tamper-evident-audit-logs`
5. `enterprise-security-questionnaires`
6. `audit-log-retention`
7. `audit-logging-for-fintech`
8. `audit-logging-for-healthtech`
9. `audit-logging-for-hr-payroll`
10. `siem-streaming-and-evidence-packs`

## Generator strategy (next steps)

1. Add one new solution entry in `content/solutions.ts`.
2. Ensure each entry has:
   - Unique angle
   - Distinct FAQ
   - Distinct related posts
   - Real use-case language
3. Rebuild; route is auto-generated through static params.
4. Add relevant internal links from blog and product pages.
5. Track search performance and iterate pages with low engagement.

This keeps scaling maintainable while preserving content quality.
