import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  type: "document",
  title: "Indlæg",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      description: "Overskriften på indlægget.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-sti",
      description: "Den unikke adresse for indlægget. Generér ud fra titlen.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      title: "Resumé",
      description: "Et kort uddrag, der vises i oversigter og deling.",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Hovedbillede",
      description: "Det primære billede til indlægget.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt-tekst",
          description: "Beskrivelse af billedet for skærmlæsere og SEO.",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Udgivet",
      description: "Hvornår indlægget blev udgivet.",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      type: "reference",
      title: "Forfatter",
      description: "Personen bag indlægget.",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Kategorier",
      description: "Vælg en eller flere kategorier for indlægget.",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Brødtekst",
      description: "Selve indholdet af indlægget.",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO",
      description: "Indstillinger for søgemaskiner og deling.",
    }),
  ],
  orderings: [
    {
      name: "publishedAtDesc",
      title: "Udgivet (nyeste først)",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      author: "author.name",
      publishedAt: "publishedAt",
    },
    prepare({ title, media, author, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("da-DK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "Ikke udgivet";
      const subtitle = author ? `${author} · ${date}` : date;
      return { title, media, subtitle };
    },
  },
});
