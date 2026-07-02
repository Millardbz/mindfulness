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

export const erhvervPage = defineType({
  name: "erhvervPage",
  type: "document",
  title: "Erhverv",
  description:
    "Indholdet på erhvervssiden til virksomheder. Felterne er udfyldt på forhånd — ret blot teksterne.",
  groups: [
    { name: "hero", title: "Toppen (hero)", default: true },
    { name: "content", title: "Indhold" },
    { name: "faq", title: "Spørgsmål & svar" },
    { name: "seo", title: "SEO / deling" },
  ],
  fields: [
    defineField({
      name: "heroKicker",
      type: "string",
      title: "Lille overtekst",
      description: "Den lille tekst over den store overskrift øverst.",
      group: "hero",
      initialValue: "Erhverv",
    }),
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Stor overskrift",
      description: "Det første, virksomheder ser. Hold den kort og konkret.",
      group: "hero",
      initialValue: "Mindfulness, der styrker trivslen på arbejdspladsen",
      validation: (Rule) => Rule.required().error("Overskriften skal udfyldes"),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 4,
      title: "Underoverskrift",
      description: "En kort introducerende tekst under overskriften.",
      group: "hero",
      initialValue:
        "Stress og konstant travlhed koster – på trivsel, fokus og bundlinje. Jeg hjælper virksomheder med at skabe ro og nærvær i hverdagen gennem workshops, foredrag og forløb, der tilpasses jeres behov.",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Billede i toppen",
      description: "Valgfrit. Vises til højre for teksten, når det er udfyldt.",
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
        defineField({
          name: "label",
          type: "string",
          title: "Tekst på knappen",
        }),
        defineField({
          name: "href",
          type: "string",
          title: "Hvor fører knappen hen?",
          description: "En sti som /kontakt, eller et fuldt link.",
        }),
      ],
      initialValue: {
        label: "Book en uforpligtende samtale",
        href: "/kontakt",
      },
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
      initialValue: { label: "Se løsninger", href: "#loesninger" },
    }),
    defineField({
      name: "introHeading",
      type: "string",
      title: "Overskrift til afsnit",
      description: "Overskriften over fordelene længere nede på siden.",
      group: "content",
      initialValue: "Hvorfor mindfulness på arbejdspladsen?",
    }),
    defineField({
      name: "introBody",
      type: "blockContent",
      title: "Kort introtekst",
      description: "En kort tekst under overskriften (valgfri).",
      group: "content",
      initialValue: ptBlocks([
        "Mindfulness er ikke en pause fra arbejdet – det er en træning i at være til stede i det. Forskning viser, at regelmæssig træning reducerer stress og styrker koncentration, overblik og samarbejde. Jeg kommer ud til jer med jordnære, konkrete øvelser, der passer ind i en travl arbejdsdag.",
      ]),
    }),
    defineField({
      name: "benefits",
      type: "array",
      title: "Fordele for virksomheden",
      description:
        "Tre korte punkter, der fremhæver udbyttet for arbejdspladsen.",
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
              description: "Vælg et ikon, der passer til fordelen.",
              options: { list: iconList },
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      initialValue: [
        {
          _key: "bf-1",
          title: "Færre stress-symptomer",
          text: "Medarbejderne får enkle redskaber til at genfinde roen – før travlhed bliver til stress.",
          icon: "Leaf",
        },
        {
          _key: "bf-2",
          title: "Skarpere fokus",
          text: "Korte, daglige pauser træner hjernen til at koncentrere sig – også når der er pres på.",
          icon: "Brain",
        },
        {
          _key: "bf-3",
          title: "Stærkere samarbejde",
          text: "Nærvær smitter: mere lydhørhed, roligere møder og et bedre arbejdsfællesskab.",
          icon: "Users",
        },
      ],
    }),
    defineField({
      name: "solutionsTitle",
      type: "string",
      title: "Overskrift: løsninger",
      description: "Overskriften over de fremhævede løsninger/forløb.",
      group: "content",
      initialValue: "Løsninger til jeres arbejdsplads",
    }),
    defineField({
      name: "solutionsIntro",
      type: "text",
      rows: 2,
      title: "Introtekst: løsninger",
      description: "En kort tekst under overskriften (valgfri).",
      group: "content",
      initialValue:
        "Alt tilpasses jeres hverdag, ønsker og erfaring – fra et enkelt oplæg til længere forløb.",
    }),
    defineField({
      name: "solutions",
      type: "array",
      title: "Fremhævede løsninger",
      description:
        "Vælg de forløb/tilbud, der er relevante for virksomheder. Lad feltet stå tomt for automatisk at vise erhvervsforløb.",
      group: "content",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "offering" }] }),
      ],
    }),
    defineField({
      name: "processTitle",
      type: "string",
      title: "Overskrift: sådan foregår det",
      description: "Overskriften over trinene længere nede på siden.",
      group: "content",
      initialValue: "Sådan kommer vi i gang",
    }),
    defineField({
      name: "processSteps",
      type: "array",
      title: "Sådan foregår det (trin)",
      description: "De trin, et samarbejde typisk består af.",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Titel" }),
            defineField({
              name: "text",
              type: "text",
              rows: 2,
              title: "Tekst",
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      initialValue: [
        {
          _key: "step-1",
          title: "Uforpligtende samtale",
          text: "Vi tager en kort snak om jeres hverdag, behov og ønsker – helt uforpligtende.",
        },
        {
          _key: "step-2",
          title: "Skræddersyet forslag",
          text: "I får et konkret forslag med indhold, varighed og pris, tilpasset jeres arbejdsplads.",
        },
        {
          _key: "step-3",
          title: "Afvikling hos jer",
          text: "Jeg kommer ud til jer – eller vi mødes online. Ingen forudsætninger kræves for at deltage.",
        },
        {
          _key: "step-4",
          title: "Opfølgning",
          text: "Vi evaluerer sammen og aftaler, hvordan I holder de gode vaner i live i hverdagen.",
        },
      ],
    }),
    defineField({
      name: "faqTitle",
      type: "string",
      title: "Overskrift: spørgsmål & svar",
      group: "faq",
      initialValue: "Ofte stillede spørgsmål",
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "Spørgsmål & svar",
      description:
        "De spørgsmål, virksomheder oftest stiller – med korte svar.",
      group: "faq",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              type: "string",
              title: "Spørgsmål",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              type: "text",
              rows: 4,
              title: "Svar",
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
      initialValue: [
        {
          _key: "faq-1",
          question: "Kræver det erfaring med meditation?",
          answer:
            "Nej, slet ikke. Øvelserne er enkle og jordnære, og alle kan være med – også dem, der er skeptiske.",
        },
        {
          _key: "faq-2",
          question: "Hvor foregår det?",
          answer:
            "Jeg kommer gerne ud på jeres arbejdsplads – eller I kan besøge mit lokale i Ringsted. Workshops og forløb kan også afholdes online eller som en kombination.",
        },
        {
          _key: "faq-3",
          question: "Hvor mange kan deltage?",
          answer:
            "Et oplæg kan holdes for hele organisationen, mens workshops og forløb fungerer bedst i grupper på op til ca. 20 personer.",
        },
        {
          _key: "faq-4",
          question: "Hvor lang tid tager det?",
          answer:
            "En typisk workshop varer 2–3 timer, et oplæg ca. en time – og et forløb strækker sig ofte over 6–8 uger med korte, ugentlige sessioner.",
        },
        {
          _key: "faq-5",
          question: "Hvad koster det?",
          answer:
            "Prisen afhænger af format og omfang. Kontakt mig for et uforpligtende tilbud, der passer til jeres ønsker og budget.",
        },
      ],
    }),
    defineField({
      name: "reviews",
      type: "array",
      title: "Udtalelser fra virksomheder",
      description: "Udtalelser fra virksomhedskunder, der vises på siden.",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "quote",
              type: "text",
              rows: 4,
              title: "Udtalelse",
            }),
            defineField({ name: "author", type: "string", title: "Navn" }),
            defineField({
              name: "role",
              type: "string",
              title: "Virksomhed / rolle",
              description: "Fx “ALK” eller “Dansk Industri”.",
            }),
          ],
          preview: { select: { title: "author", subtitle: "role" } },
        }),
      ],
      initialValue: [
        {
          _key: "erev-1",
          quote:
            "Sessionen fik i øvrigt rigtig god feedback hele vejen rundt, og flere sagde faktisk, at de gerne vil begynde at dyrke yoga noget mere, så godt gået.",
          author: "Alexander Moldt Nielsen",
          role: "ALK",
        },
        {
          _key: "erev-2",
          quote: "Tak for sidst. De var rigtig glade for dit input.",
          author: "Henrik Chr. X. Wedell-Neergaard",
          role: "Dansk Industri",
        },
      ],
    }),
    defineField({
      name: "ctaTitle",
      type: "string",
      title: "Overskrift: afsluttende opfordring",
      description: "Overskriften i den farvede boks nederst på siden.",
      group: "content",
      initialValue: "Skal vi styrke trivslen hos jer?",
    }),
    defineField({
      name: "ctaText",
      type: "text",
      rows: 3,
      title: "Tekst: afsluttende opfordring",
      group: "content",
      initialValue:
        "Fortæl mig lidt om jeres arbejdsplads, så vender jeg tilbage med et forslag til, hvordan vi sammen skaber mere ro og fokus i hverdagen.",
    }),
    defineField({
      name: "ctaButton",
      type: "object",
      title: "Knap: afsluttende opfordring",
      options: { columns: 2 },
      group: "content",
      fields: [
        defineField({ name: "label", type: "string", title: "Tekst" }),
        defineField({ name: "href", type: "string", title: "Link" }),
      ],
      initialValue: { label: "Kontakt mig", href: "/kontakt" },
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO / deling",
      group: "seo",
      initialValue: {
        metaTitle: "Mindfulness til virksomheder",
        metaDescription:
          "Workshops, foredrag og forløb i mindfulness til arbejdspladser. Styrk trivsel, fokus og samarbejde med konkrete redskaber, der virker i en travl hverdag.",
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Erhverv", subtitle: "Siden til virksomheder" };
    },
  },
});
