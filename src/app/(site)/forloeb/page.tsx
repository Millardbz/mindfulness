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

const DEFAULT_STEPS = [
  {
    title: "Afklaring & mål",
    text: "Vi taler kort om behov, ønsker og evt. udfordringer. Vi aftaler et enkelt fokus.",
  },
  {
    title: "Plan & format",
    text: "Vi vælger ramme: 1:1, hold, workshop eller online. Længde og frekvens tilpasses.",
  },
  {
    title: "Praksis",
    text: "Guidede øvelser: åndedræt, kropsnærvær og meditationskort – med plads til spørgsmål.",
  },
  {
    title: "Opfølgning",
    text: "Vi runder af med en kort plan for hverdagen og evt. næste skridt.",
  },
];

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
    "Et forløb giver dig tid og ro til at lade nærværet slå rod – skridt for skridt, med plads til netop dig.";
  const processTitle = offeringsPage?.processTitle || "Et typisk forløb";
  const steps = offeringsPage?.processSteps?.length
    ? offeringsPage.processSteps
    : DEFAULT_STEPS;

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

      {steps.length > 0 && (
        <section className="pb-20 md:pb-28">
          <Container size="narrow">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
              Sådan foregår det
            </span>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance md:text-4xl">
              {processTitle}
            </h2>
            <ol className="mt-10">
              {steps.map((step, i) => (
                <li
                  key={`${step.title}-${i}`}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-5 top-10 h-full w-px bg-border"
                    />
                  )}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-serif text-lg font-medium">
                      {step.title}
                    </h3>
                    {step.text && (
                      <p className="mt-1 text-muted-foreground text-pretty">
                        {step.text}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}
    </>
  );
}
