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
      initialValue: "Alt det gratis – samlet ét sted",
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort, indbydende indledning under overskriften.",
      initialValue:
        "Få et hurtigt overblik over de gratis tilbud – meditationskort, mit fællesskab på Facebook, bloggen og gratis videoer. Klik dig videre til det, du har lyst til.",
    }),
    defineField({
      name: "resources",
      type: "array",
      title: "Kasser på oversigten",
      description:
        "De gratis tilbud, der vises som kasser med link. Træk i kasserne for at ændre rækkefølgen.",
      of: [
        defineArrayMember({
          type: "object",
          name: "resourceCard",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Lille mærkat (valgfri)",
              description: "Den lille tekst i hjørnet af kassen, fx “Kort”.",
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Overskrift",
              validation: (Rule) =>
                Rule.required().error("Overskriften skal udfyldes"),
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 2,
              title: "Kort tekst",
            }),
            defineField({
              name: "href",
              type: "string",
              title: "Link",
              description:
                "Hvor kassen fører hen. Intern side (fx /kort, /blog) eller et fuldt link (fx https://…).",
              validation: (Rule) =>
                Rule.required().error("Linket skal udfyldes"),
            }),
            defineField({
              name: "external",
              type: "boolean",
              title: "Åbn i nyt vindue",
              description: "Slå til for eksterne links (fx Facebook).",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "href" },
          },
        }),
      ],
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
