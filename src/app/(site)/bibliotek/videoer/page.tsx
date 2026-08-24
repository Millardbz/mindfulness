import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { MaterialCard } from "@/components/library/MaterialCard";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sanityFetch } from "@/sanity/lib/fetch";
import { libraryPageQuery } from "@/sanity/lib/queries";
import type { LibraryPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Gratis videoer",
  description:
    "Gratis guidede videoer fra Circle of Mindfulness – mindful yoga, body scan og mere, direkte på YouTube.",
};

export default async function LibraryVideosView() {
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
            kicker="Gratis Materialer"
            title="Gratis videoer"
            intro="Guidede videoer fra KIP TV – mindful yoga, body scan og mere. Klik dig videre til YouTube."
          />
        </Container>
      </section>

      <section className="py-14 pb-20 md:py-20 md:pb-28">
        <Container>
          <Link
            href="/bibliotek"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbage til Gratis Materialer
          </Link>

          <div className="mt-8">
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
                  Videoerne er på vej
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  De første videoer er på vej. Kig forbi igen snart.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
