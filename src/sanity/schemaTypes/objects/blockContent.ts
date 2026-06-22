import { defineArrayMember, defineField, defineType } from "sanity";

const altField = defineField({
  name: "alt",
  type: "string",
  title: "Alt-tekst (til skærmlæsere)",
  description: "Kort beskrivelse af billedet.",
});

const captionField = defineField({
  name: "caption",
  type: "string",
  title: "Billedtekst (valgfri)",
});

export const blockContent = defineType({
  name: "blockContent",
  type: "array",
  title: "Indhold",
  description:
    "Byg dit indhold med tekst, overskrifter, billeder, gallerier, fremhævede bokse og video — bland det, så hvert indlæg bliver unikt.",
  of: [
    defineArrayMember({
      type: "block",
      title: "Tekst",
      styles: [
        { title: "Brødtekst", value: "normal" },
        { title: "Overskrift", value: "h2" },
        { title: "Underoverskrift", value: "h3" },
        { title: "Lille overskrift", value: "h4" },
        { title: "Citat", value: "blockquote" },
      ],
      lists: [
        { title: "Punktliste", value: "bullet" },
        { title: "Nummereret liste", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fed", value: "strong" },
          { title: "Kursiv", value: "em" },
          { title: "Understreget", value: "underline" },
          { title: "Fremhævet", value: "highlight" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      name: "image",
      title: "Billede",
      options: { hotspot: true },
      fields: [altField, captionField],
    }),
    defineArrayMember({
      type: "object",
      name: "gallery",
      title: "Galleri / slideshow",
      description: "Flere billeder, som vises som et lille slideshow.",
      fields: [
        defineField({
          name: "images",
          type: "array",
          title: "Billeder",
          of: [
            defineArrayMember({
              type: "image",
              options: { hotspot: true },
              fields: [altField, captionField],
            }),
          ],
          validation: (Rule) => Rule.min(1),
        }),
      ],
      preview: {
        select: { images: "images" },
        prepare({ images }) {
          const count = Array.isArray(images) ? images.length : 0;
          return {
            title: "Galleri / slideshow",
            subtitle: `${count} billede${count === 1 ? "" : "r"}`,
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Fremhævet boks",
      description: "En boks der trækker øjet til en vigtig pointe.",
      fields: [
        defineField({
          name: "tone",
          type: "string",
          title: "Stil",
          options: {
            list: [
              { title: "Ro (grøn)", value: "sage" },
              { title: "Varm (ler)", value: "clay" },
              { title: "Neutral", value: "neutral" },
            ],
            layout: "radio",
          },
          initialValue: "sage",
        }),
        defineField({
          name: "title",
          type: "string",
          title: "Overskrift (valgfri)",
        }),
        defineField({
          name: "text",
          type: "text",
          rows: 3,
          title: "Tekst",
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: { title: "title", subtitle: "text" },
        prepare({ title, subtitle }) {
          return { title: title || "Fremhævet boks", subtitle };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "youtube",
      title: "YouTube-video",
      fields: [
        defineField({
          name: "url",
          type: "url",
          title: "YouTube-URL",
          description: "Indsæt linket til videoen (youtube.com eller youtu.be).",
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: { url: "url" },
        prepare({ url }) {
          return { title: "YouTube-video", subtitle: url };
        },
      },
    }),
  ],
});
