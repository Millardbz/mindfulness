import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { BrandMark } from "@/components/brand/BrandMark";
import { PortableText } from "@/components/portable-text/PortableText";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SanityImage } from "@/components/ui/sanity-image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery } from "@/sanity/lib/queries";
import type { AboutPage } from "@/sanity/types";
import {
  ABOUT_HERO_SUBTITLE,
  ABOUT_HERO_TITLE,
  ABOUT_HIGHLIGHTS,
  ABOUT_PARAGRAPHS,
  ABOUT_QUOTE,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Om Sonja",
  description:
    "Mød Sonja Bomberg – kvinden bag Circle of Mindfulness. Fra stressramt bogholder til mindfulness-instruktør, yogalærer og Reiki Mester.",
};

const DEFAULT_ABOUT: AboutPage = {
  heroTitle: ABOUT_HERO_TITLE,
  heroSubtitle: ABOUT_HERO_SUBTITLE,
  highlights: ABOUT_HIGHLIGHTS,
  quote: ABOUT_QUOTE,
};

export default async function AboutPageView() {
  const data = await sanityFetch<AboutPage | null>({
    query: aboutPageQuery,
    tags: ["aboutPage"],
    fallback: null,
  });

  const about: AboutPage = { ...DEFAULT_ABOUT, ...(data ?? {}) };
  const highlights = about.highlights?.length
    ? about.highlights
    : DEFAULT_ABOUT.highlights!;

  return (
    <>
      {/* Hero intro */}
      <section className="bg-aurora relative overflow-hidden">
        <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              <BrandMark className="h-4 w-4" />
              Om mig
            </span>

            <h1 className="mt-6 text-4xl font-medium leading-[1.05] tracking-tight text-balance md:text-6xl">
              {about.heroTitle || DEFAULT_ABOUT.heroTitle}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {about.heroSubtitle || DEFAULT_ABOUT.heroSubtitle}
            </p>
          </div>

          <div className="relative animate-in fade-in duration-1000">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-primary/10 shadow-lift">
              {about.portrait?.asset ? (
                <SanityImage
                  image={about.portrait}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 90vw"
                />
              ) : (
                <Image
                  src="/images/portrait.jpg"
                  alt="Sonja Bomberg"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 460px, 90vw"
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-20 md:py-28">
        <Container size="narrow">
          {about.body?.length ? (
            <PortableText value={about.body} />
          ) : (
            <div className="text-[1.0625rem]">
              {ABOUT_PARAGRAPHS.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-5 leading-relaxed text-foreground/90 first:mt-0 text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Highlights */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((highlight, i) => (
              <div
                key={`${highlight.title}-${i}`}
                className="rounded-2xl border border-border/70 bg-card p-7 shadow-soft"
              >
                <BrandMark className="h-8 w-8 opacity-70" />
                <h3 className="mt-5 font-serif text-xl font-medium">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote */}
      {about.quote?.text && (
        <section className="pb-20 md:pb-28">
          <Container size="narrow">
            <figure className="text-center">
              <BrandMark className="mx-auto h-8 w-8 opacity-40" />
              <blockquote className="mt-6 font-serif text-2xl font-medium leading-snug tracking-tight text-balance md:text-3xl">
                “{about.quote.text}”
              </blockquote>
              {about.quote.author && (
                <figcaption className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {about.quote.author}
                </figcaption>
              )}
            </figure>
          </Container>
        </section>
      )}

      {/* Closing CTA */}
      <section className="pb-24">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-cta px-8 py-12 text-primary-foreground md:flex-row md:px-14">
            <div className="max-w-lg text-center md:text-left">
              <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                Skal vi finde din vej til ro sammen?
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                Har du lyst til at høre mere, eller vil du prøve det med det
                samme? Du er altid velkommen til at række ud.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/kontakt">Kontakt mig</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/kort">Træk et kort</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
