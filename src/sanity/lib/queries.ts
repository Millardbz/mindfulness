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
  instagramUrl,
  facebookUrl,
  footerText,
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
  primaryCta,
  secondaryCta,
  introHeading,
  introBody,
  valueProps[]{ title, text, icon },
  featuredOfferings[]->{ ${offeringCard} },
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
    ${seo}
  }
`);

export const offeringSlugsQuery = defineQuery(`
  *[_type == "offering" && defined(slug.current)]{ "slug": slug.current }
`);

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
  ${seo}
}`);
