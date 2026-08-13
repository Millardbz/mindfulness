import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/brand/SocialIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { ContactPage, SiteSettings } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Har du spørgsmål, eller vil du høre mere om et forløb? Skriv til mig – jeg vender tilbage hurtigst muligt.",
};

const DEFAULTS = {
  heroTitle: "Har du spørgsmål?",
  heroSubtitle:
    "Skriv, ring eller send en sms – så finder vi sammen ud af det næste skridt.",
  intro:
    "Du er altid velkommen til at skrive eller ringe. På hverdage kan du forvente svar inden for 24 timer – jeg bestræber mig altid på at vende tilbage hurtigst muligt.",
} as const;

export default async function KontaktPage() {
  const [contactPage, settings] = await Promise.all([
    sanityFetch<ContactPage | null>({
      query: contactPageQuery,
      tags: ["contactPage"],
      fallback: null,
    }),
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
      fallback: null,
    }),
  ]);

  const heroTitle = contactPage?.heroTitle || DEFAULTS.heroTitle;
  const heroSubtitle = contactPage?.heroSubtitle || DEFAULTS.heroSubtitle;
  const intro = contactPage?.intro || DEFAULTS.intro;
  const email = contactPage?.email || SITE.email;
  const phone = contactPage?.phone || SITE.phone;
  const address = contactPage?.address || SITE.address;
  const instagramUrl = contactPage?.instagramUrl || SITE.instagramUrl;
  const facebookUrl = contactPage?.facebookUrl || SITE.facebookUrl;
  const openingHours = contactPage?.openingHours?.filter(
    (entry) => entry?.day || entry?.hours,
  );
  const showForm = contactPage?.showForm !== false;
  const showMap = contactPage?.showMap !== false;
  const mapQuery =
    contactPage?.mapQuery ||
    "Circle of Mindfulness, Benløseparken 2, 4100 Ringsted";
  const newsletterEnabled = settings?.newsletterEnabled !== false;
  const newsletterTitle =
    settings?.newsletterTitle || "Tilmeld dig nyhedsbrevet";
  const newsletterText =
    settings?.newsletterText ||
    "Få nyheder, tilbud og små pauser med ro – direkte i din indbakke, før alle andre.";

  return (
    <>
      <section className="bg-aurora relative overflow-hidden">
        <Container className="py-16 md:py-24">
          <SectionHeading
            as="h1"
            kicker="Kontakt"
            title={heroTitle}
            intro={heroSubtitle}
            align="center"
          />
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div
            className={cn(
              "grid gap-8 lg:items-start",
              showForm ? "lg:grid-cols-[1.35fr_0.9fr]" : "mx-auto max-w-2xl",
            )}
          >
            {/* Form (primary — placed first so it fills the column) */}
            {showForm && (
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
                <h2 className="font-serif text-2xl font-medium tracking-tight">
                  Skriv til mig
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Udfyld formularen herunder, så vender jeg tilbage til dig.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            )}

            {/* Contact details */}
            <div className="flex flex-col gap-7 rounded-[2rem] bg-secondary/30 p-6 md:p-8">
              <p className="leading-relaxed text-muted-foreground text-pretty">
                {intro}
              </p>

              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-serif text-base font-medium">E-mail</h2>
                    <a
                      href={`mailto:${email}`}
                      className="mt-0.5 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {email}
                    </a>
                  </div>
                </li>

                {phone && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-base font-medium">
                        Telefon
                      </h2>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="mt-0.5 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {phone}
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground text-pretty">
                        Send SMS eller læg besked med: Navn, Tlf og Tidspunkt du
                        kan kontaktes.
                      </p>
                    </div>
                  </li>
                )}

                {address && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-base font-medium">
                        Adresse
                      </h2>
                      <p className="mt-0.5 whitespace-pre-line text-sm text-muted-foreground">
                        {address}
                      </p>
                    </div>
                  </li>
                )}

                {openingHours && openingHours.length > 0 && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-base font-medium">
                        Åbningstider
                      </h2>
                      <ul className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground">
                        {openingHours.map((entry, index) => (
                          <li
                            key={`${entry.day ?? "dag"}-${index}`}
                            className="flex justify-between gap-6"
                          >
                            <span>{entry.day}</span>
                            <span>{entry.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )}
              </ul>

              {(instagramUrl || facebookUrl) && (
                <div className="flex items-center gap-3">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Følg på Instagram"
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      <InstagramIcon className="h-5 w-5" />
                    </a>
                  )}
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Følg på Facebook"
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      <FacebookIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Kort / find vej */}
      {showMap && (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="mb-8 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                Find vej
              </span>
              <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-balance md:text-3xl">
                Her finder du Circle of Mindfulness
              </h2>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-border/70 shadow-soft">
              <iframe
                title={`Kort: ${mapQuery}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&hl=da`}
                className="h-[320px] w-full border-0 sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Container>
        </section>
      )}

      {/* Nyhedsbrev */}
      {newsletterEnabled && (
        <section className="pb-20 md:pb-28">
          <Container>
            <div
              className="grain relative overflow-hidden rounded-[2rem] border border-primary/10 px-6 py-10 md:px-14 md:py-12"
              style={{
                background:
                  "radial-gradient(120% 140% at 15% 0%, var(--sage-glow) 0%, var(--sage-glow-soft) 70%)",
              }}
            >
              <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                    Nyhedsbrev
                  </span>
                  <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-balance md:text-3xl">
                    {newsletterTitle}
                  </h2>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground text-pretty">
                    {newsletterText}
                  </p>
                </div>
                <NewsletterForm layout="inline" />
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
