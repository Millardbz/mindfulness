/**
 * Shared content types for the Sanity-backed parts of the site.
 *
 * These describe the *shape returned by the GROQ queries* in `lib/queries.ts`
 * (not the raw Sanity documents). Pages and components consume these.
 */
import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  /** Low-quality image placeholder, when projected via `asset->metadata.lqip`. */
  lqip?: string;
};

export type Cta = {
  label?: string;
  href?: string;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
};

export type ValueProp = {
  title?: string;
  text?: string;
  /** lucide-react icon name, e.g. "Leaf", "Heart", "Wind". */
  icon?: string;
};

export type Quote = {
  text?: string;
  author?: string;
};

export type OpeningHour = {
  day?: string;
  hours?: string;
};

export type Author = {
  _id: string;
  name?: string;
  slug?: string;
  role?: string;
  image?: SanityImage;
  bio?: string;
};

export type Category = {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
};

/** Compact post shape used in listings/cards. */
export type PostCard = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  readingTime?: number;
  author?: Pick<Author, "name" | "image">;
  categories?: Pick<Category, "title" | "slug">[];
};

/** Full post shape for the detail page. */
export type Post = Omit<PostCard, "author" | "categories"> & {
  body?: PortableTextBlock[];
  author?: Author;
  categories?: Category[];
  seo?: Seo;
};

export type Card = {
  _id: string;
  title?: string;
  body: string;
  duration?: string;
  order?: number;
};

/** Compact offering shape used in listings/cards. */
export type OfferingCard = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  mainImage?: SanityImage;
  price?: string;
  duration?: string;
  format?: string;
  icon?: string;
  order?: number;
};

/** Full offering shape for the detail page. */
export type Offering = OfferingCard & {
  body?: PortableTextBlock[];
  forWhom?: string;
  includes?: string[];
  gallery?: SanityImage[];
  bookingUrl?: string;
  seo?: Seo;
};

export type SiteSettings = {
  title?: string;
  description?: string;
  logo?: SanityImage;
  email?: string;
  phone?: string;
  address?: string;
  cvr?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  facebookGroupUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  footerText?: string;
  newsletterEnabled?: boolean;
  newsletterTitle?: string;
  newsletterText?: string;
};

export type PortraitSection = {
  heading?: string;
  body?: PortableTextBlock[];
  image?: SanityImage;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export type Review = {
  quote?: string;
  author?: string;
  role?: string;
};

export type ProcessStep = {
  title?: string;
  text?: string;
};

export type Founder = {
  name?: string;
  role?: string;
  text?: string;
};

export type HomePage = {
  heroKicker?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  founder?: Founder;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  introHeading?: string;
  introBody?: PortableTextBlock[];
  valueProps?: ValueProp[];
  featuredOfferings?: OfferingCard[];
  portraitSection?: PortraitSection;
  reviews?: Review[];
  quote?: Quote;
  cardCtaTitle?: string;
  cardCtaText?: string;
  seo?: Seo;
};

export type AboutPage = {
  heroTitle?: string;
  heroSubtitle?: string;
  portrait?: SanityImage;
  body?: PortableTextBlock[];
  highlights?: { title?: string; text?: string }[];
  quote?: Quote;
  seo?: Seo;
};

export type OfferingsPage = {
  heroKicker?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  intro?: PortableTextBlock[];
  processTitle?: string;
  processSteps?: ProcessStep[];
  seo?: Seo;
};

export type Faq = {
  question?: string;
  answer?: string;
};

export type ErhvervPage = {
  heroKicker?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  introHeading?: string;
  introBody?: PortableTextBlock[];
  benefits?: ValueProp[];
  solutionsTitle?: string;
  solutionsIntro?: string;
  solutions?: OfferingCard[];
  processTitle?: string;
  processSteps?: ProcessStep[];
  faqTitle?: string;
  faqs?: Faq[];
  reviews?: Review[];
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: Cta;
  seo?: Seo;
};

export type LegalPage = {
  title?: string;
  intro?: string;
  body?: PortableTextBlock[];
  seo?: Seo;
};

/** Compact library-video shape used in the grid. `videoUrl` is never
 *  exposed to the frontend — see /api/bibliotek. */
export type LibraryItemCard = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  duration?: string;
  thumbnail?: SanityImage;
  order?: number;
  hasVideo?: boolean;
};

/** Full library-video shape for the detail page. */
export type LibraryItem = LibraryItemCard & {
  body?: PortableTextBlock[];
  seo?: Seo;
};

export type LibraryPage = {
  heroKicker?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  gateTitle?: string;
  gateText?: string;
  seo?: Seo;
};

export type TestimonialGroup = {
  title?: string;
  reviews?: Review[];
};

export type TestimonialsPage = {
  heroTitle?: string;
  heroSubtitle?: string;
  groups?: TestimonialGroup[];
  seo?: Seo;
};

export type ContactPage = {
  heroTitle?: string;
  heroSubtitle?: string;
  intro?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  openingHours?: OpeningHour[];
  showForm?: boolean;
  showMap?: boolean;
  mapQuery?: string;
  seo?: Seo;
};
