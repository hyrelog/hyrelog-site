import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { GoogleAnalytics } from "@/components/analytics/ga";
import { buildMetadata, canonicalUrl, organizationJsonLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "HyreLog — Immutable Audit Logging for SaaS",
    description:
      "Compliance-grade audit logging with tamper-evident integrity, regional data residency controls, and auditor-ready exports.",
    path: "/",
    image: "/og/default.png",
  }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HyreLog — Immutable Audit Logging for SaaS",
    template: "%s — HyreLog",
  },
  alternates: {
    canonical: canonicalUrl("/"),
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "HyreLog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgLd = organizationJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgLd),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:ring-2"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
