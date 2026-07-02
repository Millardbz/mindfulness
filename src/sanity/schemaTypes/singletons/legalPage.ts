import { defineField, defineType } from "sanity";

import {
  LEGAL_INTRO,
  LEGAL_SECTIONS,
  LEGAL_TITLE,
} from "../../../data/legal-content";
import { ptSections } from "../defaults";

export const legalPage = defineType({
  name: "legalPage",
  type: "document",
  title: "Handelsbetingelser & privatliv",
  description:
    "Handelsbetingelser og privatlivspolitik. Teksten er udfyldt på forhånd — ret blot indholdet.",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Overskrift",
      description: "Den store overskrift øverst på siden.",
      initialValue: LEGAL_TITLE,
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 3,
      title: "Introtekst",
      description: "En kort tekst under overskriften.",
      initialValue: LEGAL_INTRO,
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Indhold",
      description:
        "Selve betingelserne og privatlivspolitikken. Brug overskrifter til at inddele afsnittene.",
      initialValue: ptSections(LEGAL_SECTIONS),
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO / deling",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Handelsbetingelser & privatliv",
        subtitle: "Juridisk side",
      };
    },
  },
});
