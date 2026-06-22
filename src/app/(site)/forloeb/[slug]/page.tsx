import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, Tag } from "lucide-react";

import { Gallery } from "@/components/portable-text/Gallery";
import { PortableText } from "@/components/portable-text/PortableText";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SanityImage } from "@/components/ui/sanity-image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  offeringBySlugQuery,
  offeringSlugsQuery,
} from "@/sanity/lib/queries";
import type { Offering } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: offeringSlugsQuery,
    fallback: [],
  });
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offering = await sanityFetch<Offering | null>({
    query: offeringBySlugQuery,
    params: { slug },
    tags: ["offering"],
    fallback: null,
  });

  if (!offering) return { title: "Forløb ikke fundet" };

  const title = offering.seo?.metaTitle || offering.title;
  const description = offering.seo?.metaDescription || offering.summary;
  const ogSource = offering.seo?.ogImage ?? offering.mainImage;
  const ogImage = ogSource?.asset
    ? urlFor(ogSource).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function OfferingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offering = await sanityFetch<Offering | null>({
    query: offeringBySlugQuery,
    params: { slug },
    tags: ["offering"],
    fallback: null,
  });

  if (!offering) notFound();

  const hasBadges =
    offering.duration || offering.format || offering.price;

  return (
    <article className="py-16 md:py-24">
      <Container size="narrow">
        <Link
          href="/forloeb"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          ← Alle forløb
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-medium tracking-tight text-balance md:text-5xl">
            {offering.title}
          </h1>
          {offering.summary && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              {offering.summary}
            </p>
          )}

          {hasBadges && (
            <dl className="mt-6 flex flex-wrap gap-3">
              {offering.duration && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary/70" />
                  <dt className="sr-only">Varighed</dt>
                  <dd>{offering.duration}</dd>
                </div>
              )}
              {offering.format && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary/70" />
                  <dt className="sr-only">Format</dt>
                  <dd>{offering.format}</dd>
                </div>
              )}
              {offering.price && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-1.5 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 text-primary/70" />
                  <dt className="sr-only">Pris</dt>
                  <dd>{offering.price}</dd>
                </div>
              )}
            </dl>
          )}
        </header>

        {offering.mainImage?.asset && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border/70">
            <SanityImage
              image={offering.mainImage}
              fill
              priority
              sizes="(min-width: 768px) 720px, 100vw"
            />
          </div>
        )}

        {offering.body && (
          <div className="mt-10">
            <PortableText value={offering.body} />
          </div>
        )}

        {(offering.forWhom || offering.includes?.length) && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {offering.forWhom && (
              <div className="rounded-2xl border border-border/70 bg-secondary/30 p-6">
                <h2 className="font-serif text-lg font-medium">
                  Hvem er det for?
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">
                  {offering.forWhom}
                </p>
              </div>
            )}
            {offering.includes?.length ? (
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
                <h2 className="font-serif text-lg font-medium">Det får du</h2>
                <ul className="mt-3 space-y-2">
                  {offering.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-foreground/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {offering.gallery?.some((g) => g?.asset) && (
          <div className="mt-12">
            <Gallery images={offering.gallery} />
          </div>
        )}

        <div className="mt-12 rounded-3xl bg-primary p-7 text-primary-foreground sm:p-10 md:mt-14 md:rounded-[2rem]">
          <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl text-balance">
            Klar til at tage det første skridt?
          </h2>
          <p className="mt-3 max-w-lg text-primary-foreground/80 text-pretty">
            Har du spørgsmål til forløbet, eller vil du gerne i gang? Skriv til
            mig, så finder vi sammen ud af, hvad der passer dig bedst.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-8">
            {offering.bookingUrl ? (
              <a href={offering.bookingUrl} target="_blank" rel="noreferrer">
                Book nu
              </a>
            ) : (
              <Link href="/kontakt">Skriv til mig</Link>
            )}
          </Button>
        </div>
      </Container>
    </article>
  );
}
