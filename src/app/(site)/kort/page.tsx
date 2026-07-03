import type { Metadata } from "next";

import { CardExperience } from "@/components/cards/CardExperience";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/container";
import { FALLBACK_CARDS } from "@/data/fallback-cards";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allCardsQuery } from "@/sanity/lib/queries";
import type { Card } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Meditationskort",
  description:
    "Træk et meditationskort og giv dig selv 3–5 minutters pause med nærvær og ro.",
};

export default async function KortPage() {
  const cards = await sanityFetch<Card[]>({
    query: allCardsQuery,
    tags: ["card"],
    fallback: FALLBACK_CARDS,
  });
  const list = cards.length ? cards : FALLBACK_CARDS;

  return (
    <section className="bg-aurora relative overflow-hidden">
      <Container className="flex flex-col items-center py-8 md:py-12">
        <header className="max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            <BrandMark className="h-4 w-4" />
            Et øjebliks ro
          </span>
          <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl text-balance">
            Træk et meditationskort
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            Lad kortet vælge din pause. Find et roligt sted, træk vejret, og lad
            dig guide i 3–5 minutter.
          </p>
        </header>

        <div className="mt-7 w-full md:mt-8">
          <CardExperience cards={list} />
        </div>
      </Container>
    </section>
  );
}
