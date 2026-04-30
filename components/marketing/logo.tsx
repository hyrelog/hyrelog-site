"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
};

const sizeConfig = {
  sm: { width: 160, height: 44, class: "h-11 w-auto" },
  md: { width: 200, height: 56, class: "h-14 w-auto" },
  lg: { width: 240, height: 64, class: "h-16 w-auto" },
};

export function Logo({ size = "md", showWordmark = false, href = "/", className, onClick }: LogoProps) {
  const [mounted, setMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/brand/hyrelog-logo-dark.png"
      : "/brand/hyrelog-logo-light.png";

  const config = sizeConfig[size];

  const content = (
    <>
      {mounted && !logoError ? (
        <Image
          src={logoSrc}
          alt="HyreLog"
          width={config.width}
          height={config.height}
          className={cn("object-contain object-left", config.class)}
          unoptimized
          onError={() => setLogoError(true)}
          priority
        />
      ) : (
        <span className={cn("font-bold text-foreground", size === "sm" && "text-xl", size === "md" && "text-2xl", size === "lg" && "text-3xl")}>
          HyreLog
        </span>
      )}
      {showWordmark && (
        <span className="sr-only">HyreLog</span>
      )}
    </>
  );

  const wrapperClass = cn("flex shrink-0 items-center", className);

  if (href) {
    return (
      <Link href={href} className={wrapperClass} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return <span className={wrapperClass}>{content}</span>;
}
