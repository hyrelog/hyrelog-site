"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
}

export function TrackLink({
  children,
  eventName,
  eventParams,
  ...props
}: TrackLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        trackEvent(eventName, eventParams);
      }}
    >
      {children}
    </Link>
  );
}
