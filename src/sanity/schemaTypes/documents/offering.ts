import { defineType, defineField } from "sanity";

export const offering = defineType({
  name: "offering",
  type: "document",
  title: "Forløb / Tilbud",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      description: "Navnet på forløbet eller tilbuddet.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-sti",
      description: "Den entydige adresse til siden. Generér ud fra titlen.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      title: "Kort beskrivelse",
      description: "En kort tekst der vises på oversigter og kort.",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Billede",
      description: "Hovedbillede for forløbet.",
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
      name: "price",
      type: "string",
      title: "Pris",
      description: "Fx “1.200 kr.” eller “Gratis”.",
    }),
    defineField({
      name: "duration",
      type: "string",
      title: "Varighed",
      description: "Fx “6 uger” eller “2 timer”.",
    }),
    defineField({
      name: "format",
      type: "string",
      title: "Format",
      description: "Hvordan forløbet afholdes.",
      options: {
        list: [
          { title: "Online", value: "Online" },
          { title: "Fysisk", value: "Fysisk" },
          { title: "Hybrid (online + fysisk)", value: "Hybrid" },
        ],
        layout: "radio",
      },
      initialValue: "Online",
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Ikon",
      description: "Vælg et ikon, der vises på forløbskortet.",
      options: {
        list: [
          { title: "Blad", value: "Leaf" },
          { title: "Spire", value: "Sprout" },
          { title: "Blomst", value: "Flower2" },
          { title: "Hjerte", value: "Heart" },
          { title: "Hånd med hjerte", value: "HandHeart" },
          { title: "Vind", value: "Wind" },
          { title: "Bølger", value: "Waves" },
          { title: "Sol", value: "Sun" },
          { title: "Måne", value: "Moon" },
          { title: "Gnister", value: "Sparkles" },
          { title: "Hjerne", value: "Brain" },
          { title: "Kompas", value: "Compass" },
          { title: "Mennesker", value: "Users" },
        ],
      },
      initialValue: "Sparkles",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Rækkefølge",
      description: "Lavere tal vises først.",
      initialValue: 0,
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Beskrivelse",
      description: "Den fulde beskrivelse af forløbet.",
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
      name: "orderAsc",
      title: "Rækkefølge (stigende)",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      format: "format",
      media: "mainImage",
    },
    prepare({ title, format, media }) {
      return {
        title: title || "Uden titel",
        subtitle: format,
        media,
      };
    },
  },
});
