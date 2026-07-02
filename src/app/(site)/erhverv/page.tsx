import type { Metadata } from "next";
import Link from "next/link";

import { LotusMark } from "@/components/brand/LotusMark";
import { Testimonial } from "@/components/home/Testimonial";
import { OfferingCard } from "@/components/offerings/OfferingCard";
import { PortableText } from "@/components/portable-text/PortableText";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq";
import { SanityImage } from "@/components/ui/sanity-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { Icon } from "@/lib/icons";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allOfferingsQuery, erhvervPageQuery } from "@/sanity/lib/queries";
import type {
  ErhvervPage,
  OfferingCard as OfferingCardType,
} from "@/sanity/types";

const DEFAULT_ERHVERV: ErhvervPage = {
  heroKicker: "Erhverv",
  heroTitle: "Mindfulness, der styrker trivslen på arbejdspladsen",
  heroSubtitle:
    "Stress og konstant travlhed koster – på trivsel, fokus og bundlinje. Jeg hjælper virksomheder med at skabe ro og nærvær i hverdagen gennem workshops, foredrag og forløb, der tilpasses jeres behov.",
  primaryCta: { label: "Book en uforpligtende samtale", href: "/kontakt" },
  secondaryCta: { label: "Se løsninger", href: "#loesninger" },
  introHeading: "Hvorfor mindfulness på arbejdspladsen?",
  benefits: [
    {
      title: "Færre stress-symptomer",
      text: "Medarbejderne får enkle redskaber til at genfinde roen – før travlhed bliver til stress.",
      icon: "Leaf",
    },
    {
      title: "Skarpere fokus",
      text: "Korte, daglige pauser træner hjernen til at koncentrere sig – også når der er pres på.",
      icon: "Brain",
    },
    {
      title: "Stærkere samarbejde",
      text: "Nærvær smitter: mere lydhørhed, roligere møder og et bedre arbejdsfællesskab.",
      icon: "Users",
    },
  ],
  solutionsTitle: "Løsninger til jeres arbejdsplads",
  solutionsIntro:
    "Alt tilpasses jeres hverdag, ønsker og erfaring – fra et enkelt oplæg til længere forløb.",
  processTitle: "Sådan kommer vi i gang",
  processSteps: [
    {
      title: "Uforpligtende samtale",
      text: "Vi tager en kort snak om jeres hverdag, behov og ønsker – helt uforpligtende.",
    },
    {
      title: "Skræddersyet forslag",
      text: "I får et konkret forslag med indhold, varighed og pris, tilpasset jeres arbejdsplads.",
    },
    {
      title: "Afvikling hos jer",
      text: "Jeg kommer ud til jer – eller vi mødes online. Ingen forudsætninger kræves for at deltage.",
    },
    {
      title: "Opfølgning",
      text: "Vi evaluerer sammen og aftaler, hvordan I holder de gode vaner i live i hverdagen.",
    },
  ],
  faqTitle: "Ofte stillede spørgsmål",
  faqs: [
    {
      question: "Kræver det erfaring med meditation?",
      answer:
        "Nej, slet ikke. Øvelserne er enkle og jordnære, og alle kan være med – også dem, der er skeptiske.",
    },
    {
      question: "Hvor foregår det?",
      answer:
        "Jeg kommer gerne ud på jeres arbejdsplads – eller I kan besøge mit lokale i Ringsted. Workshops og forløb kan også afholdes online eller som en kombination.",
    },
    {
      question: "Hvor mange kan deltage?",
      answer:
        "Et oplæg kan holdes for hele organisationen, mens workshops og forløb fungerer bedst i grupper på op til ca. 20 personer.",
    },
    {
      question: "Hvor lang tid tager det?",
      answer:
        "En typisk workshop varer 2–3 timer, et oplæg ca. en time – og et forløb strækker sig ofte over 6–8 uger med korte, ugentlige sessioner.",
    },
    {
      question: "Hvad koster det?",
      answer:
        "Prisen afhænger af format og omfang. Kontakt mig for et uforpligtende tilbud, der passer til jeres ønsker og budget.",
    },
  ],
  reviews: [
    {
      quote:
        "Sessionen fik i øvrigt rigtig god feedback hele vejen rundt, og flere sagde faktisk, at de gerne vil begynde at dyrke yoga noget mere, så godt gået.",
      author: "Alexander Moldt Nielsen",
      role: "ALK",
    },
    {
      quote: "Tak for sidst. De var rigtig glade for dit input.",
      author: "Henrik Chr. X. Wedell-Neergaard",
      role: "Dansk Industri",
    },
  ],
  ctaTitle: "Skal vi styrke trivslen hos jer?",
  ctaText:
    "Fortæl mig lidt om jeres arbejdsplads, så vender jeg tilbage med et forslag til, hvordan vi sammen skaber mere ro og fokus i hverdagen.",
  ctaButton: { label: "Kontakt mig", href: "/kontakt" },
};

