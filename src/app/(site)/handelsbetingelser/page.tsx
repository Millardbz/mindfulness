import type { Metadata } from "next";

import { PortableText } from "@/components/portable-text/PortableText";
import { Container } from "@/components/ui/container";
import { LEGAL_INTRO, LEGAL_SECTIONS, LEGAL_TITLE } from "@/data/legal-content";
import { sanityFetch } from "@/sanity/lib/fetch";
import { legalPageQuery } from "@/sanity/lib/queries";
import type { LegalPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Handelsbetingelser & privatlivspolitik",
  description:
    "Handelsbetingelser og privatlivspolitik for tjenesteydelser og digitale produkter hos Circle of Mindfulness.",
};

export default async function LegalPageView() {
  const data = await sanityFetch<LegalPage | null>({
    query: legalPageQuery,
    tags: ["legalPage"],
    fallback: null,
  });

  const title = data?.title || LEGAL_TITLE;
  const intro = data?.intro || LEGAL_INTRO;

  return (
    <>
      <section className="bg-aurora relative overflow-hidden">
        <Container size="narrow" className="py-16 md:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            Det med småt
          </span>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-balance md:text-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              {intro}
            </p>
          )}
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container size="narrow">
          {data?.body?.length ? (
            <PortableText value={data.body} />
          ) : (
            <div className="text-[1.0625rem]">
              {LEGAL_SECTIONS.map((section, i) => (
                <section key={section.heading ?? i}>
                  {section.heading && (
                    <h2 className="mt-12 font-serif text-2xl font-medium tracking-tight first:mt-0 md:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="mt-5 leading-relaxed text-foreground/90 text-pretty"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
