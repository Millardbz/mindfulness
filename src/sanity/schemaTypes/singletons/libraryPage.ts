import { defineField, defineType } from "sanity";

export const libraryPage = defineType({
  name: "libraryPage",
  type: "document",
  title: "Gratis bibliotek",
  description:
    "Teksten i toppen af det gratis bibliotek. Selve videoerne oprettes under “Videoer”.",
  fields: [
    defineField({
      name: "heroKicker",
      type: "string",
      title: "Lille overtekst",
      description: "Den lille tekst over overskriften.",
      initialValue: "Gratis bibliotek",
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
        "Et lille bibliotek med guidede meditationer og øvelser, du kan bruge derhjemme – helt gratis. Skriv din e-mail, og få adgang med det samme.",
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
      return { title: "Gratis bibliotek", subtitle: "Tekst i toppen" };
    },
  },
});
