import Link from "next/link";

import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-aurora flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <BrandMark className="h-14 w-14 opacity-60" />
      <p className="mt-6 text-sm uppercase tracking-[0.25em] text-primary/70">
        404
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium md:text-4xl">
        Siden blev ikke fundet
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground text-pretty">
        Måske er den flyttet, eller også tog du en forkert drejning. Træk vejret
        – og find tilbage til ro.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Til forsiden</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/kort">Træk et kort</Link>
        </Button>
      </div>
    </main>
  );
}
