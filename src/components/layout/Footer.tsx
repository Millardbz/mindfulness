import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import logo from "../../../public/images/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/brand/SocialIcons";
import { Container } from "@/components/ui/container";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import type { SiteSettings } from "@/sanity/types";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const email = settings?.email || SITE.email;
  const phone = settings?.phone;
  const address = settings?.address || SITE.address;
  const cvr = settings?.cvr || SITE.cvr;
  const instagram = settings?.instagramUrl || SITE.instagramUrl;
  const facebook = settings?.facebookUrl || SITE.facebookUrl;
  const linkedin = settings?.linkedinUrl || SITE.linkedinUrl;
  const youtube = settings?.youtubeUrl || SITE.youtubeUrl;
  const tagline =
    settings?.footerText ||
    "Små pauser, dyb ro. Mindfulness og meditation til hverdagen.";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/30">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Image
              src={logo}
              alt={SITE.name}
              className="h-16 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
              {tagline}
            </p>
            {address && (
              <address className="mt-5 whitespace-pre-line text-sm not-italic leading-relaxed text-muted-foreground">
                {address}
              </address>
            )}
            {cvr && (
              <p className="mt-2 text-sm text-muted-foreground">CVR: {cvr}</p>
            )}
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80">
              Menu
            </h3>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80">
              Kontakt
            </h3>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              {email}
            </a>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            )}
            <div className="mt-2 flex items-center gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:text-primary"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:text-primary"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:text-primary"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:text-primary"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {SITE.name}. Alle rettigheder forbeholdes.
          </p>
          <a
            href="https://momin-consulting.dk/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Lavet af Millard Barakzai
          </a>
        </div>
      </Container>
    </footer>
  );
}
