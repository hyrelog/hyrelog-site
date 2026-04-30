import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "text-foreground": variant === "outline",
          "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
