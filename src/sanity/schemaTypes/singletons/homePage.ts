import { defineArrayMember, defineField, defineType } from "sanity";

import { ptBlocks } from "../defaults";

const iconList = [
  { title: "Blad", value: "Leaf" },
  { title: "Spire", value: "Sprout" },
  { title: "Blomst", value: "Flower2" },
  { title: "Hjerte", value: "Heart" },
  { title: "Hånd med hjerte", value: "HandHeart" },
  { title: "Vind", value: "Wind" },
  { title: "Bølger", value: "Waves" },
  { title: "Sol", value: "Sun" },
  { title: "Måne", value: "Moon" },
  { title: "Gnister", value: "Sparkles" },
  { title: "Hjerne", value: "Brain" },
  { title: "Kompas", value: "Compass" },
  { title: "Mennesker", value: "Users" },
];

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Forside",
  description: "Alt indhold på forsiden. Felterne er allerede udfyldt — ret blot teksterne.",
  groups: [
    { name: "hero", title: "Toppen (hero)", default: true },
    { name: "content", title: "Indhold" },
    { name: "seo", title: "SEO / deling" },
  ],
  fields: [
    defineField({
      name: "heroKicker",
      type: "string",
      title: "Lille overtekst",
      description: "Den lille tekst over den store overskrift øverst.",
      group: "hero",
      initialValue: "Velkommen til ro",
    }),
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Stor overskrift",
      description: "Det første, besøgende ser. Hold den kort og varm.",
      group: "hero",
      initialValue: "Find ro, nærvær og balance i hverdagen",
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 3,
      title: "Underoverskrift",
      description: "En kort introducerende tekst under overskriften.",
      group: "hero",
      initialValue:
        "Circle of Mindfulness tilbyder meditation, mindfulness-forløb og små daglige pauser, der hjælper dig med at lande i dig selv.",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Billede i toppen",
      description:
        "Valgfrit. Er feltet tomt, vises en rolig grafik med blomst-motiv i stedet.",
      group: "hero",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt-tekst (til skærmlæsere)",
          description: "Kort beskrivelse af billedet.",
        }),
      ],
    }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primær knap",
      description: "Den fremhævede knap i toppen.",
      group: "hero",
      options: { columns: 2 },
      fields: [
        defineField({ name: "label", type: "string", title: "Tekst på knappen" }),
        defineField({
          name: "href",
          type: "string",
          title: "Hvor fører knappen hen?",
          description: "En sti som /kort eller /forloeb, eller et fuldt link.",
        }),
      ],
      initialValue: { label: "Træk et meditationskort", href: "/kort" },
    }),
    defineField({
      name: "secondaryCta",
      type: "object",
      title: "Sekundær knap",
      description: "Den mere afdæmpede knap ved siden af.",
      group: "hero",
      options: { columns: 2 },
      fields: [
        defineField({ name: "label", type: "string", title: "Tekst på knappen" }),
        defineField({
          name: "href",
          type: "string",
          title: "Hvor fører knappen hen?",
          description: "En sti som /forloeb, eller et fuldt link.",
        }),
      ],
      initialValue: { label: "Se forløb", href: "/forloeb" },
    }),
    defineField({
      name: "introHeading",
      type: "string",
      title: "Overskrift til afsnit",
      description: "Overskriften over de tre værdier længere nede på siden.",
      group: "content",
      initialValue: "Mindfulness, der passer ind i dit liv",
    }),
    defineField({
      name: "introBody",
      type: "blockContent",
      title: "Kort introtekst",
      description: "En kort tekst under overskriften (valgfri).",
      group: "content",
      initialValue: ptBlocks([
        "Hos Circle of Mindfulness handler det ikke om at præstere – men om at vende hjem til dig selv. Med enkle redskaber finder du en ro, du kan bruge i hverdagen.",
      ]),
    }),
    defineField({
      name: "valueProps",
      type: "array",
      title: "Tre værdier",
      description: "De tre korte punkter, der fremhæver det vigtigste.",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Titel" }),
            defineField({ name: "text", type: "text", rows: 3, title: "Tekst" }),
            defineField({
              name: "icon",
              type: "string",
              title: "Ikon",
              description: "Vælg et ikon, der passer til værdien.",
              options: { list: iconList },
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      initialValue: [
        {
          _key: "vp-1",
          title: "Nærvær",
          text: "Lær at være til stede i nuet – uden at dømme dig selv.",
          icon: "Leaf",
        },
        {
          _key: "vp-2",
          title: "Ro i kroppen",
          text: "Enkle åndedrætsøvelser, der beroliger dit nervesystem.",
          icon: "Wind",
        },
        {
          _key: "vp-3",
          title: "Balance",
          text: "Find tilbage til balance, når livet føles travlt.",
          icon: "Waves",
        },
      ],
    }),
    defineField({
      name: "featuredOfferings",
      type: "array",
      title: "Fremhævede forløb",
      description:
        "Vælg de forløb, der skal vises på forsiden. Lad feltet stå tomt for automatisk at vise de nyeste.",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "offering" }] })],
    }),
    defineField({
      name: "quote",
      type: "object",
      title: "Citat",
      description: "Et lille citat midt på siden.",
      group: "content",
      fields: [
        defineField({ name: "text", type: "text", rows: 3, title: "Citat" }),
        defineField({
          name: "author",
          type: "string",
          title: "Hvem har sagt det?",
        }),
      ],
      initialValue: {
        text: "Du kan ikke stoppe bølgerne, men du kan lære at surfe.",
        author: "Jon Kabat-Zinn",
      },
    }),
    defineField({
      name: "cardCtaTitle",
      type: "string",
      title: "Overskrift: kort-opfordring",
      description: "Overskriften i feltet, der opfordrer til at trække et kort.",
      group: "content",
      initialValue: "Brug for en pause lige nu?",
    }),
    defineField({
      name: "cardCtaText",
      type: "text",
      rows: 2,
      title: "Tekst: kort-opfordring",
      group: "content",
      initialValue:
        "Træk et meditationskort og giv dig selv 3–5 minutters ro – lige her, lige nu.",
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
      return { title: "Forside", subtitle: "Forsidens indhold" };
    },
  },
});