/** Shown when no offerings are linked in Sanity yet. */
const DEFAULT_SOLUTIONS: OfferingCardType[] = [
  {
    _id: "default-workshop",
    title: "Virksomhedsworkshops",
    summary:
      "Praktiske workshops med mindfulness, åndedræt og mindful yoga, der styrker trivsel, fokus og stressforebyggelse på arbejdspladsen.",
    icon: "Compass",
    duration: "2–3 timer",
    format: "Fysisk",
  },
  {
    _id: "default-foredrag",
    title: "Foredrag & inspirationsoplæg",
    summary:
      "Et levende oplæg om nærvær, stress og kroppens signaler – en oplagt start på temadage og personalemøder.",
    icon: "Sparkles",
    duration: "ca. 1 time",
    format: "Fysisk",
  },
  {
    _id: "default-forloeb",
    title: "Forløb for medarbejdere",
    summary:
      "Faste, korte sessioner over 6–8 uger, der giver jeres medarbejdere varige redskaber til ro og fokus.",
    icon: "Brain",
    duration: "6–8 uger",
    format: "Hybrid",
  },
];

/** Slugs used to auto-pick business offerings when none are hand-picked. */
const BUSINESS_SLUGS = [
  "virksomhedsworkshops",
  "foredrag-og-inspirationsoplaeg",
  "forloeb-for-medarbejdere",
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<ErhvervPage | null>({
    query: erhvervPageQuery,
    tags: ["erhvervPage"],
    fallback: null,
  });

  return {
    title: data?.seo?.metaTitle || "Erhverv – mindfulness til virksomheder",
    description:
      data?.seo?.metaDescription ||
      "Workshops, foredrag og forløb i mindfulness til arbejdspladser. Styrk trivsel, fokus og samarbejde med konkrete redskaber, der virker i en travl hverdag.",
    robots: data?.seo?.noIndex ? { index: false } : undefined,
  };
}

