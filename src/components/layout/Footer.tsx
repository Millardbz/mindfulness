import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Users } from "lucide-react";

import logo from "../../../public/images/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/brand/SocialIcons";
import { Container } from "@/components/ui/container";
import { FOOTER_LINKS, LEGAL_LINK, SITE } from "@/lib/site";
import type { SiteSettings } from "@/sanity/types";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const email = settings?.email || SITE.email;
  const phone = settings?.phone || SITE.phone;
  const address = settings?.address || SITE.address;
  const cvr = settings?.cvr || SITE.cvr;
  const instagram = settings?.instagramUrl || SITE.instagramUrl;
  const facebook = settings?.facebookUrl || SITE.facebookUrl;
  const facebookGroup = settings?.facebookGroupUrl || SITE.facebookGroupUrl;
  const linkedin = settings?.linkedinUrl || SITE.linkedinUrl;
  const youtube = settings?.youtubeUrl || SITE.youtubeUrl;
  const tagline =
    settings?.footerText ||
    "Jeg kombinerer mindfulness, mindful yoga og healing i alt, hvad jeg laver – så du kan få mere ud af dit liv.";
  const year = new Date().getFullYear();

  const socials = [
    { href: instagram, label: "Instagram", Icon: InstagramIcon },
    { href: facebook, label: "Facebook", Icon: FacebookIcon },
    { href: linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: youtube, label: "YouTube", Icon: YoutubeIcon },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/30">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Image src={logo} alt={SITE.name} className="h-16 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
              {tagline}
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
              Menu
            </h3>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
              Kontakt
            </h3>
            <a
              href={`mailto:${email}`}
              className="inline-flex w-fit items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary/70" />
              {email}
            </a>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex w-fit items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary/70" />
                {phone}
              </a>
            )}
            {address && (
              <address className="flex items-start gap-2.5 whitespace-pre-line text-sm not-italic leading-relaxed text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                {address}
              </address>
            )}
            {facebookGroup && (
              <a
                href={facebookGroup}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Users className="h-4 w-4 shrink-0 text-primary/70" />
                Gratis Facebook-gruppe: Mindfulness Universet
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {SITE.name}
            {cvr ? ` · CVR ${cvr}` : ""}. Alle rettigheder forbeholdes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href={LEGAL_LINK.href}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {LEGAL_LINK.label}
            </Link>
            <a
              href="https://momin-consulting.dk/"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Lavet af Millard Barakzai
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
