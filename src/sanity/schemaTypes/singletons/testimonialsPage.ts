import { defineArrayMember, defineField, defineType } from "sanity";

import {
  TESTIMONIAL_GROUPS,
  TESTIMONIALS_SUBTITLE,
  TESTIMONIALS_TITLE,
} from "../../../data/testimonials-content";

export const testimonialsPage = defineType({
  name: "testimonialsPage",
  type: "document",
  title: "Udtalelser",
  description:
    "Udtalelser fra klienter og virksomheder, inddelt i grupper. Felterne er udfyldt på forhånd — ret blot teksterne.",
  fields: [
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Overskrift",
      description: "Den store overskrift øverst på siden.",
      initialValue: TESTIMONIALS_TITLE,
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort indledning under overskriften.",
      initialValue: TESTIMONIALS_SUBTITLE,
    }),
    defineField({
      name: "groups",
      type: "array",
      title: "Grupper af udtalelser",
      description:
        "Hver gruppe har en overskrift (fx “Mindful Yoga”) og en række udtalelser.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Gruppens overskrift",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reviews",
              type: "array",
              title: "Udtalelser",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "quote",
                      type: "text",
                      rows: 6,
                      title: "Udtalelse",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "author",
                      type: "string",
                      title: "Navn",
                    }),
                    defineField({
                      name: "role",
                      type: "string",
                      title: "Rolle / virksomhed (valgfri)",
                      description:
                        "Fx “ALK” eller “Selvstændig anlægsgartner”.",
                    }),
                  ],
                  preview: { select: { title: "author", subtitle: "quote" } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", reviews: "reviews" },
            prepare({ title, reviews }) {
              const count = Array.isArray(reviews) ? reviews.length : 0;
              return {
                title: title || "Gruppe",
                subtitle: `${count} udtalelse${count === 1 ? "" : "r"}`,
              };
            },
          },
        }),
      ],
      initialValue: TESTIMONIAL_GROUPS.map((group, i) => ({
        _key: `group-${i + 1}`,
        title: group.title,
        reviews: group.reviews.map((review, j) => ({
          _key: `group-${i + 1}-rev-${j + 1}`,
          ...review,
        })),
      })),
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO / deling",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Udtalelser", subtitle: "Udtalelser-siden" };
    },
  },
});
