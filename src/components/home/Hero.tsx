import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SanityImage } from "@/components/ui/sanity-image";
import type { HomePage } from "@/sanity/types";

const DEFAULT_FOUNDER = {
  name: "Sonja Bomberg",
  role: "Mindfulness-instruktør, yogalærer & Reiki Mester",
  text: "Min tilgang er altid kroppen og de betingelser, den giver. Jeg er klar til at hjælpe dig med at få mere ud af dit liv.",
};

export function Hero({ home }: { home: HomePage }) {
  const primary = home.primaryCta?.href
    ? home.primaryCta
    : { label: "Træk et meditationskort", href: "/kort" };
  const secondary = home.secondaryCta?.href
    ? home.secondaryCta
    : { label: "Se forløb", href: "/forloeb" };
  const founder = {
    name: home.founder?.name || DEFAULT_FOUNDER.name,
    role: home.founder?.role || DEFAULT_FOUNDER.role,
    text: home.founder?.text || DEFAULT_FOUNDER.text,
  };

  return (
    <section className="bg-aurora relative overflow-hidden">
      <Container className="grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            <BrandMark className="h-4 w-4" />
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

        {/* Portrait with the personal intro card */}
        <div className="relative pb-20 animate-in fade-in duration-1000 sm:pb-18">
          <div className="relative mx-auto w-full max-w-md">
            {/* breathing rings behind the portrait */}
            <span
              aria-hidden
              className="absolute -left-8 -top-8 aspect-square w-40 rounded-full border border-primary/15"
            />
            <span
              aria-hidden
              className="absolute -right-10 bottom-6 aspect-square w-56 rounded-full border border-primary/10"
            />

            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-lift">
              {home.heroImage?.asset ? (
                <SanityImage
                  image={home.heroImage}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 90vw"
                />
              ) : (
                <Image
                  src="/images/portrait.jpg"
                  alt={founder.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 460px, 90vw"
                />
              )}
            </div>

            {/* floating card */}
            <div className="absolute -bottom-16 left-4 right-4 rounded-2xl border border-border/70 bg-card/95 p-5 shadow-lift backdrop-blur-sm sm:-bottom-14 sm:-left-10 sm:right-auto sm:max-w-[19rem]">
              <div>
                <p className="font-serif text-base font-medium leading-tight">
                  {founder.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {founder.role}
                </p>
              </div>
              {founder.text && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  “{founder.text}”
                </p>
              )}
              <Link
                href="/om"
                className="group mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Mød Sonja
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
