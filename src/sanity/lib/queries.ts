import { defineQuery } from "next-sanity";

/* ------------------------------------------------------------------ */
/* Reusable GROQ fragments                                            */
/* ------------------------------------------------------------------ */

const image = `{
  ...,
  "lqip": asset->metadata.lqip
}`;

const seo = `seo{
  metaTitle,
  metaDescription,
  noIndex,
  ogImage${image}
}`;

const postCard = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage${image},
  publishedAt,
  "readingTime": round(length(pt::text(body)) / 1000),
  author->{ name, image${image} },
  categories[]->{ title, "slug": slug.current }
`;

const offeringCard = `
  _id,
  title,
  "slug": slug.current,
  summary,
  price,
  duration,
  format,
  icon,
  order,
  mainImage${image}
`;

/* ------------------------------------------------------------------ */
/* Site settings                                                      */
/* ------------------------------------------------------------------ */

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  title,
  description,
  email,
  phone,
  address,
  cvr,
  instagramUrl,
  facebookUrl,
  facebookGroupUrl,
  linkedinUrl,
  youtubeUrl,
  footerText,
  newsletterEnabled,
  newsletterTitle,
  newsletterText,
  logo${image}
}`);

/* ------------------------------------------------------------------ */
/* Home                                                               */
/* ------------------------------------------------------------------ */

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  heroKicker,
  heroTitle,
  heroSubtitle,
  heroImage${image},
  founder{ name, role, text },
  primaryCta,
  secondaryCta,
  introHeading,
  introBody,
  valueProps[]{ title, text, icon },
  featuredOfferings[]->{ ${offeringCard} },
  portraitSection{
    heading,
    body,
    image${image},
    primaryCta,
    secondaryCta
  },
  reviews[]{ quote, author, role },
  quote,
  cardCtaTitle,
  cardCtaText,
  ${seo}
}`);

/* ------------------------------------------------------------------ */
/* Blog                                                               */
/* ------------------------------------------------------------------ */

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    ${postCard}
  }
`);

export const homePostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
    ${postCard}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ${postCard},
    body,
    author->{ _id, name, "slug": slug.current, role, bio, image${image} },
    categories[]->{ _id, title, "slug": slug.current, description },
    ${seo}
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);

export const allCategoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc){
    _id, title, "slug": slug.current, description
  }
`);

/* ------------------------------------------------------------------ */
/* Meditation cards                                                   */
/* ------------------------------------------------------------------ */

export const allCardsQuery = defineQuery(`
  *[_type == "card"] | order(order asc, _createdAt asc){
    _id, title, body, duration, order
  }
`);

/* ------------------------------------------------------------------ */
/* Offerings (Forløb / Tilbud)                                        */
/* ------------------------------------------------------------------ */

export const offeringsPageQuery = defineQuery(`*[_type == "offeringsPage"][0]{
  heroKicker,
  heroTitle,
  heroSubtitle,
  heroImage${image},
  intro,
  processTitle,
  processSteps[]{ title, text },
  ${seo}
}`);

export const allOfferingsQuery = defineQuery(`
  *[_type == "offering" && defined(slug.current)] | order(order asc, title asc){
    ${offeringCard}
  }
`);

export const offeringBySlugQuery = defineQuery(`
  *[_type == "offering" && slug.current == $slug][0]{
    ${offeringCard},
    body,
    forWhom,
    includes,
    gallery[]${image},
    bookingUrl,
    ${seo}
  }
`);

export const offeringSlugsQuery = defineQuery(`
  *[_type == "offering" && defined(slug.current)]{ "slug": slug.current }
`);

/* ------------------------------------------------------------------ */
/* Erhverv (virksomheder)                                             */
/* ------------------------------------------------------------------ */

export const erhvervPageQuery = defineQuery(`*[_type == "erhvervPage"][0]{
  heroKicker,
  heroTitle,
  heroSubtitle,
  heroImage${image},
  primaryCta,
  secondaryCta,
  introHeading,
  introBody,
  benefits[]{ title, text, icon },
  solutionsTitle,
  solutionsIntro,
  solutions[]->{ ${offeringCard} },
  processTitle,
  processSteps[]{ title, text },
  faqTitle,
  faqs[]{ question, answer },
  reviews[]{ quote, author, role },
  ctaTitle,
  ctaText,
  ctaButton,
  ${seo}
}`);

/* ------------------------------------------------------------------ */
/* Gratis bibliotek                                                   */
/* ------------------------------------------------------------------ */

// NOTE: `videoUrl` is deliberately NOT projected here — the link is only
// handed out by /api/bibliotek after the visitor signs up with their email.
const libraryCard = `
  _id,
  title,
  "slug": slug.current,
  summary,
  duration,
  order,
  thumbnail${image},
  "hasVideo": defined(videoUrl)
`;

export const libraryPageQuery = defineQuery(`*[_type == "libraryPage"][0]{
  heroKicker,
  heroTitle,
  heroSubtitle,
  gateTitle,
  gateText,
  ${seo}
}`);

export const allLibraryItemsQuery = defineQuery(`
  *[_type == "libraryItem" && defined(slug.current)] | order(order asc, title asc){
    ${libraryCard}
  }
`);

export const libraryItemBySlugQuery = defineQuery(`
  *[_type == "libraryItem" && slug.current == $slug][0]{
    ${libraryCard},
    body,
    ${seo}
  }
`);

export const libraryItemSlugsQuery = defineQuery(`
  *[_type == "libraryItem" && defined(slug.current)]{ "slug": slug.current }
`);

/* ------------------------------------------------------------------ */
/* Udtalelser                                                         */
/* ------------------------------------------------------------------ */

export const testimonialsPageQuery =
  defineQuery(`*[_type == "testimonialsPage"][0]{
  heroTitle,
  heroSubtitle,
  groups[]{ title, reviews[]{ quote, author, role } },
  ${seo}
}`);

/* ------------------------------------------------------------------ */
/* Legal (handelsbetingelser & privatlivspolitik)                     */
/* ------------------------------------------------------------------ */

export const legalPageQuery = defineQuery(`*[_type == "legalPage"][0]{
  title,
  intro,
  body,
  ${seo}
}`);

/* ------------------------------------------------------------------ */
/* About (Om)                                                         */
/* ------------------------------------------------------------------ */

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"][0]{
  heroTitle,
  heroSubtitle,
  portrait${image},
  body,
  highlights[]{ title, text },
  quote,
  ${seo}
}`);

/* ------------------------------------------------------------------ */
/* Contact (Kontakt)                                                  */
/* ------------------------------------------------------------------ */

export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]{
  heroTitle,
  heroSubtitle,
  intro,
  email,
  phone,
  address,
  instagramUrl,
  facebookUrl,
  openingHours[]{ day, hours },
  showForm,
  showMap,
  mapQuery,
  ${seo}
}`);
