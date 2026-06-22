import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  type: "document",
  title: "Kontakt",
  description: "Indholdet på kontaktsiden. Felterne er udfyldt på forhånd — ret blot teksterne.",
  groups: [
    { name: "content", title: "Tekst", default: true },
    { name: "details", title: "Kontaktoplysninger" },
    { name: "seo", title: "SEO / deling" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Overskrift",
      description: "Den store overskrift øverst på kontaktsiden.",
      group: "content",
      initialValue: "Lad os tale sammen",
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort, varm indledning under overskriften.",
      group: "content",
      initialValue:
        "Tag dig god tid. Skriv et par ord om, hvad der fylder, så finder vi sammen ud af det næste skridt.",
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 3,
      title: "Introtekst",
      description: "En kort tekst ved siden af kontaktoplysningerne.",
      group: "content",
      initialValue:
        "Du er altid velkommen til at skrive eller ringe – uanset om du har et konkret spørgsmål eller bare vil høre mere.",
    }),
    defineField({
      name: "showForm",
      type: "boolean",
      title: "Vis kontaktformular",
      description: "Slå kontaktformularen til eller fra på siden.",
      group: "content",
      initialValue: true,
    }),
    defineField({
      name: "email",
      type: "string",
      title: "E-mail",
      description: "Den e-mailadresse, besøgende kan skrive til.",
      group: "details",
      initialValue: "kontakt@circleofmindfulness.dk",
      validation: (Rule) => Rule.email().error("Skriv en gyldig e-mailadresse"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Telefon",
      description: "Valgfrit telefonnummer.",
      group: "details",
    }),
    defineField({
      name: "address",
      type: "text",
      rows: 2,
      title: "Adresse",
      description: "Valgfri adresse, hvis det er relevant.",
      group: "details",
    }),
    defineField({
      name: "instagramUrl",
      type: "url",
      title: "Instagram",
      description: "Fuldt link til din Instagram-profil.",
      group: "details",
    }),
    defineField({
      name: "facebookUrl",
      type: "url",
      title: "Facebook",
      description: "Fuldt link til din Facebook-side.",
      group: "details",
    }),
    defineField({
      name: "openingHours",
      type: "array",
      title: "Åbningstider",
      description: "Valgfrit. Tider, hvor du er tilgængelig.",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "day",
              type: "string",
              title: "Dag",
              description: "Fx “Mandag” eller “Man–fre”.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "hours",
              type: "string",
              title: "Tidsrum",
              description: "Fx “9.00–16.00” eller “Lukket”.",
            }),
          ],
          preview: { select: { title: "day", subtitle: "hours" } },
        }),
      ],
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO / deling",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Kontakt", subtitle: "Kontaktsiden" };
    },
  },
});
