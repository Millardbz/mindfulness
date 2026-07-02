import type { Metadata } from "next";
import Link from "next/link";

import { Testimonial } from "@/components/home/Testimonial";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  TESTIMONIAL_GROUPS,
  TESTIMONIALS_SUBTITLE,
  TESTIMONIALS_TITLE,
} from "@/data/testimonials-content";
import { sanityFetch } from "@/sanity/lib/fetch";
import { testimonialsPageQuery } from "@/sanity/lib/queries";
import type { TestimonialsPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Udtalelser",
  description:
    "Læs, hvad klienter og virksomheder siger om mindfulness, mindful yoga og healing hos Circle of Mindfulness.",
};

export default async function TestimonialsPageView() {
  const data = await sanityFetch<TestimonialsPage | null>({
    query: testimonialsPageQuery,
    tags: ["testimonialsPage"],
    fallback: null,
  });

  const title = data?.heroTitle || TESTIMONIALS_TITLE;
  const subtitle = data?.heroSubtitle || TESTIMONIALS_SUBTITLE;
  const groups = data?.groups?.length ? data.groups : TESTIMONIAL_GROUPS;

  return (
    <>
      <section className="bg-aurora relative overflow-hidden">
        <Container className="py-16 md:py-24">
          <SectionHeading
            as="h1"
            kicker="Udtalelser"
            title={title}
            intro={subtitle}
            align="center"
          />
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="space-y-16 md:space-y-20">
            {groups.map((group, i) => {
              const reviews = group.reviews?.filter((r) => r?.quote) ?? [];
              if (!reviews.length) return null;
              return (
                <div key={`${group.title}-${i}`}>
                  <div className="mb-8 flex items-center gap-4">
                    <h2 className="shrink-0 font-serif text-2xl font-medium tracking-tight md:text-3xl">
                      {group.title}
                    </h2>
                    <span aria-hidden className="h-px flex-1 bg-border/70" />
                    <span className="shrink-0 rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-secondary-foreground/80">
                      {reviews.length}
                    </span>
                  </div>
                  <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
                    {reviews.map((review, j) => (
                      <div
                        key={`${review.author}-${j}`}
                        className="mb-6 break-inside-avoid"
                      >
                        <Testimonial review={review} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="pb-24">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-primary px-8 py-12 text-primary-foreground md:flex-row md:px-14">
            <div className="max-w-lg text-center md:text-left">
              <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                Skal din historie være den næste?
              </h2>
              <p className="mt-3 text-primary-foreground/80 text-pretty">
                Book en uforpligtende samtale, eller prøv en session – så finder
                vi sammen ud af, hvad der passer til dig.
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
                <Link href="/forloeb">Se forløb</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
