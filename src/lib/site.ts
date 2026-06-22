/**
 * Central site configuration — single source of truth for navigation,
 * brand strings and default contact details (used as fallbacks when the
 * Sanity `siteSettings` document isn't filled in yet).
 */

export const SITE = {
  name: "Circle of Mindfulness",
  shortName: "Circle of Mindfulness",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sonjacircle.dk",
  description:
    "Meditation, nærvær og ro i hverdagen. Læs med på bloggen, find et forløb, eller træk et meditationskort og giv dig selv en pause.",
  locale: "da_DK",
  // Fallback contact details (overridden by Sanity siteSettings when present).
  email: "info@sonjacircle.dk",
  address: "Circle of Mindfulness\nGammel Lundtoftevej 3C\n2800 Kongens Lyngby",
  cvr: "DK31429307",
  instagramUrl: "",
  facebookUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
} as const;

export type NavLink = { href: string; label: string };

/** Primary navigation (the logo links home separately). */
export const NAV_LINKS: NavLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/forloeb", label: "Forløb" },
  { href: "/kort", label: "Meditationskort" },
  { href: "/om", label: "Om" },
];

/** Highlighted call-to-action in the header. */
export const NAV_CTA: NavLink = { href: "/kontakt", label: "Kontakt" };

/** Footer navigation (everything, including the CTA target). */
export const FOOTER_LINKS: NavLink[] = [...NAV_LINKS, NAV_CTA];
