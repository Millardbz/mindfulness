import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  type: "document",
  title: "Indstillinger",
  description:
    "Generelle oplysninger om hjemmesiden. Vises i sidehoved, footer og som kontaktinfo.",
  groups: [
    { name: "general", title: "Generelt", default: true },
    { name: "contact", title: "Kontakt & sociale medier" },
    { name: "newsletter", title: "Nyhedsbrev" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Sidens navn",
      description: "Navnet på din virksomhed/hjemmeside.",
      group: "general",
      initialValue: "Circle of Mindfulness",
      validation: (Rule) => Rule.required().error("Sidens navn skal udfyldes"),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      title: "Kort beskrivelse",
      description:
        "Én til to sætninger om, hvad du tilbyder. Bruges af Google og når siden deles.",
      group: "general",
      initialValue:
        "Mindfulness, mindful yoga og healing i Ringsted. Læs med på bloggen, find et forløb, eller træk et meditationskort og giv dig selv en pause.",
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      description:
        "Valgfrit. Vises øverst til venstre. Er feltet tomt, viser siden i stedet et lille blomst-ikon og navnet.",
      group: "general",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt-tekst (til skærmlæsere)",
          description: "Kort beskrivelse af logoet.",
        }),
      ],
    }),
    defineField({
      name: "footerText",
      type: "text",
      rows: 2,
      title: "Tekst i footeren",
      description: "Den lille tekst nederst på alle sider.",
      group: "general",
      initialValue:
        "Jeg kombinerer mindfulness, mindful yoga og healing i alt, hvad jeg laver – så du kan få mere ud af dit liv.",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "E-mail",
      description: "Din kontakt-e-mail. Vises i footeren og på kontaktsiden.",
      group: "contact",
      initialValue: "info@circleofmindfulness.dk",
      validation: (Rule) => Rule.email().error("Skriv en gyldig e-mailadresse"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Telefon",
      description: "Valgfrit telefonnummer, fx “26 53 65 58”.",
      group: "contact",
      initialValue: "26 53 65 58",
    }),
    defineField({
      name: "address",
      type: "text",
      rows: 3,
      title: "Adresse",
      description: "Vises i footeren. Hver linje vises på sin egen linje.",
      group: "contact",
      initialValue:
        "Circle of Mindfulness\nNordcentret, Benløseparken 2\n4100 Ringsted",
    }),
    defineField({
      name: "cvr",
      type: "string",
      title: "CVR-nr.",
      description: "Dit CVR-nummer. Vises i footeren.",
      group: "contact",
      initialValue: "30311434",
    }),
    defineField({
      name: "instagramUrl",
      type: "url",
      title: "Instagram",
      description: "Fuldt link, fx https://instagram.com/ditbrugernavn",
      group: "contact",
    }),
    defineField({
      name: "facebookUrl",
      type: "url",
      title: "Facebook",
      description: "Fuldt link til din Facebook-side.",
      group: "contact",
      initialValue: "https://www.facebook.com/circleofmindfulness/",
    }),
    defineField({
      name: "facebookGroupUrl",
      type: "url",
      title: "Facebook-gruppe",
      description:
        "Link til din gratis Facebook-gruppe (fx “Mindfulness Universet”). Vises i footeren.",
      group: "contact",
      initialValue: "https://www.facebook.com/groups/mindfulnessuniverset",
    }),
    defineField({
      name: "linkedinUrl",
      type: "url",
      title: "LinkedIn",
      description: "Fuldt link til din LinkedIn-profil.",
      group: "contact",
    }),
    defineField({
      name: "youtubeUrl",
      type: "url",
      title: "YouTube",
      description: "Fuldt link til din YouTube-kanal.",
      group: "contact",
    }),
    defineField({
      name: "newsletterEnabled",
      type: "boolean",
      title: "Vis nyhedsbrevs-tilmelding",
      description:
        "Slå tilmeldingen til nyhedsbrevet til eller fra (popup i hjørnet og formularen på kontaktsiden).",
      group: "newsletter",
      initialValue: true,
    }),
    defineField({
      name: "newsletterTitle",
      type: "string",
      title: "Overskrift",
      description: "Overskriften på nyhedsbrevs-tilmeldingen.",
      group: "newsletter",
      initialValue: "Tilmeld dig nyhedsbrevet",
    }),
    defineField({
      name: "newsletterText",
      type: "text",
      rows: 3,
      title: "Tekst",
      description: "En kort tekst, der fortæller, hvad man får.",
      group: "newsletter",
      initialValue:
        "Få nyheder, tilbud og små pauser med ro – direkte i din indbakke, før alle andre.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Indstillinger", subtitle: "Generelle oplysninger" };
    },
  },
});
