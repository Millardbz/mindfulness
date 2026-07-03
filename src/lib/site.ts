/**
 * Central site configuration — single source of truth for navigation,
 * brand strings and default contact details (used as fallbacks when the
 * Sanity `siteSettings` document isn't filled in yet).
 */
import { TESTIMONIAL_GROUPS } from "@/data/testimonials-content";
import { anchorSlug } from "@/lib/format";

export const SITE = {
  name: "Circle of Mindfulness",
  shortName: "Circle of Mindfulness",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sonjacircle.dk",
  description:
    "Mindfulness, mindful yoga og healing i Ringsted. Læs med på bloggen, find et forløb, eller træk et meditationskort og giv dig selv en pause.",
  locale: "da_DK",
  // Fallback contact details (overridden by Sanity siteSettings when present).
  email: "info@circleofmindfulness.dk",
  phone: "26 53 65 58",
  address: "Circle of Mindfulness\nNordcentret, Benløseparken 2\n4100 Ringsted",
  cvr: "30311434",
  instagramUrl: "",
  facebookUrl: "https://www.facebook.com/circleofmindfulness/",
  facebookGroupUrl: "https://www.facebook.com/groups/mindfulnessuniverset",
  linkedinUrl: "",
  youtubeUrl: "",
} as const;

export type NavLink = { href: string; label: string };

export type NavChild = {
  href: string;
  label: string;
  /** Short one-liner shown under the label in the dropdown. */
  description?: string;
  /** Opens in a new tab (external links). */
  external?: boolean;
};

export type NavItem = {
  label: string;
  /** Direct link — omitted when the item only opens a dropdown. */
  href?: string;
  /** Dropdown children (mirrors the old site's menu structure). */
  children?: NavChild[];
};

/** Primary navigation (the logo links home separately). */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Ydelser",
    children: [
      {
        href: "/forloeb/gruppeforloeb",
        label: "Mindfulness",
        description: "Forløb med meditation og de 8 principper",
      },
      {
        href: "/forloeb/mindful-yoga",
        label: "Mindful Yoga",
        description: "Blid, skånsom yoga – alle kan være med",
      },
      {
        href: "/forloeb/healing",
        label: "Healing",
        description: "Reiki healing, der giver ro og balance",
      },
      {
        href: "/forloeb",
        label: "Alle forløb & priser",
        description: "Se hele oversigten",
      },
    ],
  },
  {
    label: "Inspiration",
    children: [
      {
        href: "/forloeb/events",
        label: "Events & healingdage",
        description: "Meditation og healing – sammen med andre",
      },
      {
        href: "/kort",
        label: "Meditationskort",
        description: "Træk et kort og få 3–5 minutters ro",
      },
      {
        href: "/blog",
        label: "Blog",
        description: "Ord til ro og refleksion",
      },
      {
        href: SITE.facebookGroupUrl,
        label: "Facebook-gruppen",
        description: "Gratis fællesskab: Mindfulness Universet",
        external: true,
      },
    ],
  },
  { label: "Gratis bibliotek", href: "/bibliotek" },
  { label: "Erhverv", href: "/erhverv" },
  {
    label: "Udtalelser",
    children: [
      {
        href: "/udtalelser",
        label: "Alle udtalelser",
        description: "Ord fra klienter og virksomheder",
      },
      ...TESTIMONIAL_GROUPS.map((group) => ({
        href: `/udtalelser#${anchorSlug(group.title)}`,
        label: group.title,
      })),
    ],
  },
  { label: "Om Sonja", href: "/om" },
];

/** Highlighted call-to-action in the header. */
export const NAV_CTA: NavLink = { href: "/kontakt", label: "Kontakt" };

/** Footer navigation (flat list of the main pages). */
export const FOOTER_LINKS: NavLink[] = [
  { href: "/forloeb", label: "Forløb & priser" },
  { href: "/bibliotek", label: "Gratis bibliotek" },
  { href: "/erhverv", label: "Erhverv" },
  { href: "/kort", label: "Meditationskort" },
  { href: "/udtalelser", label: "Udtalelser" },
  { href: "/blog", label: "Blog" },
  { href: "/om", label: "Om Sonja" },
  NAV_CTA,
];

/** Legal page, linked from the footer's bottom bar. */
export const LEGAL_LINK: NavLink = {
  href: "/handelsbetingelser",
  label: "Handelsbetingelser & privatlivspolitik",
};
