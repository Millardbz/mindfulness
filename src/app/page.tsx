"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Sparkles, User2 } from "lucide-react";
import Testimonial from "@/components/Testimonial";

export default function HomePage() {
  return (
    <main className="space-y-16 md:space-y-24">
      {/* Hero */}
      <section className="relative isolate overflow-hidden rounded-2xl border bg-card">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Soft gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_20%,_rgba(0,0,0,0.28),_transparent_60%)]" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Bliv <span className="uppercase">StressFRI</span>
          </h1>

          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-lg ring-1 ring-white/20 hover:opacity-95"
            >
              Bliv stressFRI uden anstrengelse
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Three feature cards */}
      <section className="mx-auto max-w-6xl px-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/procedures"
            className="group rounded-xl border bg-card p-6 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-primary/20"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ClipboardCheck className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold">Forløb</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Sådan arbejder jeg – 1:1, gruppeforløb og virksomhedsworkshops.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
              Læs mere <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/cards"
            className="group rounded-xl border bg-card p-6 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-primary/20"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold">Træk et meditations kort</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Få 5 minutters ro – et kort med en blid, guidet praksis.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
              Prøv nu <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/about"
            className="group rounded-xl border bg-card p-6 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-primary/20"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <User2 className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold">Om</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Mød mig og min tilgang til ro, nærvær og hverdagsbalance.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
              Lær mig at kende <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className=" max-w-5xl">
        <Testimonial
    author="Tina Hansen"
    subline="Forløb: 1:1"
    fullText={`Jeg har flere psykiatriske diagnoser, bl a angst samt stresssygdommen PTSD.
Inden session var jeg stresset, indre uro, tankemylder, anspændt. Med Sonjas beroligende stemme faldt jeg hurtigt til ro og ind i en dyb afspænding. Sonja er dygtig til meditation. Det er balsam for krop, sind og sjæl.
Selve healingen er fantastisk. Jeg valgte at lægge med et varmt trygt tæppe, Sonja fik lov at heale med berøring, hvilket jeg varmt vil anbefale. Det er ikke grænseoverskridende, der heales på fødder, underben, skuldre, øvre brystkasse og hoved.
Sonjas magiske hænder er varme og beroligende, man lander i sig selv og opnår indre fred og harmoni.
Jeg vil varmt anbefale denne selvforkælelse, hvis du føler dig stresset, udbrændt el. Det er egenomsorg og selvkærlighed der rykker max.
Jeg har efterfølgende oplevet en mere afslappet krop og roligt sind inden søvn, samt en dybere søvn. Ydermere giver samtale med Sonja anledning til dyb refleksion. Et klogt, behageligt og erfarent menneske`}
  />
      </section>

      {/* Split section: image left, copy right */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-2 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-card shadow-sm">
          <Image
            src="/images/portrait.jpg"
            alt="Sonja"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Skal jeg hjælpe dig
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
            Sammen finder vi en enkel, venlig praksis der passer ind i din
            hverdag. Jeg arbejder jordnært og konkret – med åndedræt, kropsligt
            nærvær og korte øvelser, du kan bruge med det samme.
          </p>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            Du behøver ikke “kunne meditere” i forvejen. Vi starter der hvor du
            er – og bygger stille og roligt en rutine, der skaber ro og energi.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-primary-foreground shadow hover:opacity-95"
            >
              Book en uforpligtende samtale
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/procedures"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 hover:bg-accent"
            >
              Se forløb
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
