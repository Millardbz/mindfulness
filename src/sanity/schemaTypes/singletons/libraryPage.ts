import { defineArrayMember, defineField, defineType } from "sanity";

export const libraryPage = defineType({
  name: "libraryPage",
  type: "document",
  title: "Gratis Materialer",
  description:
    "Teksten i toppen af siden “Gratis Materialer”, og listen af gratis videoer, der linker til YouTube (KIP TV).",
  fields: [
    defineField({
      name: "heroKicker",
      type: "string",
      title: "Lille overtekst",
      description: "Den lille tekst over overskriften.",
      initialValue: "Gratis Materialer",
    }),
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Overskrift",
      description: "Den store overskrift øverst på siden.",
      initialValue: "Gratis videoer og meditationer",
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort, indbydende indledning under overskriften.",
      initialValue:
        "Et lille bibliotek med guidede meditationer og øvelser, du kan bruge derhjemme – helt gratis. Klik dig videre til videoerne på YouTube.",
    }),
    defineField({
      name: "videos",
      type: "array",
      title: "Videoer (link til YouTube)",
      description:
        "Kort med link til dine gratis videoer på YouTube (KIP TV). Træk i kortene for at ændre rækkefølgen.",
      of: [
        defineArrayMember({
          type: "object",
          name: "videoLink",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Titel",
              validation: (Rule) =>
                Rule.required().error("Titlen skal udfyldes"),
            }),
            defineField({
              name: "youtubeUrl",
              type: "url",
              title: "YouTube-link",
              description: "Fx https://www.youtube.com/watch?v=…",
              validation: (Rule) =>
                Rule.required().error("YouTube-linket skal udfyldes"),
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 2,
              title: "Kort tekst (valgfri)",
              description: "En kort beskrivelse, der vises på kortet.",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "youtubeUrl" },
          },
        }),
      ],
    }),
    defineField({
      name: "gateTitle",
      type: "string",
      title: "Overskrift: lås op",
      description: "Overskriften på boksen, hvor man skriver sin e-mail.",
      initialValue: "Lås videoen op – helt gratis",
    }),
    defineField({
      name: "gateText",
      type: "text",
      rows: 3,
      title: "Tekst: lås op",
      description: "En kort tekst i boksen, hvor man skriver sin e-mail.",
      initialValue:
        "Skriv dit navn og din e-mail, så får du adgang til videoen med det samme. Du tilmeldes samtidig mit nyhedsbrev, som du altid kan afmelde igen.",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO / deling",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gratis Materialer", subtitle: "Tekst + videoer" };
    },
  },
});
