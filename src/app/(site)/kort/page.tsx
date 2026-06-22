import type { Metadata } from "next";

import { CardExperience } from "@/components/cards/CardExperience";
import { LotusMark } from "@/components/brand/LotusMark";
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
      <Container className="flex flex-col items-center py-16 md:py-24">
        <header className="max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            <LotusMark className="h-4 w-4" />
            Et øjebliks ro
          </span>
          <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl text-balance">
            Træk et meditationskort
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Lad kortet vælge din pause. Find et roligt sted, træk vejret, og lad
            dig guide i 3–5 minutter.
          </p>
        </header>

        <div className="mt-12 w-full md:mt-16">
          <CardExperience cards={list} />
        </div>
      </Container>
    </section>
  );
}
