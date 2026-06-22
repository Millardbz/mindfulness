import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  type: "object",
  title: "SEO",
  description:
    "Valgfrie overstyringer til søgemaskiner og deling. Udfyld kun felter, hvor du ønsker at afvige fra standarderne.",
  fields: [
    defineField({
      name: "metaTitle",
      type: "string",
      title: "Meta-titel",
      description:
        "Vises i søgeresultater og browserfanen. Lad stå tom for at bruge sidens titel.",
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      title: "Meta-beskrivelse",
      rows: 3,
      description:
        "Kort beskrivelse til søgeresultater. Anbefalet længde er 50-160 tegn.",
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Delingsbillede",
      description:
        "Billede der vises, når siden deles på sociale medier. Ideelt format er 1200×630 px.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt-tekst",
        }),
      ],
    }),
    defineField({
      name: "noIndex",
      type: "boolean",
      title: "Skjul for søgemaskiner",
      description:
        "Slå til for at bede søgemaskiner om ikke at vise denne side i resultaterne.",
      initialValue: false,
    }),
  ],
});
