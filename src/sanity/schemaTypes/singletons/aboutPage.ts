import { defineArrayMember, defineField, defineType } from "sanity";

import { ptBlocks } from "../defaults";

export const aboutPage = defineType({
  name: "aboutPage",
  type: "document",
  title: "Om mig",
  description: "Indholdet på Om-siden. Felterne er udfyldt på forhånd — ret blot teksterne.",
  fields: [
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Overskrift",
      description: "Den store overskrift øverst på Om-siden.",
      initialValue: "Hej, jeg er din guide til ro",
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort, varm indledning under overskriften.",
      initialValue:
        "Jeg har gennem mange år arbejdet med meditation og mindfulness – både for mig selv og sammen med andre. Min drøm er at gøre nærvær til en naturlig del af hverdagen.",
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
      initialValue: ptBlocks([
        "Min rejse med mindfulness begyndte med et ønske om at finde ro midt i en travl hverdag. Det, der startede som små åndedrag mellem gøremål, voksede til en dyb praksis, der har forandret mit forhold til mig selv og verden omkring mig.",
        "I dag deler jeg det, jeg har lært, gennem meditationer, forløb og daglige pauser. Min tro er enkel: når vi lærer at være til stede – med venlighed og uden at dømme – får vi adgang til en ro, der altid har været i os.",
      ]),
    }),
    defineField({
      name: "highlights",
      type: "array",
      title: "Tre fremhævede punkter",
      description: "Korte punkter, der fremhæver din erfaring, tilgang og vision.",
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
            defineField({ name: "text", type: "text", rows: 3, title: "Tekst" }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      initialValue: [
        {
          _key: "hl-1",
          title: "Erfaring",
          text: "Mange års praksis og certificeret uddannelse i mindfulness og meditation, forankret i både videnskab og hjertet.",
        },
        {
          _key: "hl-2",
          title: "Tilgang",
          text: "En blid og fordomsfri måde at møde dig på – enkle øvelser, du kan bruge, uanset hvor travlt livet er.",
        },
        {
          _key: "hl-3",
          title: "Vision",
          text: "At skabe et roligt fællesskab, hvor du tør lande i dig selv og finde tilbage til din egen indre balance.",
        },
      ],
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
      initialValue: {
        text: "Du behøver ikke at finde tid til at meditere – du skal blot give dig selv lov til at være til stede.",
        author: "Circle of Mindfulness",
      },
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
