# HyreLog Marketing Site

Marketing/brochure site for [HyreLog](https://hyrelog.com): compliance-grade audit logging — immutable trails, multi-region residency, auditor-ready exports.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**, **Tailwind CSS**
- **shadcn-style UI** (Radix primitives + Tailwind)
- **next-themes** (light/dark, system-aware)
- **File-based blog** (Markdown in `content/blog/`, rendered with a minimal server-side parser)
- **Forms (Server Actions only)**: Contact, newsletter (double opt-in), lead magnet, book demo — Resend + Turnstile + honeypot + rate limiting. All submissions persisted to **Prisma** (PostgreSQL).

## Setup

### Package manager

The project is set up for **pnpm**. From the repo root:

```bash
pnpm install
```

If you use npm, run `npm install` (and ignore `packageManager` in `package.json` if needed).

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `SITE_URL` | Canonical site URL (e.g. `https://hyrelog.com`) for SEO and links |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for sending contact form emails |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Sender address (must be a [verified domain](https://resend.com/docs/dashboard/domains/introduction) in Resend) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (client) |
| `RATE_LIMIT_MAX` | Max requests per window (default 5) |
| `RATE_LIMIT_WINDOW_SEC` | Rate limit window in seconds (default 60) |
| `DATABASE_URL` | PostgreSQL connection string for Prisma |

- Without Resend keys, form submissions will fail to send email.
- Without Turnstile keys, forms still work; the server logs a warning and skips token verification.
- **Database (Prisma 7):** The project uses Prisma 7 with the `prisma-client` generator and `@prisma/adapter-pg`. The connection URL is configured in `prisma.config.ts` (not in the schema). Run `pnpm db:generate` or `npm run db:generate` after clone to generate the client into `generated/prisma`. Run `prisma migrate dev` or `prisma db push` to apply the schema. The `pg` package is required for the adapter.

### Brand assets

Add your logos under `public/brand/`:

- `hyrelog-logo-dark.png` — used on light backgrounds (e.g. light theme header)
- `hyrelog-logo-light.png` — used on dark backgrounds (e.g. dark theme header)

If these are missing, the header shows a fallback “H” initial. See `public/brand/.gitkeep` for a short note.

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

## Content

### Blog

- **Location**: `content/blog/` — one file per post (`.md` or `.mdx`).
- **Frontmatter**: `title`, `description`, `date`, `tags` (array), `published` (boolean), optional `author`.
- **RSS**: `/rss.xml` (generated from published posts).

Add or edit Markdown/MDX files; no CMS. Rebuild or rely on dev server to pick up changes.

## SEO

- **Metadata**: Centralized in `lib/seo/` with shared `buildMetadata()` and per-route usage.
- **Sitemap**: `/sitemap.xml` includes static routes + blog + solutions pages.
- **Robots**: `/robots.txt` allows indexing in production and can force noindex on previews with `NEXT_PUBLIC_NO_INDEX=true`.
- **JSON-LD**: Organization (layout), SoftwareApplication (product), BlogPosting (blog post), Breadcrumb (subpages), FAQPage (solutions).
- **Assets**: Required icon/OG/marketing assets are listed in `public/SEO_ASSETS_REQUIRED.md`.

## SEO Setup You Must Do

### A) Domain + site URL

- Set `SITE_URL` to your production domain, e.g. `https://hyrelog.com`.
- Confirm all canonical URLs use this value (no localhost in production).

### B) Google Search Console

- Add a **Domain property** for your root domain.
- Verify ownership via DNS.
- Submit sitemap: `https://hyrelog.com/sitemap.xml`.
- Request indexing for key routes (`/`, `/product`, `/security`, `/pricing`, `/blog`, `/solutions`).

### C) GA4 (optional)

- Create a GA4 property and measurement ID.
- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Verify realtime events after deploy (waitlist/contact/pricing CTA events).

### D) Social profiles for schema

- Add LinkedIn/X/GitHub URLs to Organization `sameAs` in `lib/seo/jsonld.ts` when final accounts are ready.

### E) Robots + indexing sanity

- Keep production indexable.
- Keep preview/staging non-indexable by setting `NEXT_PUBLIC_NO_INDEX=true` on preview environments.

### F) OG and marketing images

- Replace all placeholders and missing assets listed in `public/SEO_ASSETS_REQUIRED.md`.
- Required OG size is `1200x630`.
- Ensure branding consistency (logo lockup, typography, and contrast).

### G) Verification

- Follow `SEO_CHECKLIST.md` to validate metadata, structured data, sitemap, robots, status codes, and performance before go-live.

## Project structure (high level)

- `app/` — App Router routes (home, product, security, pricing, blog, contact, book-demo, resources, newsletter/confirm, terms, privacy, compare).
- `app/actions/` — Server Actions only (contact, newsletter, lead-magnet, book-demo). No `/api` routes for these forms.
- `components/marketing/` — Header, footer, contact form, newsletter form, blog search.
- `components/forms/` — Turnstile widget.
- `components/ui/` — Reusable UI (Button, Card, Badge, Input, Textarea, Accordion, Tabs, Dialog, Separator).
- `components/providers/` — Theme provider (next-themes).
- `lib/` — `seo.ts`, `blog.ts`, `db.ts` (Prisma 7 + adapter), `zod-error.ts` (Zod 4–compatible helpers), `lib/security/` (ip, ua, rate-limit, honeypot, turnstile), `lib/email/resend.ts`, `lib/crypto/tokens.ts`.
- `prisma.config.ts` — Prisma 7 config (datasource URL, schema path). Env is loaded via `dotenv/config`.
- `generated/prisma/` — Generated Prisma client (gitignored; create with `db:generate`).
- `content/blog/` — Blog posts (`.md` / `.mdx`).
- `public/resources/` — Add `soc2-audit-trail-checklist.pdf` for the lead magnet download (only linked after redemption).

## Deploy (e.g. Vercel)

- Set the env vars in the Vercel project.
- Optional: use [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for distributed rate limiting by extending `lib/security/rate-limit.ts`. Default is in-memory (serverless-safe; state may reset between invocations).

---

© HyreLog. Compliance-grade audit logging for modern SaaS.
