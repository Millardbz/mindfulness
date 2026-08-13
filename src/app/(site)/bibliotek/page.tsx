import type { Metadata } from "next";

import { BrandMark } from "@/components/brand/BrandMark";
import { MaterialCard } from "@/components/library/MaterialCard";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sanityFetch } from "@/sanity/lib/fetch";
import { libraryPageQuery } from "@/sanity/lib/queries";
import type { LibraryPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Gratis Materialer",
  description:
    "Gratis videoer og guidede meditationer fra Circle of Mindfulness – se dem direkte på YouTube.",
};

const DEFAULTS = {
  heroKicker: "Gratis Materialer",
  heroTitle: "Gratis videoer og meditationer",
  heroSubtitle:
    "Et lille bibliotek med guidede meditationer og øvelser, du kan bruge derhjemme – helt gratis. Klik dig videre til videoerne på YouTube.",
} as const;

export default async function LibraryPageView() {
  const page = await sanityFetch<LibraryPage | null>({
    query: libraryPageQuery,
    tags: ["libraryPage"],
    fallback: null,
  });

  const videos = page?.videos?.filter((video) => video?.youtubeUrl) ?? [];

  return (
    <>
      <section className="bg-aurora relative overflow-hidden">
        <Container className="py-16 md:py-24">
          <SectionHeading
            as="h1"
            align="center"
            kicker={page?.heroKicker || DEFAULTS.heroKicker}
            title={page?.heroTitle || DEFAULTS.heroTitle}
            intro={page?.heroSubtitle || DEFAULTS.heroSubtitle}
          />
        </Container>
      </section>

      <section className="py-14 pb-20 md:py-20 md:pb-28">
        <Container>
          {videos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => (
                <MaterialCard
                  key={`${video.youtubeUrl}-${index}`}
                  video={video}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-card p-12 text-center shadow-soft">
              <BrandMark className="mx-auto h-10 w-10 opacity-60" />
              <h2 className="mt-6 font-serif text-xl font-medium tracking-tight">
                Materialerne er på vej
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                De første videoer er på vej. Kig forbi igen snart.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
