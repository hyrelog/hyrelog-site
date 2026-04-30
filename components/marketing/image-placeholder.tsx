"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  suggestedPath: string;
  recommendation: string;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}

export function ImagePlaceholder({
  src,
  alt,
  suggestedPath,
  recommendation,
  className = "",
  priority = false,
  fit = "cover",
}: ImagePlaceholderProps) {
  const [showFallback, setShowFallback] = useState(false);

  return (
    <div className={`rounded-2xl border border-dashed bg-card/60 p-4 shadow-sm ${className}`}>
      <div className="overflow-hidden rounded-xl border bg-muted/30">
        {showFallback ? (
          <div className="flex aspect-4/3 items-center justify-center p-6 text-center">
            <div>
              <ImageIcon className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">Add image: `{suggestedPath}`</p>
              <p className="mt-2 text-xs text-muted-foreground">{recommendation}</p>
            </div>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            priority={priority}
            className={`aspect-4/3 h-auto w-full ${fit === "contain" ? "object-contain p-2" : "object-cover"}`}
            onError={() => setShowFallback(true)}
          />
        )}
      </div>
    </div>
  );
}
