import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/brand/SocialIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";
import type { ContactPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Har du spørgsmål, eller vil du høre mere om et forløb? Skriv til mig – jeg vender tilbage hurtigst muligt.",
};

const DEFAULTS = {
  heroTitle: "Lad os tale sammen",
  heroSubtitle:
    "Tag dig god tid. Skriv et par ord om, hvad der fylder, så finder vi sammen ud af det næste skridt.",
  intro:
    "Du er altid velkommen til at skrive eller ringe – uanset om du har et konkret spørgsmål eller bare vil høre mere.",
} as const;

export default async function KontaktPage() {
  const contactPage = await sanityFetch<ContactPage | null>({
    query: contactPageQuery,
    tags: ["contactPage"],
    fallback: null,
  });

  const heroTitle = contactPage?.heroTitle || DEFAULTS.heroTitle;
  const heroSubtitle = contactPage?.heroSubtitle || DEFAULTS.heroSubtitle;
  const intro = contactPage?.intro || DEFAULTS.intro;
  const email = contactPage?.email || SITE.email;
  const phone = contactPage?.phone;
  const address = contactPage?.address;
  const instagramUrl = contactPage?.instagramUrl || SITE.instagramUrl;
  const facebookUrl = contactPage?.facebookUrl || SITE.facebookUrl;
  const openingHours = contactPage?.openingHours?.filter(
    (entry) => entry?.day || entry?.hours,
  );
  const showForm = contactPage?.showForm !== false;

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
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            {/* Contact details */}
            <div className="flex flex-col gap-8">
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
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

            {/* Form */}
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
          </div>
        </Container>
      </section>
    </>
  );
}
