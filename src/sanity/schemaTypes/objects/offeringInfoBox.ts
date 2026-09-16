import { defineArrayMember, defineField, defineType } from "sanity";

export const offeringInfoBox = defineType({
  name: "offeringInfoBox",
  type: "object",
  title: "Informationsboks",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Overskrift",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 2,
      title: "Indledning (valgfri)",
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Punkter",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
