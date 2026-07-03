import { defineField, defineType } from "sanity";

export const libraryItem = defineType({
  name: "libraryItem",
  type: "document",
  title: "Video (gratis bibliotek)",
  description:
    "En gratis video eller meditation. Linket vises først, når den besøgende har skrevet sig op med sin e-mail.",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      description: "Videoens titel, fx “Din Styrke – guidet meditation”.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-sti",
      description: "Den entydige adresse til siden. Generér ud fra titlen.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      title: "Kort beskrivelse",
      description: "En kort tekst, der vises på oversigten.",
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      title: "Miniaturebillede",
      description:
        "Valgfrit billede til oversigten. Er feltet tomt, vises en rolig grafik i stedet.",
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
      name: "duration",
      type: "string",
      title: "Varighed",
      description: "Fx “10 min”.",
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      title: "Link til videoen",
      description:
        "Fx et skjult (unlisted) YouTube-link. Linket vises IKKE på siden — den besøgende får det først, når de har skrevet sig op med navn og e-mail.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Beskrivelse",
      description: "Uddybende tekst, der vises på videoens egen side.",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Rækkefølge",
      description: "Lavere tal vises først.",
      initialValue: 0,
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
      duration: "duration",
      media: "thumbnail",
      videoUrl: "videoUrl",
    },
    prepare({ title, duration, media, videoUrl }) {
      const status = videoUrl ? "" : " · mangler link";
      return {
        title: title || "Uden titel",
        subtitle: `${duration || "Video"}${status}`,
        media,
      };
    },
  },
});
