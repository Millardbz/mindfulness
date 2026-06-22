import { defineArrayMember, defineField, defineType } from "sanity";

import { ptBlocks } from "../defaults";

export const offeringsPage = defineType({
  name: "offeringsPage",
  type: "document",
  title: "Forløb-siden",
  description:
    "Teksten i toppen af forløbssiden. Selve forløbene oprettes under “Alle forløb”.",
  fields: [
    defineField({
      name: "heroKicker",
      type: "string",
      title: "Lille overtekst",
      description: "Den lille tekst over overskriften, fx “Forløb & tilbud”.",
      initialValue: "Forløb & tilbud",
    }),
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Overskrift",
      description: "Den store overskrift øverst på forløbssiden.",
      initialValue: "Gå dybere — i dit eget tempo",
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort, indbydende indledning under overskriften.",
      initialValue:
        "Et forløb giver dig tid og ro til at lade nærværet slå rod – skridt for skridt, med plads til netop dig.",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Billede i toppen",
      description: "Valgfrit roligt billede til toppen af siden.",
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
      name: "intro",
      type: "blockContent",
      title: "Introtekst",
      description: "En kort introduktion til dine forløb (vises under overskriften).",
      initialValue: ptBlocks([
        "Uanset om du er nybegynder eller har mediteret i årevis, er du velkommen. Vælg et forløb, der passer til dig – og giv dig selv lov til at gå roligt frem.",
      ]),
    }),
    defineField({
      name: "processTitle",
      type: "string",
      title: "Overskrift: forløbs-trin",
      description: "Overskriften over trinene længere nede på siden.",
      initialValue: "Et typisk forløb",
    }),
    defineField({
      name: "processSteps",
      type: "array",
      title: "Et typisk forløb (trin)",
      description: "De trin, et forløb typisk består af.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Titel" }),
            defineField({ name: "text", type: "text", rows: 2, title: "Tekst" }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      initialValue: [
        {
          _key: "step-1",
          title: "Afklaring & mål",
          text: "Vi taler kort om behov, ønsker og evt. udfordringer. Vi aftaler et enkelt fokus.",
        },
        {
          _key: "step-2",
          title: "Plan & format",
          text: "Vi vælger ramme: 1:1, hold, workshop eller online. Længde og frekvens tilpasses.",
        },
        {
          _key: "step-3",
          title: "Praksis",
          text: "Guidede øvelser: åndedræt, kropsnærvær og meditationskort – med plads til spørgsmål.",
        },
        {
          _key: "step-4",
          title: "Opfølgning",
          text: "Vi runder af med en kort plan for hverdagen og evt. næste skridt.",
        },
      ],
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO / deling",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Forløb-siden", subtitle: "Tekst i toppen" };
    },
  },
});
