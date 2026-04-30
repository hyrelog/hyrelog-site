import Link from "next/link";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { Logo } from "@/components/marketing/logo";

const footerLinks = {
  product: [
    { href: "/product", label: "Product" },
    { href: "/security", label: "Security" },
    { href: "/pricing", label: "Pricing" },
  ],
  resources: [
    { href: "/blog", label: "Blog" },
    { href: "/waitlist", label: "Join the waitlist" },
    { href: "/resources/soc2-audit-trail-checklist", label: "SOC 2 Checklist" },
    { href: "/contact", label: "Contact for details" },
  ],
  legal: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ],
};

function XLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.039 9.19L24 22.847h-7.406l-5.799-7.584-6.638 7.584H.474l8.597-9.826L0 1.154h7.594l5.241 6.932 6.066-6.932Zm-1.29 19.493h2.04L6.486 3.24H4.298L17.61 20.646Z" />
    </svg>
  );
}

function LinkedInLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.542V6.169H2.542v7.373zM3.742 5.163c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.206 2.4 3.915c0 .694.52 1.248 1.327 1.248zm9.8 8.379V9.359c0-2.24-1.194-3.281-2.788-3.281-1.285 0-1.863.708-2.183 1.205v.025h-.016l.016-.025V6.169H6.17c.03.739 0 7.373 0 7.373h2.401V9.425c0-.22.016-.44.08-.598.176-.44.576-.897 1.248-.897.88 0 1.232.677 1.232 1.67v3.942z" />
    </svg>
  );
}

function InstagramLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 0C5.826 0 5.555.01 4.703.048 3.85.088 3.269.222 2.76.42a5 5 0 0 0-1.805 1.175A5 5 0 0 0 .42 2.76c-.198.509-.332 1.09-.371 1.943C.01 5.555 0 5.826 0 8c0 2.174.01 2.445.048 3.297.039.852.173 1.434.371 1.943a5 5 0 0 0 1.175 1.805 5 5 0 0 0 1.805 1.175c.509.198 1.09.332 1.943.371C5.555 15.99 5.826 16 8 16c2.174 0 2.445-.01 3.297-.048.852-.039 1.434-.173 1.943-.371a5 5 0 0 0 1.805-1.175 5 5 0 0 0 1.175-1.805c.198-.509.332-1.09.371-1.943C15.99 10.445 16 10.174 16 8c0-2.174-.01-2.445-.048-3.297-.039-.852-.173-1.434-.371-1.943a5 5 0 0 0-1.175-1.805A5 5 0 0 0 13.24.42c-.509-.198-1.09-.332-1.943-.371C10.445.01 10.174 0 8 0m0 1.442c2.137 0 2.39.008 3.231.046.777.036 1.2.165 1.48.274.371.144.636.317.915.596.279.279.452.544.596.915.109.28.238.703.274 1.48.038.841.046 1.094.046 3.231s-.008 2.39-.046 3.231c-.036.777-.165 1.2-.274 1.48a3.56 3.56 0 0 1-.596.915 3.56 3.56 0 0 1-.915.596c-.28.109-.703.238-1.48.274-.841.038-1.094.046-3.231.046s-2.39-.008-3.231-.046c-.777-.036-1.2-.165-1.48-.274a3.56 3.56 0 0 1-.915-.596 3.56 3.56 0 0 1-.596-.915c-.109-.28-.238-.703-.274-1.48-.038-.841-.046-1.094-.046-3.231s.008-2.39.046-3.231c.036-.777.165-1.2.274-1.48.144-.371.317-.636.596-.915.279-.279.544-.452.915-.596.28-.109.703-.238 1.48-.274.841-.038 1.094-.046 3.231-.046m0 2.454A4.104 4.104 0 1 0 8 12.104 4.104 4.104 0 0 0 8 3.896m0 6.769A2.665 2.665 0 1 1 8 5.335a2.665 2.665 0 0 1 0 5.33m5.225-6.931a.96.96 0 1 1-.96-.96.96.96 0 0 1 .96.96" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo href="/" size="sm" />
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Compliance-grade audit logging. Immutable trails, multi-region residency, auditor-ready exports.
            </p>
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Newsletter</h4>
              <NewsletterForm sourcePlacement="footer" />
              <div className="mt-4 flex items-center gap-3" aria-label="Social links">
                <Link
                  href="https://www.linkedin.com/company/hyrelog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LinkedInLogoIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com/hyrelog"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XLogoIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/hyrelog"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <InstagramLogoIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm">Product</h4>
            <ul aria-label="Footer product links" className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm">Resources & Legal</h4>
            <ul aria-label="Footer resources and legal links" className="mt-3 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HyreLog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
