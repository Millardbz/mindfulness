import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  type: "document",
  title: "Kontakt",
  description:
    "Indholdet på kontaktsiden. Felterne er udfyldt på forhånd — ret blot teksterne.",
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
      initialValue: "Har du spørgsmål?",
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
        "Skriv, ring eller send en sms – så finder vi sammen ud af det næste skridt.",
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 3,
      title: "Introtekst",
      description: "En kort tekst ved siden af kontaktoplysningerne.",
      group: "content",
      initialValue:
        "Du er altid velkommen til at skrive eller ringe. På hverdage kan du forvente svar inden for 24 timer – jeg bestræber mig altid på at vende tilbage hurtigst muligt.",
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
      initialValue: "info@circleofmindfulness.dk",
      validation: (Rule) => Rule.email().error("Skriv en gyldig e-mailadresse"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Telefon",
      description: "Valgfrit telefonnummer.",
      group: "details",
      initialValue: "26 53 65 58",
    }),
    defineField({
      name: "address",
      type: "text",
      rows: 4,
      title: "Adresse",
      description: "Valgfri adresse, hvis det er relevant.",
      group: "details",
      initialValue:
        "Circle of Mindfulness\nNordcentret, Benløseparken 2\n4100 Ringsted\nIndgang udefra centret mod Benløseparken – parkering og bus 401A lige ved centret.",
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
      initialValue: "https://www.facebook.com/circleofmindfulness/",
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
