import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";

import { VideoGate } from "@/components/library/VideoGate";
import { PortableText } from "@/components/portable-text/PortableText";
import { Container } from "@/components/ui/container";
import { SanityImage } from "@/components/ui/sanity-image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  libraryItemBySlugQuery,
  libraryItemSlugsQuery,
  libraryPageQuery,
} from "@/sanity/lib/queries";
import type { LibraryItem, LibraryPage } from "@/sanity/types";

const GATE_DEFAULTS = {
  gateTitle: "Lås videoen op – helt gratis",
  gateText:
    "Skriv dit navn og din e-mail, så får du adgang til videoen med det samme. Du tilmeldes samtidig mit nyhedsbrev, som du altid kan afmelde igen.",
} as const;

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: libraryItemSlugsQuery,
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
  const item = await sanityFetch<LibraryItem | null>({
    query: libraryItemBySlugQuery,
    params: { slug },
    tags: ["libraryItem"],
    fallback: null,
  });

  if (!item) return { title: "Video ikke fundet" };

  const title = item.seo?.metaTitle || item.title;
  const description = item.seo?.metaDescription || item.summary;
  const ogSource = item.seo?.ogImage ?? item.thumbnail;
  const ogImage = ogSource?.asset
    ? urlFor(ogSource).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    robots: item.seo?.noIndex ? { index: false } : undefined,
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function LibraryItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item, page] = await Promise.all([
    sanityFetch<LibraryItem | null>({
      query: libraryItemBySlugQuery,
      params: { slug },
      tags: ["libraryItem"],
      fallback: null,
    }),
    sanityFetch<LibraryPage | null>({
      query: libraryPageQuery,
      tags: ["libraryPage"],
      fallback: null,
    }),
  ]);

  if (!item) notFound();

  return (
    <article className="py-16 md:py-24">
      <Container size="narrow">
        <Link
          href="/bibliotek"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          ← Gratis bibliotek
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-medium tracking-tight text-balance md:text-5xl">
            {item.title}
          </h1>
          {item.summary && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              {item.summary}
            </p>
          )}
          {item.duration && (
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary/70" />
              {item.duration}
            </p>
          )}
        </header>

        {item.thumbnail?.asset && (
          <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border/70">
            <SanityImage
              image={item.thumbnail}
              fill
              priority
              sizes="(min-width: 768px) 720px, 100vw"
            />
          </div>
        )}

        {item.body && (
          <div className="mt-10">
            <PortableText value={item.body} />
          </div>
        )}

        <div className="mt-12">
          <VideoGate
            slug={slug}
            hasVideo={item.hasVideo === true}
            gateTitle={page?.gateTitle || GATE_DEFAULTS.gateTitle}
            gateText={page?.gateText || GATE_DEFAULTS.gateText}
          />
        </div>
      </Container>
    </article>
  );
}
