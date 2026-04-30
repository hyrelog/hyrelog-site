import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Page not found</h1>
          <p className="mt-4 text-muted-foreground">
            The page you are looking for does not exist, may have moved, or is no longer available.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/solutions">View solutions</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
