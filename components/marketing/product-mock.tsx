"use client";

/**
 * CSS-only pseudo-dashboard mock for hero. No images.
 */
export function ProductMock() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-card shadow-xl transition-transform duration-300 hover:shadow-2xl"
      aria-hidden
    >
      <div className="border-b bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-destructive/80" />
          <div className="size-2 rounded-full bg-amber-500/80" />
          <div className="size-2 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs font-medium text-muted-foreground">Audit log · Live</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2 w-24 rounded bg-muted-foreground/20" />
          <div className="h-6 w-16 rounded-md bg-primary/20" />
        </div>
        <div className="space-y-2">
          {[
            { w: "full", pill: "success" },
            { w: "85%", pill: "success" },
            { w: "70%", pill: "warning" },
            { w: "55%", pill: "success" },
            { w: "40%", pill: "muted" },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border bg-background/50 px-3 py-2"
            >
              <div
                className="h-2 flex-1 rounded bg-muted-foreground/15"
                style={{ maxWidth: row.w }}
              />
              <span
                className={
                  row.pill === "success"
                    ? "rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] text-green-700 dark:text-green-400"
                    : row.pill === "warning"
                      ? "rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-700 dark:text-amber-400"
                      : "rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                }
              >
                {row.pill === "success" ? "Verified" : row.pill === "warning" ? "Pending" : "—"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 border-t pt-3">
          <div className="h-7 flex-1 rounded bg-muted" />
          <div className="h-7 w-20 rounded bg-primary/30" />
        </div>
      </div>
    </div>
  );
}
