import { defineArrayMember, defineField, defineType } from "sanity";

import {
  PORTRAIT_HEADING,
  PORTRAIT_PARAGRAPHS,
  REVIEWS,
} from "../../../data/site-content";
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
  description:
    "Alt indhold på forsiden. Felterne er allerede udfyldt — ret blot teksterne.",
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
        "Jeg kombinerer mindfulness, mindful yoga og healing – med kroppen som udgangspunkt – og hjælper dig med at få mere ud af dit liv gennem små daglige pauser og konkrete redskaber.",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Billede i toppen",
      description:
        "Valgfrit. Er feltet tomt, vises portrættet af Sonja i stedet.",
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
      name: "founder",
      type: "object",
      title: "Kort om Sonja (kortet på billedet)",
      description:
        "Det lille kort, der ligger oven på billedet i toppen og gør forsiden personlig.",
      group: "hero",
      fields: [
        defineField({
          name: "name",
          type: "string",
          title: "Navn",
        }),
        defineField({
          name: "role",
          type: "string",
          title: "Titel/rolle",
          description: "Fx “Mindfulness-instruktør, yogalærer & Reiki Mester”.",
        }),
        defineField({
          name: "text",
          type: "text",
          rows: 3,
          title: "Kort tekst",
          description: "Én til to personlige sætninger.",
        }),
      ],
      initialValue: {
        name: "Sonja Bomberg",
        role: "Mindfulness-instruktør, yogalærer & Reiki Mester",
        text: "Min tilgang er altid kroppen og de betingelser, den giver. Jeg er klar til at hjælpe dig med at få mere ud af dit liv.",
      },
    }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primær knap",
      description: "Den fremhævede knap i toppen.",
      group: "hero",
      options: { columns: 2 },
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Tekst på knappen",
        }),
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
        defineField({
          name: "label",
          type: "string",
          title: "Tekst på knappen",
        }),
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
      initialValue: "Mindfulness, mindful yoga & healing",
    }),
    defineField({
      name: "introBody",
      type: "blockContent",
      title: "Kort introtekst",
      description: "En kort tekst under overskriften (valgfri).",
      group: "content",
      initialValue: ptBlocks([
        "Min tilgang i alt, hvad jeg gør, er altid kroppen og de betingelser, den giver at arbejde med. Jeg bruger og kombinerer mindfulness, mindful yoga og healing i alle mine aktiviteter – og er klar til at hjælpe dig med at få mere ud af dit liv.",
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
            defineField({
              name: "text",
              type: "text",
              rows: 3,
              title: "Tekst",
            }),
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
          title: "Mindfulness",
          text: "Vejen til at blive opmærksom, være til stede og stille – og få adgang til din indre GPS, der fortæller dig, hvordan du virkelig har det.",
          icon: "Leaf",
        },
        {
          _key: "vp-2",
          title: "Mindful Yoga",
          text: "En unik, blid og langsom yogaform, der bringer nervesystemet i balance og styrker din indre sundhed. Alle kan være med.",
          icon: "Flower2",
        },
        {
          _key: "vp-3",
          title: "Healing",
          text: "Energi fra universets livskraft, der intuitivt finder vej derhen, hvor du har brug for den – både fysisk og mentalt.",
          icon: "HandHeart",
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
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "offering" }] }),
      ],
    }),
    defineField({
      name: "portraitSection",
      type: "object",
      title: "Portræt-sektion (“Skal jeg hjælpe dig”)",
      description:
        "Sektion med billede til venstre og tekst + knapper til højre.",
      group: "content",
      fields: [
        defineField({ name: "heading", type: "string", title: "Overskrift" }),
        defineField({ name: "body", type: "blockContent", title: "Tekst" }),
        defineField({
          name: "image",
          type: "image",
          title: "Billede",
          description:
            "Valgfrit. Bruger ellers portrættet fra public/images/portrait.jpg.",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt-tekst" }),
          ],
        }),
        defineField({
          name: "primaryCta",
          type: "object",
          title: "Primær knap",
          options: { columns: 2 },
          fields: [
            defineField({ name: "label", type: "string", title: "Tekst" }),
            defineField({ name: "href", type: "string", title: "Link" }),
          ],
        }),
        defineField({
          name: "secondaryCta",
          type: "object",
          title: "Sekundær knap",
          options: { columns: 2 },
          fields: [
            defineField({ name: "label", type: "string", title: "Tekst" }),
            defineField({ name: "href", type: "string", title: "Link" }),
          ],
        }),
      ],
      initialValue: {
        heading: PORTRAIT_HEADING,
        body: ptBlocks(PORTRAIT_PARAGRAPHS),
        primaryCta: {
          label: "Book en uforpligtende samtale",
          href: "/kontakt",
        },
        secondaryCta: { label: "Se forløb", href: "/forloeb" },
      },
    }),
    defineField({
      name: "reviews",
      type: "array",
      title: "Anmeldelser",
      description: "Udtalelser fra klienter, der vises på forsiden.",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "quote",
              type: "text",
              rows: 6,
              title: "Udtalelse",
            }),
            defineField({ name: "author", type: "string", title: "Navn" }),
            defineField({
              name: "role",
              type: "string",
              title: "Forløb / rolle",
              description: "Fx “Forløb: 1:1”.",
            }),
          ],
          preview: { select: { title: "author", subtitle: "role" } },
        }),
      ],
      initialValue: REVIEWS.map((review, i) => ({
        _key: `rev-${i + 1}`,
        ...review,
      })),
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
      description:
        "Overskriften i feltet, der opfordrer til at trække et kort.",
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
