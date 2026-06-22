import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  type: "document",
  title: "Forfatter",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Navn",
      description: "Forfatterens fulde navn.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-sti",
      description: "Den unikke adresse for forfatteren. Generér ud fra navnet.",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Rolle",
      description: "Forfatterens titel eller rolle, fx Mindfulness-instruktør.",
      initialValue: "Mindfulness-instruktør",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Portræt",
      description: "Et portrætbillede af forfatteren.",
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
      name: "bio",
      type: "text",
      rows: 4,
      title: "Kort bio",
      description: "En kort beskrivelse af forfatteren.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      role: "role",
    },
    prepare({ title, media, role }) {
      return { title, media, subtitle: role };
    },
  },
});
