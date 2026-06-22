import type { Metadata } from "next";

import { LotusMark } from "@/components/brand/LotusMark";
import { OfferingCard } from "@/components/offerings/OfferingCard";
import { PortableText } from "@/components/portable-text/PortableText";
import { Container } from "@/components/ui/container";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allOfferingsQuery, offeringsPageQuery } from "@/sanity/lib/queries";
import type {
  OfferingsPage,
  OfferingCard as OfferingCardType,
} from "@/sanity/types";

export const metadata: Metadata = {
  title: "Forløb",
  description:
    "Find ro og fordybelse med et forløb i mindfulness – tilrettelagt i dit eget tempo, alene eller i et lille fællesskab.",
};

export default async function OfferingsPage() {
  const [offeringsPage, offerings] = await Promise.all([
    sanityFetch<OfferingsPage | null>({
      query: offeringsPageQuery,
      tags: ["offeringsPage"],
      fallback: null,
    }),
    sanityFetch<OfferingCardType[]>({
      query: allOfferingsQuery,
      tags: ["offering"],
      fallback: [],
    }),
  ]);

  const kicker = offeringsPage?.heroKicker || "Forløb & tilbud";
  const title = offeringsPage?.heroTitle || "Gå dybere — i dit eget tempo";
  const subtitle =
    offeringsPage?.heroSubtitle ||
    "Et forløb giver dig tid og ro til at lade nærværet slå rod – Skridt for skridt, med plads til netop dig.";

  return (
    <>
      <section className="bg-aurora relative overflow-hidden">
        <Container className="py-16 md:py-24">
          <header className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
              {kicker}
            </span>
            <h1 className="mt-3 text-4xl font-medium tracking-tight text-balance md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              {subtitle}
            </p>
            {offeringsPage?.intro ? (
              <div className="mt-6">
                <PortableText value={offeringsPage.intro} />
              </div>
            ) : (
              <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
                Uanset om du er nybegynder eller har mediteret i årevis, er du
                velkommen. Vælg et forløb, der passer til dig – og giv dig selv
                lov til at gå roligt frem.
              </p>
            )}
          </header>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          {offerings.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offerings.map((offering) => (
                <OfferingCard key={offering._id} offering={offering} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-card p-12 text-center shadow-soft">
              <LotusMark className="mx-auto h-10 w-10 text-primary/60" />
              <h2 className="mt-6 font-serif text-xl font-medium tracking-tight">
                Ingen forløb endnu
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                Der er ingen forløb at vise lige nu. Kig forbi igen senere – nye
                tilbud er på vej.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
