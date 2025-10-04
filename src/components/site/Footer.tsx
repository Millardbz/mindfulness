import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-secondary/20">
      {/* Top area */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 — Connect + Social */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase">
            Forbind med Sonja
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Følg med for korte øvelser og ro i hverdagen.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Social href="https://facebook.com/" label="Facebook">
              <Facebook className="h-5 w-5" />
            </Social>
            <Social href="https://instagram.com/" label="Instagram">
              <Instagram className="h-5 w-5" />
            </Social>
            <Social href="https://linkedin.com/" label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Social>
            <Social href="https://youtube.com/" label="YouTube">
              <Youtube className="h-5 w-5" />
            </Social>
          </div>

          <address className="not-italic mt-8 space-y-1 text-sm text-muted-foreground">
            <div>Circle of Mindfulness</div>
            <div>Gammel Lundtoftevej 3C</div>
            <div>2800 Kongens Lyngby</div>
            <div>DK31429307</div>
          </address>
        </div>

        {/* Column 2 — Links */}
        <div className="md:mx-auto">
          <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase">
            Sider
          </h3>
          <ul className="mt-4 grid gap-2 text-sm">
            <li><Link className="hover:underline" href="/">Forside</Link></li>
            <li><Link className="hover:underline" href="/procedures">Forløb</Link></li>
            <li><Link className="hover:underline" href="/cards">Træk et meditationskort</Link></li>
            <li><Link className="hover:underline" href="/about">Om</Link></li>
            <li><Link className="hover:underline" href="/contact">Kontakt</Link></li>
          </ul>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide">Juridisk</h4>
          <ul className="mt-3 grid gap-2 text-sm">
            <li><Link className="hover:underline" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:underline" href="/terms">Handelsbetingelser</Link></li>
          </ul>
        </div>

        {/* Column 3 — Support */}
        <div className="md:justify-self-end">
          <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase">
            Kundesupport
          </h3>
          <p className="mt-3 text-sm md:text-base max-w-xs text-muted-foreground">
            Kontakt mig for spørgsmål vedrørende forløb, coaching eller events.
          </p>

          <div className="mt-5 grid gap-2 text-sm">
            <a className="inline-flex items-center gap-2 hover:underline" href="mailto:info@sonjacircle.dk">
              <Mail className="h-4 w-4" /> info@sonjacircle.dk
            </a>
            <a className="inline-flex items-center gap-2 hover:underline" href="tel:+45XXXXXXXX">
              <Phone className="h-4 w-4" /> +45 XX XX XX XX
            </a>
          </div>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-primary-foreground hover:opacity-95"
            >
              Skriv til mig
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar — credits */}
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-12 md:h-14 grid grid-cols-3 items-center">
          <span className="justify-self-start whitespace-nowrap text-[10px] sm:text-xs text-muted-foreground">
            Design by Millard Barakzai
          </span>
          <span />
          <span className="justify-self-end whitespace-nowrap text-[10px] sm:text-xs text-muted-foreground">
            ©️Circle of Mindfulness 2025
          </span>
        </div>
      </div>
    </footer>
  );
}

/* --- Small helper for social icons --- */
function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-full p-2 ring-1 ring-border hover:bg-foreground/5 transition"
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}
