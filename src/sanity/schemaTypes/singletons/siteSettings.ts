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
        "Meditation, nærvær og ro i hverdagen. Læs med på bloggen, find et forløb, eller træk et meditationskort og giv dig selv en pause.",
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
        "Små pauser, dyb ro. Mindfulness og meditation til hverdagen.",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "E-mail",
      description: "Din kontakt-e-mail. Vises i footeren og på kontaktsiden.",
      group: "contact",
      initialValue: "info@sonjacircle.dk",
      validation: (Rule) =>
        Rule.email().error("Skriv en gyldig e-mailadresse"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Telefon",
      description: "Valgfrit telefonnummer, fx “+45 12 34 56 78”.",
      group: "contact",
    }),
    defineField({
      name: "address",
      type: "text",
      rows: 3,
      title: "Adresse",
      description: "Vises i footeren. Hver linje vises på sin egen linje.",
      group: "contact",
      initialValue: "Circle of Mindfulness\nGammel Lundtoftevej 3C\n2800 Kongens Lyngby",
    }),
    defineField({
      name: "cvr",
      type: "string",
      title: "CVR-nr.",
      description: "Dit CVR-nummer. Vises i footeren.",
      group: "contact",
      initialValue: "DK31429307",
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
  ],
  preview: {
    prepare() {
      return { title: "Indstillinger", subtitle: "Generelle oplysninger" };
    },
  },
});
