import { defineType, defineField, defineArrayMember } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  type: "array",
  title: "Indhold",
  of: [
    defineArrayMember({
      type: "block",
      title: "Tekstblok",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Overskrift", value: "h2" },
        { title: "Underoverskrift", value: "h3" },
        { title: "Citat", value: "blockquote" },
      ],
      lists: [
        { title: "Punktliste", value: "bullet" },
        { title: "Nummereret", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fed", value: "strong" },
          { title: "Kursiv", value: "em" },
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
      title: "Billede",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt-tekst",
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Billedtekst",
        }),
      ],
    }),
  ],
});
