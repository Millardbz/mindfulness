import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/home/Hero";
import { LotusMark } from "@/components/brand/LotusMark";
import { PortableText } from "@/components/portable-text/PortableText";
import { PostCard } from "@/components/blog/PostCard";
import { OfferingCard } from "@/components/offerings/OfferingCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/lib/icons";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allOfferingsQuery,
  homePageQuery,
  homePostsQuery,
} from "@/sanity/lib/queries";
import type { HomePage, OfferingCard as Offering, PostCard as Post } from "@/sanity/types";

const DEFAULT_HOME: HomePage = {
  introHeading: "Mindfulness, der passer ind i dit liv",
  valueProps: [
    {
      title: "Nærvær",
      text: "Lær at være til stede i nuet – uden at dømme dig selv.",
      icon: "Leaf",
    },
    {
      title: "Ro i kroppen",
      text: "Enkle åndedrætsøvelser, der beroliger dit nervesystem.",
      icon: "Wind",
    },
    {
      title: "Balance",
      text: "Find tilbage til balance, når livet føles travlt.",
      icon: "Waves",
    },
  ],
  quote: {
    text: "Du kan ikke stoppe bølgerne, men du kan lære at surfe.",
    author: "Jon Kabat-Zinn",
  },
  cardCtaTitle: "Brug for en pause lige nu?",
  cardCtaText:
    "Træk et meditationskort og giv dig selv 3–5 minutters ro – lige her, lige nu.",
};

export default async function HomePageView() {
  const [homeData, posts, offerings] = await Promise.all([
    sanityFetch<HomePage | null>({
      query: homePageQuery,
      tags: ["homePage"],
      fallback: null,
    }),
    sanityFetch<Post[]>({
      query: homePostsQuery,
      tags: ["post"],
      fallback: [],
    }),
    sanityFetch<Offering[]>({
      query: allOfferingsQuery,
      tags: ["offering"],
      fallback: [],
    }),
  ]);

  const home: HomePage = { ...DEFAULT_HOME, ...(homeData ?? {}) };
  const valueProps = home.valueProps?.length
    ? home.valueProps
    : DEFAULT_HOME.valueProps!;
  const featuredOfferings = home.featuredOfferings?.length
    ? home.featuredOfferings
    : offerings.slice(0, 3);

  return (
    <>
      <Hero home={home} />

      {/* Value props */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Hvorfor mindfulness"
            title={home.introHeading || DEFAULT_HOME.introHeading!}
            align="center"
          />
          {home.introBody?.length ? (
            <div className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground">
              <PortableText value={home.introBody} />
            </div>
          ) : null}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((vp, i) => {
              return (
                <div
                  key={`${vp.title}-${i}`}
                  className="rounded-2xl border border-border/70 bg-card p-8 text-center shadow-soft"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon name={vp.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-medium">
                    {vp.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {vp.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Card callout */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div
            className="grain relative overflow-hidden rounded-[2rem] border border-primary/10 px-8 py-14 text-center md:px-16"
            style={{
              background:
                "radial-gradient(120% 140% at 50% 0%, var(--sage-100), var(--sage-50) 60%, var(--clay-100) 160%)",
            }}
          >
            <LotusMark className="mx-auto h-12 w-12 text-primary/70" />
            <h2 className="mt-6 font-serif text-3xl font-medium tracking-tight md:text-4xl text-balance">
              {home.cardCtaTitle || DEFAULT_HOME.cardCtaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
              {home.cardCtaText || DEFAULT_HOME.cardCtaText}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/kort">Træk et kort</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured offerings */}
      {featuredOfferings.length > 0 && (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                kicker="Forløb & tilbud"
                title="Gå dybere med et forløb"
              />
              <Button asChild variant="ghost">
                <Link href="/forloeb">
                  Se alle forløb <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredOfferings.map((offering) => (
                <OfferingCard key={offering._id} offering={offering} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Quote */}
      {home.quote?.text && (
        <section className="pb-20 md:pb-28">
          <Container size="narrow">
            <figure className="text-center">
              <LotusMark className="mx-auto h-8 w-8 text-primary/40" />
              <blockquote className="mt-6 font-serif text-2xl font-medium leading-snug tracking-tight text-balance md:text-3xl">
                “{home.quote.text}”
              </blockquote>
              {home.quote.author && (
                <figcaption className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {home.quote.author}
                </figcaption>
              )}
            </figure>
          </Container>
        </section>
      )}

      {/* Featured posts */}
      {posts.length > 0 && (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading kicker="Fra bloggen" title="Læsning til ro" />
              <Button asChild variant="ghost">
                <Link href="/blog">
                  Alle indlæg <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Contact CTA */}
      <section className="pb-24">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-primary px-8 py-12 text-primary-foreground md:flex-row md:px-14">
            <div className="max-w-lg text-center md:text-left">
              <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                Lad os finde din vej til ro
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                Har du spørgsmål, eller vil du høre mere om et forløb? Jeg
                hjælper dig gerne videre.
              </p>
            </div>
            <Button asChild variant="accent" size="lg">
              <Link href="/kontakt">Kontakt mig</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
