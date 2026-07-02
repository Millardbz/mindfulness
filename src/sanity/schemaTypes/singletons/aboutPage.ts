import { defineArrayMember, defineField, defineType } from "sanity";

import {
  ABOUT_HERO_SUBTITLE,
  ABOUT_HERO_TITLE,
  ABOUT_HIGHLIGHTS,
  ABOUT_PARAGRAPHS,
  ABOUT_QUOTE,
} from "../../../data/site-content";
import { ptBlocks } from "../defaults";

export const aboutPage = defineType({
  name: "aboutPage",
  type: "document",
  title: "Om mig",
  description:
    "Indholdet på Om-siden. Felterne er udfyldt på forhånd — ret blot teksterne.",
  fields: [
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Overskrift",
      description: "Den store overskrift øverst på Om-siden.",
      initialValue: ABOUT_HERO_TITLE,
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort, varm indledning under overskriften.",
      initialValue: ABOUT_HERO_SUBTITLE,
    }),
    defineField({
      name: "portrait",
      type: "image",
      title: "Portrætbillede",
      description:
        "Et billede af dig – gerne roligt og imødekommende. Er feltet tomt, vises en blomst-grafik i stedet.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt-tekst (til skærmlæsere)",
          description: "Kort beskrivelse af billedet.",
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Din historie",
      description: "Fortæl om dig selv og din tilgang til mindfulness.",
      initialValue: ptBlocks(ABOUT_PARAGRAPHS),
    }),
    defineField({
      name: "highlights",
      type: "array",
      title: "Tre fremhævede punkter",
      description:
        "Korte punkter, der fremhæver din erfaring, tilgang og vision.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Titel",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              type: "text",
              rows: 3,
              title: "Tekst",
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      initialValue: ABOUT_HIGHLIGHTS.map((highlight, i) => ({
        _key: `hl-${i + 1}`,
        ...highlight,
      })),
    }),
    defineField({
      name: "quote",
      type: "object",
      title: "Citat",
      description: "Et citat, der afspejler din filosofi.",
      fields: [
        defineField({ name: "text", type: "text", rows: 3, title: "Citat" }),
        defineField({
          name: "author",
          type: "string",
          title: "Hvem har sagt det?",
        }),
      ],
      initialValue: ABOUT_QUOTE,
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO / deling",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Om mig", subtitle: "Om-siden" };
    },
  },
});