export default async function ErhvervPageView() {
  const [data, offerings] = await Promise.all([
    sanityFetch<ErhvervPage | null>({
      query: erhvervPageQuery,
      tags: ["erhvervPage"],
      fallback: null,
    }),
    sanityFetch<OfferingCardType[]>({
      query: allOfferingsQuery,
      tags: ["offering"],
      fallback: [],
    }),
  ]);

  const page: ErhvervPage = { ...DEFAULT_ERHVERV, ...(data ?? {}) };
  const benefits = page.benefits?.length
    ? page.benefits
    : DEFAULT_ERHVERV.benefits!;
  const businessOfferings = offerings.filter(
    (o) => o.slug && BUSINESS_SLUGS.includes(o.slug),
  );
  const solutions = page.solutions?.length
    ? page.solutions
    : businessOfferings.length
      ? businessOfferings
      : DEFAULT_SOLUTIONS;
  const steps = page.processSteps?.length
    ? page.processSteps
    : DEFAULT_ERHVERV.processSteps!;
  const faqs = page.faqs?.length ? page.faqs : DEFAULT_ERHVERV.faqs!;
  const reviews = page.reviews?.length
    ? page.reviews
    : DEFAULT_ERHVERV.reviews!;

  return (
    <>
      {/* Hero */}
      <section className="bg-aurora relative overflow-hidden">
        <Container
          className={cn(
            "py-20 md:py-28",
            page.heroImage?.asset &&
              "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]",
          )}
        >
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              <LotusMark className="h-4 w-4" />
              {page.heroKicker || DEFAULT_ERHVERV.heroKicker}
            </span>

            <h1 className="mt-6 text-[2rem] font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl sm:leading-[1.05] md:text-6xl">
              {page.heroTitle || DEFAULT_ERHVERV.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {page.heroSubtitle || DEFAULT_ERHVERV.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {page.primaryCta?.href && (
                <Button asChild size="lg">
                  <Link href={page.primaryCta.href}>
                    {page.primaryCta.label}
                  </Link>
                </Button>
              )}
              {page.secondaryCta?.href && (
                <Button asChild variant="outline" size="lg">
                  <Link href={page.secondaryCta.href}>
                    {page.secondaryCta.label}
                  </Link>
                </Button>
              )}
            </div>

            <p className="mt-10 text-sm text-muted-foreground">
              Har bl.a. afholdt sessioner for{" "}
              <span className="font-medium text-foreground/80">ALK</span> og{" "}
              <span className="font-medium text-foreground/80">
                Dansk Industri
              </span>
            </p>
          </div>

          {page.heroImage?.asset && (
            <div className="relative animate-in fade-in duration-1000">
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-primary/10 shadow-lift">
                <SanityImage
                  image={page.heroImage}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 90vw"
                />
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Udbyttet"
            title={page.introHeading || DEFAULT_ERHVERV.introHeading!}
            align="center"
          />
          {page.introBody?.length ? (
            <div className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground">
              <PortableText value={page.introBody} />
            </div>
          ) : (
            <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-muted-foreground text-pretty">
              Mindfulness er ikke en pause fra arbejdet – det er en træning i at
              være til stede i det. Forskning viser, at regelmæssig træning
              reducerer stress og styrker koncentration, overblik og samarbejde.
              Jeg kommer ud til jer med jordnære, konkrete øvelser, der passer
              ind i en travl arbejdsdag.
            </p>
          )}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <div
                key={`${benefit.title}-${i}`}
                className="rounded-2xl border border-border/70 bg-card p-8 text-center shadow-soft"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon name={benefit.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-medium">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section
        id="loesninger"
        className="scroll-mt-24 border-y border-border/50 bg-secondary/25 py-20 md:py-28"
      >
        <Container>
          <SectionHeading
            kicker="Løsninger"
            title={page.solutionsTitle || DEFAULT_ERHVERV.solutionsTitle!}
            intro={page.solutionsIntro || DEFAULT_ERHVERV.solutionsIntro}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <OfferingCard key={solution._id} offering={solution} />
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <Container size="narrow">
          <SectionHeading
            kicker="Processen"
            title={page.processTitle || DEFAULT_ERHVERV.processTitle!}
          />
          <ol className="mt-10 space-y-0">
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

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="pb-20 md:pb-28">
          <Container>
            <SectionHeading
              kicker="Udtalelser"
              title="Det siger virksomhederne"
              align="center"
              className="mb-10"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((review, i) => (
                <Testimonial key={`${review.author}-${i}`} review={review} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="pb-20 md:pb-28">
          <Container size="narrow">
            <SectionHeading
              kicker="Spørgsmål & svar"
              title={page.faqTitle || DEFAULT_ERHVERV.faqTitle!}
              align="center"
              className="mb-10"
            />
            <FaqList items={faqs} />
          </Container>
        </section>
      )}

      {/* Closing CTA */}
      <section className="pb-24">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-primary px-8 py-12 text-primary-foreground md:flex-row md:px-14">
            <div className="max-w-lg text-center md:text-left">
              <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                {page.ctaTitle || DEFAULT_ERHVERV.ctaTitle}
              </h2>
              <p className="mt-3 text-primary-foreground/80 text-pretty">
                {page.ctaText || DEFAULT_ERHVERV.ctaText}
              </p>
            </div>
            <Button asChild variant="accent" size="lg">
              <Link href={page.ctaButton?.href || "/kontakt"}>
                {page.ctaButton?.label || "Kontakt mig"}
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
