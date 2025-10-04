// src/app/procedures/page.tsx
import { Metadata } from "next";
import {
  Heart,
  Users,
  Building2,
  Video,
  Wind,
  Headphones,
  CalendarClock,
  ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Procedurer – Sonja Circle",
  description:
    "Sådan arbejder jeg: 1:1 sessioner, gruppeforløb, virksomhedsworkshops og online-forløb – trin for trin.",
};

type Service = {
  title: string;
  desc: string;
  icon: React.ElementType;
};

const services: Service[] = [
  {
    title: "1:1 sessioner",
    desc: "Personligt tilpassede sessioner med fokus på ro, nærvær og konkrete redskaber til hverdagen.",
    icon: Heart,
  },
  {
    title: "Gruppeforløb",
    desc: "Små hold med trygt rum til at øve guidede meditationer og åndedrætsøvelser.",
    icon: Users,
  },
  {
    title: "Virksomhedsworkshops",
    desc: "Praktiske workshops der styrker trivsel, fokus og stressforebyggelse på arbejdspladsen.",
    icon: Building2,
  },
  {
    title: "Online sessioner",
    desc: "Fleksible forløb via video – samme struktur, samme nærvær, hvor end du er.",
    icon: Video,
  },
  {
    title: "Åndedræts-træning",
    desc: "Enkle teknikker der regulerer nervesystemet og skaber ro i kroppen.",
    icon: Wind,
  },
  {
    title: "Guidede meditationer",
    desc: "Blide, jordnære øvelser – også som lydfiler du kan bruge derhjemme.",
    icon: Headphones,
  },
];

const steps = [
  {
    title: "Afklaring & mål",
    text: "Vi taler kort om behov, ønsker og evt. udfordringer. Vi aftaler et enkelt fokus.",
    icon: ClipboardCheck,
  },
  {
    title: "Plan & format",
    text: "Vælger ramme: 1:1, hold, workshop eller online. Længde og frekvens tilpasses.",
    icon: CalendarClock,
  },
  {
    title: "Praksis",
    text: "Guidede øvelser: åndedræt, kropsnærvær, meditationskort – med plads til spørgsmål.",
    icon: Wind,
  },
  {
    title: "Opfølgning",
    text: "Vi runder af med en kort plan for hverdagen og evt. næste skridt.",
    icon: Heart,
  },
];

export default function ProceduresPage() {
  return (
    <section className="py-10 md:py-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto px-2">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Procedurer & forløb
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-xl text-muted-foreground">
          Klar og rolig struktur – uanset om du vælger 1:1, gruppe, workshop
          eller online.
        </p>
      </div>

      {/* Services grid */}
      <div className="mt-10 md:mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, desc, icon: Icon }) => (
          <article
            key={title}
            className="rounded-xl border bg-card p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
                <p className="mt-1 text-sm md:text-base text-muted-foreground">
                  {desc}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Timeline / steps */}
      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Et typisk forløb
        </h2>

        <ol className="mt-6 space-y-6 md:space-y-8">
          {steps.map(({ title, text, icon: Icon }, i) => (
            <li key={title} className="relative pl-10 md:pl-12">
              <span className="absolute left-0 top-0 inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {i + 1}
              </span>
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="text-base md:text-lg font-semibold">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm md:text-base text-muted-foreground">
                    {text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* CTA */}
      <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-3">
        <a
          href="/contact"
          className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 hover:opacity-90"
        >
          Book en samtale
        </a>
        <a
          href="/cards"
          className="rounded-lg border px-5 py-2.5 hover:bg-accent"
        >
          Prøv meditationskortene
        </a>
      </div>
    </section>
  );
}
