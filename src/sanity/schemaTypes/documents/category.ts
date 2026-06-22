import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  type: "document",
  title: "Kategori",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      description: "Navnet på kategorien.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-sti",
      description: "Den unikke adresse for kategorien. Generér ud fra titlen.",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      title: "Beskrivelse",
      description: "En kort beskrivelse af kategorien.",
    }),
  ],
  orderings: [
    {
      name: "titleAsc",
      title: "Titel (A-Å)",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return { title, subtitle: description };
    },
  },
});
