import Link from "next/link";

import { LotusMark } from "@/components/brand/LotusMark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SanityImage } from "@/components/ui/sanity-image";
import type { HomePage } from "@/sanity/types";

export function Hero({ home }: { home: HomePage }) {
  const primary = home.primaryCta?.href
    ? home.primaryCta
    : { label: "Træk et meditationskort", href: "/kort" };
  const secondary = home.secondaryCta?.href
    ? home.secondaryCta
    : { label: "Se forløb", href: "/forloeb" };

  return (
    <section className="bg-aurora relative overflow-hidden">
      <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            <LotusMark className="h-4 w-4" />
            {home.heroKicker || "Velkommen til ro"}
          </span>

          <h1 className="mt-6 text-[2rem] font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl sm:leading-[1.05] md:text-6xl">
            {home.heroTitle || "Find ro, nærvær og balance i hverdagen"}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {home.heroSubtitle ||
              "Jeg kombinerer mindfulness, mindful yoga og healing – med kroppen som udgangspunkt – og hjælper dig med at få mere ud af dit liv gennem små daglige pauser og konkrete redskaber."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={primary.href!}>{primary.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={secondary.href!}>{secondary.label}</Link>
            </Button>
          </div>
        </div>

        <div className="relative animate-in fade-in duration-1000">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-lift">
            {home.heroImage?.asset ? (
              <SanityImage
                image={home.heroImage}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
              />
            ) : (
              <div
                className="grain relative flex h-full items-center justify-center"
                style={{
                  background:
                    "radial-gradient(120% 120% at 30% 20%, var(--sage-100), var(--sage-50) 45%, var(--mist-100) 120%)",
                }}
              >
                {/* breathing rings (fluid so they scale with the box) */}
                <span className="absolute aspect-square w-[80%] rounded-full border border-primary/15" />
                <span className="absolute aspect-square w-[58%] rounded-full border border-primary/20" />
                <span className="absolute aspect-square w-[36%] rounded-full border border-primary/25" />
                <LotusMark className="relative h-24 w-24 text-primary/70 sm:h-28 sm:w-28" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
