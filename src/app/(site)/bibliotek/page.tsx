import type { Metadata } from "next";

import { BrandMark } from "@/components/brand/BrandMark";
import { LibraryCard } from "@/components/library/LibraryCard";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allLibraryItemsQuery, libraryPageQuery } from "@/sanity/lib/queries";
import type { LibraryItemCard, LibraryPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Gratis bibliotek",
  description:
    "Gratis videoer og guidede meditationer fra Circle of Mindfulness. Skriv din e-mail, og få adgang med det samme.",
};

const DEFAULTS = {
  heroKicker: "Gratis bibliotek",
  heroTitle: "Gratis videoer og meditationer",
  heroSubtitle:
    "Et lille bibliotek med guidede meditationer og øvelser, du kan bruge derhjemme – helt gratis. Skriv din e-mail, og få adgang med det samme.",
} as const;

export default async function LibraryPageView() {
  const [page, items] = await Promise.all([
    sanityFetch<LibraryPage | null>({
      query: libraryPageQuery,
      tags: ["libraryPage"],
      fallback: null,
    }),
    sanityFetch<LibraryItemCard[]>({
      query: allLibraryItemsQuery,
      tags: ["libraryItem"],
      fallback: [],
    }),
  ]);

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
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <LibraryCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-card p-12 text-center shadow-soft">
              <BrandMark className="mx-auto h-10 w-10 opacity-60" />
              <h2 className="mt-6 font-serif text-xl font-medium tracking-tight">
                Biblioteket er på vej
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                De første videoer er på vej. Tilmeld dig nyhedsbrevet, så hører
                du om det, så snart de er klar.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
