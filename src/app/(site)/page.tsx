import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/home/Hero";
import { BrandMark } from "@/components/brand/BrandMark";
import { PortableText } from "@/components/portable-text/PortableText";
import { Testimonial } from "@/components/home/Testimonial";
import { PostCard } from "@/components/blog/PostCard";
import { OfferingCard } from "@/components/offerings/OfferingCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SanityImage } from "@/components/ui/sanity-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/lib/icons";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allOfferingsQuery,
  homePageQuery,
  homePostsQuery,
} from "@/sanity/lib/queries";
import type {
  HomePage,
  OfferingCard as Offering,
  PostCard as Post,
} from "@/sanity/types";
import {
  PORTRAIT_HEADING,
  PORTRAIT_PARAGRAPHS,
  REVIEWS,
} from "@/data/site-content";

const DEFAULT_HOME: HomePage = {
  introHeading: "Mindfulness, mindful yoga & healing",
  valueProps: [
    {
      title: "Mindfulness",
      text: "Vejen til at blive opmærksom, være til stede og stille – og få adgang til din indre GPS, der fortæller dig, hvordan du virkelig har det.",
      icon: "Leaf",
    },
    {
      title: "Mindful Yoga",
      text: "En unik, blid og langsom yogaform, der bringer nervesystemet i balance og styrker din indre sundhed. Alle kan være med.",
      icon: "Flower2",
    },
    {
      title: "Healing",
      text: "Energi fra universets livskraft, der intuitivt finder vej derhen, hvor du har brug for den – både fysisk og mentalt.",
      icon: "HandHeart",
    },
  ],
  quote: {
    text: "Du kan ikke stoppe bølgerne, men du kan lære at surfe.",
    author: "Jon Kabat-Zinn",
  },
  cardCtaTitle: "Brug for en pause lige nu?",
  cardCtaText:
    "Træk et meditationskort og giv dig selv 3–5 minutters ro – lige her, lige nu.",
  portraitSection: {
    heading: PORTRAIT_HEADING,
    primaryCta: { label: "Book en uforpligtende samtale", href: "/kontakt" },
    secondaryCta: { label: "Se forløb", href: "/forloeb" },
  },
  reviews: REVIEWS,
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
  const portrait = home.portraitSection;
  const reviews = home.reviews?.length ? home.reviews : REVIEWS;

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

      {/* Portrait / personal intro */}
      {portrait && (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border/70 shadow-soft">
                {portrait.image?.asset ? (
                  <SanityImage
                    image={portrait.image}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                ) : (
                  <Image
                    src="/images/portrait.jpg"
                    alt="Sonja Bomberg"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                )}
              </div>
              <div>
                <h2 className="font-serif text-3xl font-medium tracking-tight text-balance md:text-4xl">
                  {portrait.heading || PORTRAIT_HEADING}
                </h2>
                <div className="mt-4 text-muted-foreground">
                  {portrait.body?.length ? (
                    <PortableText value={portrait.body} />
                  ) : (
                    PORTRAIT_PARAGRAPHS.map((p, i) => (
                      <p
                        key={i}
                        className="mt-4 leading-relaxed first:mt-0 text-pretty"
                      >
                        {p}
                      </p>
                    ))
                  )}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {portrait.primaryCta?.href && (
                    <Button asChild size="lg">
                      <Link href={portrait.primaryCta.href}>
                        {portrait.primaryCta.label}
                      </Link>
                    </Button>
                  )}
                  {portrait.secondaryCta?.href && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={portrait.secondaryCta.href}>
                        {portrait.secondaryCta.label}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Card callout */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div
            className="grain relative overflow-hidden rounded-[2rem] border border-primary/10 px-8 py-14 text-center md:px-16"
            style={{
              background:
                "radial-gradient(120% 140% at 50% 0%, var(--sage-glow) 0%, var(--sage-glow-soft) 70%)",
            }}
          >
            <BrandMark className="mx-auto h-12 w-12 opacity-70" />
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
              <BrandMark className="mx-auto h-8 w-8 opacity-40" />
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

      {/* Reviews / testimonials */}
      {reviews.length > 0 && (
        <section className="border-y border-border/50 bg-secondary/25 py-20 md:py-28">
          <Container>
            <SectionHeading
              kicker="Udtalelser"
              title="Det siger andre"
              align="center"
              className="mb-12"
            />
            <div className="columns-1 gap-6 md:columns-2">
              {reviews.slice(0, 4).map((review, i) => (
                <div
                  key={`${review.author}-${i}`}
                  className="mb-6 break-inside-avoid"
                >
                  <Testimonial review={review} />
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/udtalelser">
                  Se alle udtalelser <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
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
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-cta px-8 py-12 text-primary-foreground md:flex-row md:px-14">
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
