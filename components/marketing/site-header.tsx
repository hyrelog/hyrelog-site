'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Logo } from '@/components/marketing/logo';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Product' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/security', label: 'Security' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
];

export function SiteHeader() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Logo href="/" size="sm" onClick={() => setOpen(false)} />

                <nav
                    aria-label="Primary"
                    className="hidden md:flex items-center gap-6 text-sm font-medium"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
                    >
                        Contact for details
                    </Link>
                    <Button asChild size="sm" className="hidden md:inline-flex">
                        <Link href="/waitlist">Join the waitlist</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        {open ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </Button>
                </div>
            </div>

            {open && (
                <div className="border-t md:hidden bg-background">
                    <nav
                        aria-label="Mobile"
                        className="container mx-auto flex flex-col gap-1 px-4 py-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground'
                                )}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Button asChild className="mt-2 w-full">
                            <Link href="/waitlist" onClick={() => setOpen(false)}>
                                Join the waitlist
                            </Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
