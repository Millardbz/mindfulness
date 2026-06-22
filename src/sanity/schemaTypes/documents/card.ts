import { defineType, defineField } from "sanity";

export const card = defineType({
  name: "card",
  type: "document",
  title: "Meditationskort",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel (valgfri)",
      description:
        "Kort overskrift for kortet. Hvis den udelades, bruges første linje af teksten.",
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 8,
      title: "Tekst / vejledning",
      description:
        "Selve den korte meditation. Skriv én anvisning pr. linje – linjeskift bevares på kortet.",
      initialValue:
        "Sæt dig godt til rette og luk øjnene.\nTræk vejret langsomt og roligt.\nMærk hvordan roen breder sig i kroppen.\nForsæt 3–5 minutter eller så længe du har lyst.",
      validation: (Rule) => Rule.required().error("Skriv teksten til kortet"),
    }),
    defineField({
      name: "duration",
      type: "string",
      title: "Varighed",
      description: "Anslået varighed, fx “3–5 min”.",
      initialValue: "3–5 min",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Rækkefølge",
      description: "Lavere tal vises først.",
    }),
  ],
  orderings: [
    {
      name: "orderAsc",
      title: "Rækkefølge (stigende)",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      body: "body",
      duration: "duration",
    },
    prepare({ title, body, duration }) {
      const firstLine =
        typeof body === "string" ? body.split("\n")[0] : undefined;
      return {
        title: title || firstLine || "Uden titel",
        subtitle: duration,
      };
    },
  },
});
