/**
 * Seed Sanity with a complete, ready-to-edit Danish starting point:
 * the page singletons (already filled in), a sample author, categories,
 * blog posts, forløb and all 23 meditation cards.
 *
 * Run from the project root with a logged-in Sanity CLI:
 *
 *   npx sanity login            (first time only)
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * It uses createOrReplace with stable ids, so it's safe to run again.
 */
import { getCliClient } from "sanity/cli";

import { CARDS } from "../src/data/cards";

const client = getCliClient();

/* ---- helpers -------------------------------------------------------- */

type Block = ReturnType<typeof block>;

function block(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-0`, text, marks: [] }],
  };
}

function body(prefix: string, paragraphs: string[]): Block[] {
  return paragraphs.map((text, i) => block(`${prefix}-${i}`, text));
}

function ref(id: string, key?: string) {
  return { _type: "reference", _ref: id, ...(key ? { _key: key } : {}) };
}

const AUTHOR_ID = "author.circle";

/* ---- documents ------------------------------------------------------ */

const singletons = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Circle of Mindfulness",
    description:
      "Meditation, nærvær og ro i hverdagen. Læs med på bloggen, find et forløb, eller træk et meditationskort og giv dig selv en pause.",
    footerText: "Små pauser, dyb ro. Mindfulness og meditation til hverdagen.",
    email: "kontakt@circleofmindfulness.dk",
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroKicker: "Velkommen til ro",
    heroTitle: "Find ro, nærvær og balance i hverdagen",
    heroSubtitle:
      "Circle of Mindfulness tilbyder meditation, mindfulness-forløb og små daglige pauser, der hjælper dig med at lande i dig selv.",
    primaryCta: { label: "Træk et meditationskort", href: "/kort" },
    secondaryCta: { label: "Se forløb", href: "/forloeb" },
    introHeading: "Mindfulness, der passer ind i dit liv",
    introBody: body("home-intro", [
      "Hos Circle of Mindfulness handler det ikke om at præstere – men om at vende hjem til dig selv. Med enkle redskaber finder du en ro, du kan bruge i hverdagen.",
    ]),
    valueProps: [
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
    featuredOfferings: [
      ref("offering.8-ugers-mbsr", "fo-1"),
      ref("offering.intro-til-meditation", "fo-2"),
      ref("offering.privat-session", "fo-3"),
    ],
    quote: {
      text: "Du kan ikke stoppe bølgerne, men du kan lære at surfe.",
      author: "Jon Kabat-Zinn",
    },
    cardCtaTitle: "Brug for en pause lige nu?",
    cardCtaText:
      "Træk et meditationskort og giv dig selv 3–5 minutters ro – lige her, lige nu.",
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "Hej, jeg er din guide til ro",
    heroSubtitle:
      "Jeg har gennem mange år arbejdet med meditation og mindfulness – både for mig selv og sammen med andre. Min drøm er at gøre nærvær til en naturlig del af hverdagen.",
    body: body("about-body", [
      "Min rejse med mindfulness begyndte med et ønske om at finde ro midt i en travl hverdag. Det, der startede som små åndedrag mellem gøremål, voksede til en dyb praksis, der har forandret mit forhold til mig selv og verden omkring mig.",
      "I dag deler jeg det, jeg har lært, gennem meditationer, forløb og daglige pauser. Min tro er enkel: når vi lærer at være til stede – med venlighed og uden at dømme – får vi adgang til en ro, der altid har været i os.",
    ]),
    highlights: [
      {
        _key: "hl-1",
        title: "Erfaring",
        text: "Mange års praksis og certificeret uddannelse i mindfulness og meditation, forankret i både videnskab og hjertet.",
      },
      {
        _key: "hl-2",
        title: "Tilgang",
        text: "En blid og fordomsfri måde at møde dig på – enkle øvelser, du kan bruge, uanset hvor travlt livet er.",
      },
      {
        _key: "hl-3",
        title: "Vision",
        text: "At skabe et roligt fællesskab, hvor du tør lande i dig selv og finde tilbage til din egen indre balance.",
      },
    ],
    quote: {
      text: "Du behøver ikke at finde tid til at meditere – du skal blot give dig selv lov til at være til stede.",
      author: "Circle of Mindfulness",
    },
  },
  {
    _id: "offeringsPage",
    _type: "offeringsPage",
    heroKicker: "Forløb & tilbud",
    heroTitle: "Gå dybere — i dit eget tempo",
    heroSubtitle:
      "Et forløb giver dig tid og ro til at lade nærværet slå rod – skridt for skridt, med plads til netop dig.",
    intro: body("offerings-intro", [
      "Uanset om du er nybegynder eller har mediteret i årevis, er du velkommen. Vælg et forløb, der passer til dig – og giv dig selv lov til at gå roligt frem.",
    ]),
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Lad os tale sammen",
    heroSubtitle:
      "Tag dig god tid. Skriv et par ord om, hvad der fylder, så finder vi sammen ud af det næste skridt.",
    intro:
      "Du er altid velkommen til at skrive eller ringe – uanset om du har et konkret spørgsmål eller bare vil høre mere.",
    email: "kontakt@circleofmindfulness.dk",
    showForm: true,
  },
];

const author = {
  _id: AUTHOR_ID,
  _type: "author",
  name: "Circle of Mindfulness",
  slug: { _type: "slug", current: "circle-of-mindfulness" },
  role: "Mindfulness-instruktør",
  bio: "Jeg hjælper mennesker med at finde ro, nærvær og balance gennem meditation og mindfulness – i hverdagen, ikke kun på puden.",
};

const categories = [
  {
    _id: "category.meditation",
    _type: "category",
    title: "Meditation",
    slug: { _type: "slug", current: "meditation" },
    description: "Øvelser og refleksioner om meditation.",
  },
  {
    _id: "category.aandedraet",
    _type: "category",
    title: "Åndedræt",
    slug: { _type: "slug", current: "aandedraet" },
    description: "Åndedrætsøvelser, der beroliger krop og sind.",
  },
  {
    _id: "category.hverdagsro",
    _type: "category",
    title: "Hverdagsro",
    slug: { _type: "slug", current: "hverdagsro" },
    description: "Sådan finder du ro midt i en travl hverdag.",
  },
];

const posts = [
  {
    _id: "post.find-ro-i-hverdagen",
    _type: "post",
    title: "Find ro i en travl hverdag",
    slug: { _type: "slug", current: "find-ro-i-en-travl-hverdag" },
    excerpt:
      "Du behøver ikke en time på puden. Her er tre små pauser, der hjælper dig med at lande midt i det hele.",
    publishedAt: "2026-05-12T08:00:00.000Z",
    author: ref(AUTHOR_ID),
    categories: [ref("category.hverdagsro", "c1"), ref("category.meditation", "c2")],
    body: body("p1", [
      "Ro er ikke et sted, du skal nå hen – det er noget, du kan vende tilbage til, igen og igen, midt i hverdagen. Ofte tror vi, at vi skal have god tid for at meditere. Men nærvær opstår i de små mellemrum.",
      "Prøv at tage tre bevidste åndedrag, før du åbner computeren. Mærk fodsålerne mod gulvet, mens kaffen brygger. Læg mærke til himlen et øjeblik på vej ud ad døren. Det lyder enkelt – og det er det også.",
      "Når du gentager de små pauser dagligt, træner du din evne til at være til stede. Lidt efter lidt bliver roen lettere at finde, også når livet bliver travlt.",
    ]),
  },
  {
    _id: "post.aandedraet-der-beroliger",
    _type: "post",
    title: "Åndedrættet, der beroliger dit nervesystem",
    slug: { _type: "slug", current: "aandedraet-der-beroliger" },
    excerpt:
      "En enkel åndedrætsøvelse, du kan bruge når som helst, du har brug for at falde til ro.",
    publishedAt: "2026-04-28T08:00:00.000Z",
    author: ref(AUTHOR_ID),
    categories: [ref("category.aandedraet", "c1"), ref("category.meditation", "c2")],
    body: body("p2", [
      "Dit åndedræt er en genvej til ro. Når du forlænger din udånding, sender du et signal til nervesystemet om, at du er i sikkerhed – og kroppen følger med.",
      "Prøv denne: Træk vejret roligt ind gennem næsen, mens du tæller til fire. Giv så langsomt slip på luften gennem munden, mens du tæller til seks. Mærk hvordan skuldrene synker for hver udånding.",
      "Bliv ved i et par minutter. Der er ikke noget at præstere – kun at trække vejret og lægge mærke til, hvordan roen breder sig.",
    ]),
  },
];

const offerings = [
  {
    _id: "offering.8-ugers-mbsr",
    _type: "offering",
    title: "8 ugers mindfulness-forløb (MBSR)",
    slug: { _type: "slug", current: "8-ugers-mindfulness-forloeb" },
    summary:
      "Et klassisk, forskningsbaseret forløb over otte uger, hvor du lærer mindfulness fra bunden – i et roligt fællesskab.",
    price: "2.800 kr.",
    duration: "8 uger",
    format: "Fysisk",
    icon: "Sprout",
    order: 1,
    body: body("o1", [
      "Over otte uger får du en grundig introduktion til mindfulness gennem ugentlige mødegange, guidede meditationer og enkle øvelser, du kan bruge derhjemme.",
      "Forløbet bygger på MBSR (Mindfulness-Based Stress Reduction) og er for dig, der ønsker mere ro, mindre stress og en dybere forbindelse til dig selv.",
    ]),
  },
  {
    _id: "offering.intro-til-meditation",
    _type: "offering",
    title: "Introduktion til meditation",
    slug: { _type: "slug", current: "introduktion-til-meditation" },
    summary:
      "Et blidt onlineforløb over fire uger for dig, der er helt ny i meditation og gerne vil i gang i dit eget tempo.",
    price: "1.200 kr.",
    duration: "4 uger",
    format: "Online",
    icon: "Leaf",
    order: 2,
    body: body("o2", [
      "På fire uger får du de grundlæggende redskaber til en meditationspraksis: åndedræt, kropsbevidsthed og venlig opmærksomhed.",
      "Alt foregår online, så du kan deltage hjemmefra. Du får korte guidede meditationer, du kan vende tilbage til, når du har brug for dem.",
    ]),
  },
  {
    _id: "offering.privat-session",
    _type: "offering",
    title: "Privat session 1:1",
    slug: { _type: "slug", current: "privat-session" },
    summary:
      "En personlig session, hvor vi tager udgangspunkt i præcis det, du står i lige nu.",
    price: "750 kr.",
    duration: "60 min",
    format: "Hybrid",
    icon: "Heart",
    order: 3,
    body: body("o3", [
      "I en privat session arbejder vi sammen om det, der fylder hos dig – om det er stress, uro, søvn eller bare et ønske om mere nærvær.",
      "Sessionen kan foregå fysisk eller online, alt efter hvad der passer dig bedst.",
    ]),
  },
];

const cards = CARDS.map((c) => ({
  _id: `card.${c.id}`,
  _type: "card",
  body: c.text,
  duration: "3–5 min",
  order: c.id,
}));

/* ---- run ------------------------------------------------------------ */

const documents: Array<{ _id: string; _type: string; [key: string]: unknown }> =
  [...singletons, author, ...categories, ...posts, ...offerings, ...cards];

async function run() {
  let tx = client.transaction();
  for (const doc of documents) {
    tx = tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log(
    `✓ Seedede ${documents.length} dokumenter (sider, blog, forløb og ${cards.length} kort).`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
