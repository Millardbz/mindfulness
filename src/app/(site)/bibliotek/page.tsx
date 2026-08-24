import type { Metadata } from "next";

import { ResourceCard } from "@/components/library/ResourceCard";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { libraryPageQuery } from "@/sanity/lib/queries";
import type { LibraryPage, LibraryResourceCard } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Gratis Materialer",
  description:
    "Få et overblik over det gratis fra Circle of Mindfulness – meditationskort, Facebook-gruppen, bloggen og gratis videoer.",
};

const DEFAULTS = {
  heroKicker: "Gratis Materialer",
  heroTitle: "Alt det gratis – samlet ét sted",
  heroSubtitle:
    "Få et hurtigt overblik over de gratis tilbud – meditationskort, mit fællesskab på Facebook, bloggen og gratis videoer. Klik dig videre til det, du har lyst til.",
} as const;

// Shown when the Sanity list hasn't been filled in yet.
const FALLBACK_RESOURCES: LibraryResourceCard[] = [
  {
    label: "Kort",
    title: "Meditationskort",
    description:
      "Træk et kort og få 3–5 minutters ro – en lille pause, når du har brug for den.",
    href: "/kort",
  },
  {
    label: "Fællesskab",
    title: "Facebook-gruppen",
    description:
      "Mindfulness Universet – et gratis fællesskab med inspiration, tips og små pauser.",
    href: SITE.facebookGroupUrl,
    external: true,
  },
  {
    label: "Blog",
    title: "Blog",
    description:
      "Ord til ro og refleksion – enkle øvelser og tanker til hverdagen.",
    href: "/blog",
  },
  {
    label: "Video",
    title: "Gratis videoer",
    description:
      "Guidede videoer fra KIP TV – mindful yoga, body scan og mere.",
    href: "/bibliotek/videoer",
  },
];

export default async function LibraryOverviewView() {
  const page = await sanityFetch<LibraryPage | null>({
    query: libraryPageQuery,
    tags: ["libraryPage"],
    fallback: null,
  });

  const resources = page?.resources?.filter((r) => r?.title && r?.href) ?? [];
  const cards = resources.length > 0 ? resources : FALLBACK_RESOURCES;

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((resource, index) => (
              <ResourceCard
                key={`${resource.href}-${index}`}
                resource={resource}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
