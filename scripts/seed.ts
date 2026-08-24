/**
 * Seed Sanity with a complete, ready-to-edit Danish starting point:
 * the page singletons (already filled in), a sample author, categories,
 * blog posts, forløb og alle 23 meditationskort. Indholdet er migreret fra
 * det gamle website (circleofmindfulness.dk).
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
import {
  LEGAL_INTRO,
  LEGAL_SECTIONS,
  LEGAL_TITLE,
} from "../src/data/legal-content";
import {
  ABOUT_HERO_SUBTITLE,
  ABOUT_HERO_TITLE,
  ABOUT_HIGHLIGHTS,
  ABOUT_PARAGRAPHS,
  ABOUT_QUOTE,
  BUSINESS_REVIEWS,
  PORTRAIT_HEADING,
  PORTRAIT_PARAGRAPHS,
  REVIEWS,
} from "../src/data/site-content";
import {
  TESTIMONIAL_GROUPS,
  TESTIMONIALS_SUBTITLE,
  TESTIMONIALS_TITLE,
} from "../src/data/testimonials-content";

const client = getCliClient();

/* ---- helpers -------------------------------------------------------- */

type Block = ReturnType<typeof block>;

function block(key: string, text: string, style: "normal" | "h2" = "normal") {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-0`, text, marks: [] }],
  };
}

function body(prefix: string, paragraphs: string[]): Block[] {
  return paragraphs.map((text, i) => block(`${prefix}-${i}`, text));
}

/** Sections with optional h2 headings (used for the legal page). */
function sectionBody(
  prefix: string,
  sections: { heading?: string; paragraphs: string[] }[],
): Block[] {
  return sections.flatMap((section, i) => [
    ...(section.heading
      ? [block(`${prefix}-${i}-h`, section.heading, "h2")]
      : []),
    ...section.paragraphs.map((text, j) => block(`${prefix}-${i}-${j}`, text)),
  ]);
}

function ref(id: string, key?: string) {
  return { _type: "reference", _ref: id, ...(key ? { _key: key } : {}) };
}

const AUTHOR_ID = "author-circle";

/* ---- documents ------------------------------------------------------ */

const singletons = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Circle of Mindfulness",
    description:
      "Mindfulness, mindful yoga og healing i Ringsted. Læs med på bloggen, find et forløb, eller træk et meditationskort og giv dig selv en pause.",
    footerText:
      "Jeg kombinerer mindfulness, mindful yoga og healing i alt, hvad jeg laver – så du kan få mere ud af dit liv.",
    email: "info@circleofmindfulness.dk",
    phone: "26 53 65 58",
    address:
      "Circle of Mindfulness\nNordcentret, Benløseparken 2\n4100 Ringsted",
    cvr: "30311434",
    facebookUrl: "https://www.facebook.com/circleofmindfulness/",
    facebookGroupUrl: "https://www.facebook.com/groups/mindfulnessuniverset",
    newsletterEnabled: true,
    newsletterTitle: "Tilmeld dig nyhedsbrevet",
    newsletterText:
      "Få nyheder, tilbud og små pauser med ro – direkte i din indbakke, før alle andre.",
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroKicker: "Velkommen til ro",
    heroTitle: "Find ro, nærvær og balance i hverdagen",
    heroSubtitle:
      "Jeg kombinerer mindfulness, mindful yoga og healing – med kroppen som udgangspunkt – og hjælper dig med at få mere ud af dit liv gennem små daglige pauser og konkrete redskaber.",
    founder: {
      name: "Sonja Bomberg",
      role: "Mindfulness-instruktør, yogalærer & Reiki Mester",
      text: "Min tilgang er altid kroppen og de betingelser, den giver. Jeg er klar til at hjælpe dig med at få mere ud af dit liv.",
    },
    primaryCta: { label: "Træk et meditationskort", href: "/kort" },
    secondaryCta: { label: "Se forløb", href: "/forloeb" },
    introHeading: "Mindfulness, mindful yoga & healing",
    introBody: body("home-intro", [
      "Min tilgang i alt, hvad jeg gør, er altid kroppen og de betingelser, den giver at arbejde med. Jeg bruger og kombinerer mindfulness, mindful yoga og healing i alle mine aktiviteter – og er klar til at hjælpe dig med at få mere ud af dit liv.",
    ]),
    valueProps: [
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
    featuredOfferings: [
      ref("offering-mindful-yoga", "fo-1"),
      ref("offering-healing", "fo-2"),
      ref("offering-gruppeforloeb", "fo-3"),
    ],
    portraitSection: {
      heading: PORTRAIT_HEADING,
      body: body("home-portrait", PORTRAIT_PARAGRAPHS),
      primaryCta: { label: "Book en uforpligtende samtale", href: "/kontakt" },
      secondaryCta: { label: "Se forløb", href: "/forloeb" },
    },
    reviews: REVIEWS.map((r, i) => ({ _key: `rev-${i + 1}`, ...r })),
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
    heroTitle: ABOUT_HERO_TITLE,
    heroSubtitle: ABOUT_HERO_SUBTITLE,
    body: body("about-body", ABOUT_PARAGRAPHS),
    highlights: ABOUT_HIGHLIGHTS.map((h, i) => ({ _key: `hl-${i + 1}`, ...h })),
    quote: ABOUT_QUOTE,
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
    processTitle: "Et typisk forløb",
    processSteps: [
      {
        _key: "step-1",
        title: "Afklaring & mål",
        text: "Vi taler kort om behov, ønsker og evt. udfordringer. Vi aftaler et enkelt fokus.",
      },
      {
        _key: "step-2",
        title: "Plan & format",
        text: "Vi vælger ramme: 1:1, hold, workshop eller online. Længde og frekvens tilpasses.",
      },
      {
        _key: "step-3",
        title: "Praksis",
        text: "Guidede øvelser: åndedræt, kropsnærvær og meditationskort – med plads til spørgsmål.",
      },
      {
        _key: "step-4",
        title: "Opfølgning",
        text: "Vi runder af med en kort plan for hverdagen og evt. næste skridt.",
      },
    ],
  },
  {
    _id: "erhvervPage",
    _type: "erhvervPage",
    heroKicker: "Erhverv",
    heroTitle: "Mindfulness, der styrker trivslen på arbejdspladsen",
    heroSubtitle:
      "Stress og konstant travlhed koster – på trivsel, fokus og bundlinje. Jeg hjælper virksomheder med at skabe ro og nærvær i hverdagen gennem workshops, foredrag og forløb, der tilpasses jeres behov.",
    primaryCta: { label: "Book en uforpligtende samtale", href: "/kontakt" },
    secondaryCta: { label: "Se løsninger", href: "#loesninger" },
    introHeading: "Hvorfor mindfulness på arbejdspladsen?",
    introBody: body("erhverv-intro", [
      "Mindfulness er ikke en pause fra arbejdet – det er en træning i at være til stede i det. Forskning viser, at regelmæssig træning reducerer stress og styrker koncentration, overblik og samarbejde. Jeg kommer ud til jer med jordnære, konkrete øvelser, der passer ind i en travl arbejdsdag.",
    ]),
    benefits: [
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
    solutionsTitle: "Løsninger til jeres arbejdsplads",
    solutionsIntro:
      "Alt tilpasses jeres hverdag, ønsker og erfaring – fra et enkelt oplæg til længere forløb.",
    solutions: [
      ref("offering-virksomhedsworkshops", "sol-1"),
      ref("offering-foredrag", "sol-2"),
      ref("offering-firmaforloeb", "sol-3"),
    ],
    processTitle: "Sådan kommer vi i gang",
    processSteps: [
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
    faqTitle: "Ofte stillede spørgsmål",
    faqs: [
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
    reviews: BUSINESS_REVIEWS.map((r, i) => ({ _key: `erev-${i + 1}`, ...r })),
    ctaTitle: "Skal vi styrke trivslen hos jer?",
    ctaText:
      "Fortæl mig lidt om jeres arbejdsplads, så vender jeg tilbage med et forslag til, hvordan vi sammen skaber mere ro og fokus i hverdagen.",
    ctaButton: { label: "Kontakt mig", href: "/kontakt" },
    seo: {
      metaTitle: "Mindfulness til virksomheder",
      metaDescription:
        "Workshops, foredrag og forløb i mindfulness til arbejdspladser. Styrk trivsel, fokus og samarbejde med konkrete redskaber, der virker i en travl hverdag.",
    },
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Har du spørgsmål?",
    heroSubtitle:
      "Skriv, ring eller send en sms – så finder vi sammen ud af det næste skridt.",
    intro:
      "Du er altid velkommen til at skrive eller ringe. På hverdage kan du forvente svar inden for 24 timer – jeg bestræber mig altid på at vende tilbage hurtigst muligt.",
    email: "info@circleofmindfulness.dk",
    phone: "26 53 65 58",
    address:
      "Circle of Mindfulness\nNordcentret, Benløseparken 2\n4100 Ringsted\nIndgang udefra centret mod Benløseparken – parkering og bus 401A lige ved centret.",
    facebookUrl: "https://www.facebook.com/circleofmindfulness/",
    showForm: true,
    showMap: true,
    mapQuery: "Circle of Mindfulness, Benløseparken 2, 4100 Ringsted",
  },
  {
    _id: "testimonialsPage",
    _type: "testimonialsPage",
    heroTitle: TESTIMONIALS_TITLE,
    heroSubtitle: TESTIMONIALS_SUBTITLE,
    groups: TESTIMONIAL_GROUPS.map((group, i) => ({
      _key: `group-${i + 1}`,
      title: group.title,
      reviews: group.reviews.map((review, j) => ({
        _key: `group-${i + 1}-rev-${j + 1}`,
        ...review,
      })),
    })),
  },
  {
    _id: "libraryPage",
    _type: "libraryPage",
    heroKicker: "Gratis Materialer",
    heroTitle: "Alt det gratis – samlet ét sted",
    heroSubtitle:
      "Få et hurtigt overblik over de gratis tilbud – meditationskort, mit fællesskab på Facebook, bloggen og gratis videoer. Klik dig videre til det, du har lyst til.",
    gateTitle: "Lås videoen op – helt gratis",
    gateText:
      "Skriv dit navn og din e-mail, så får du adgang til videoen med det samme. Du tilmeldes samtidig mit nyhedsbrev, som du altid kan afmelde igen.",
    resources: [
      {
        _type: "resourceCard",
        _key: "res-kort",
        label: "Kort",
        title: "Meditationskort",
        description:
          "Træk et kort og få 3–5 minutters ro – en lille pause, når du har brug for den.",
        href: "/kort",
        external: false,
      },
      {
        _type: "resourceCard",
        _key: "res-facebook",
        label: "Fællesskab",
        title: "Facebook-gruppen",
        description:
          "Mindfulness Universet – et gratis fællesskab med inspiration, tips og små pauser.",
        href: "https://www.facebook.com/groups/mindfulnessuniverset",
        external: true,
      },
      {
        _type: "resourceCard",
        _key: "res-blog",
        label: "Blog",
        title: "Blog",
        description:
          "Ord til ro og refleksion – enkle øvelser og tanker til hverdagen.",
        href: "/blog",
        external: false,
      },
      {
        _type: "resourceCard",
        _key: "res-videoer",
        label: "Video",
        title: "Gratis videoer",
        description:
          "Guidede videoer fra KIP TV – mindful yoga, body scan og mere.",
        href: "/bibliotek/videoer",
        external: false,
      },
    ],
    videos: [
      {
        _type: "videoLink",
        _key: "kip-mindful-yoga",
        title: "Mindful yoga",
        youtubeUrl: "https://www.youtube.com/watch?v=DXVCenPMEbE",
      },
      {
        _type: "videoLink",
        _key: "kip-mindful-yoga-krop",
        title: "Mindful yoga – kontakt med kroppen",
        youtubeUrl: "https://www.youtube.com/watch?v=s7x3h1DdwTU",
      },
      {
        _type: "videoLink",
        _key: "kip-mindful-yoga-2",
        title: "Mindful yoga",
        youtubeUrl: "https://www.youtube.com/watch?v=15MOPCoOagg",
      },
      {
        _type: "videoLink",
        _key: "kip-body-scan",
        title: "Body scan",
        youtubeUrl: "https://www.youtube.com/watch?v=r2CZkKFTork",
      },
    ],
  },
  {
    _id: "legalPage",
    _type: "legalPage",
    title: LEGAL_TITLE,
    intro: LEGAL_INTRO,
    body: sectionBody("legal", LEGAL_SECTIONS),
  },
];

const libraryItems = [
  {
    _id: "library-din-styrke",
    _type: "libraryItem",
    title: "Din Styrke – guidet meditation",
    slug: { _type: "slug", current: "din-styrke" },
    summary:
      "En guidet meditation, der giver dig adgang til din indre kerne og styrke. Lyt, når du har brug for at lande i dig selv.",
    order: 1,
    videoUrl:
      "https://drive.google.com/file/d/1ulXXMuGAjeFz_VQy1wSvrYdlN2LYajtZ/view?usp=sharing",
    body: body("lib-din-styrke", [
      "Når du er til stede og stille, får du adgang til din indre kerne, din essens, din hjerte-hjerne – din indre GPS. Den kan fortælle dig, hvordan du virkelig har det, og hvad der er rigtigt for dig.",
      "Find et roligt sted, sæt dig godt til rette, og lad meditationen guide dig. Der er ikke noget at præstere – kun at trække vejret og lytte.",
    ]),
  },
];

const author = {
  _id: AUTHOR_ID,
  _type: "author",
  name: "Sonja Bomberg",
  slug: { _type: "slug", current: "sonja-bomberg" },
  role: "Mindfulness-instruktør, yogalærer & Reiki Mester",
  bio: "Jeg har skabt Circle of Mindfulness og kombinerer mindfulness, mindful yoga og healing – med kroppen som udgangspunkt – så du kan få mere ud af dit liv.",
};

const categories = [
  {
    _id: "category-meditation",
    _type: "category",
    title: "Meditation",
    slug: { _type: "slug", current: "meditation" },
    description: "Øvelser og refleksioner om meditation.",
  },
  {
    _id: "category-aandedraet",
    _type: "category",
    title: "Åndedræt",
    slug: { _type: "slug", current: "aandedraet" },
    description: "Åndedrætsøvelser, der beroliger krop og sind.",
  },
  {
    _id: "category-hverdagsro",
    _type: "category",
    title: "Hverdagsro",
    slug: { _type: "slug", current: "hverdagsro" },
    description: "Sådan finder du ro midt i en travl hverdag.",
  },
];

const posts = [
  {
    _id: "post-find-ro-i-hverdagen",
    _type: "post",
    title: "Find ro i en travl hverdag",
    slug: { _type: "slug", current: "find-ro-i-en-travl-hverdag" },
    excerpt:
      "Du behøver ikke en time på puden. Her er tre små pauser, der hjælper dig med at lande midt i det hele.",
    publishedAt: "2026-05-12T08:00:00.000Z",
    author: ref(AUTHOR_ID),
    categories: [
      ref("category-hverdagsro", "c1"),
      ref("category-meditation", "c2"),
    ],
    body: body("p1", [
      "Ro er ikke et sted, du skal nå hen – det er noget, du kan vende tilbage til, igen og igen, midt i hverdagen. Ofte tror vi, at vi skal have god tid for at meditere. Men nærvær opstår i de små mellemrum.",
      "Prøv at tage tre bevidste åndedrag, før du åbner computeren. Mærk fodsålerne mod gulvet, mens kaffen brygger. Læg mærke til himlen et øjeblik på vej ud ad døren. Det lyder enkelt – og det er det også.",
      "Når du gentager de små pauser dagligt, træner du din evne til at være til stede. Lidt efter lidt bliver roen lettere at finde, også når livet bliver travlt.",
    ]),
  },
  {
    _id: "post-aandedraet-der-beroliger",
    _type: "post",
    title: "Åndedrættet, der beroliger dit nervesystem",
    slug: { _type: "slug", current: "aandedraet-der-beroliger" },
    excerpt:
      "En enkel åndedrætsøvelse, du kan bruge når som helst, du har brug for at falde til ro.",
    publishedAt: "2026-04-28T08:00:00.000Z",
    author: ref(AUTHOR_ID),
    categories: [
      ref("category-aandedraet", "c1"),
      ref("category-meditation", "c2"),
    ],
    body: body("p2", [
      "Dit åndedræt er en genvej til ro. Når du forlænger din udånding, sender du et signal til nervesystemet om, at du er i sikkerhed – og kroppen følger med.",
      "Prøv denne: Træk vejret roligt ind gennem næsen, mens du tæller til fire. Giv så langsomt slip på luften gennem munden, mens du tæller til seks. Mærk hvordan skuldrene synker for hver udånding.",
      "Bliv ved i et par minutter. Der er ikke noget at præstere – kun at trække vejret og lægge mærke til, hvordan roen breder sig.",
    ]),
  },
];

const offerings = [
  {
    _id: "offering-mindful-yoga",
    _type: "offering",
    title: "Mindful Yoga",
    slug: { _type: "slug", current: "mindful-yoga" },
    summary:
      "En unik, blid, skånsom og langsom yogaform, der bringer nervesystemet i balance. Alle kan være med – på små hold med max 10 pladser.",
    format: "Fysisk",
    icon: "Flower2",
    order: 1,
    price: "Prøvesession 170 kr.",
    duration: "90 min",
    body: body("o-yoga", [
      "Mindful yoga er en helt unik, blid, skånsom og langsom yogaform. Det handler ikke om perfektion eller om at krænge kroppen ind i avancerede stillinger – men om at arbejde MED kroppen på de betingelser, den giver dig.",
      "Hos Circle of Mindfulness møder du et anderledes yogastudio: små hold med max 10 pladser, trygge rammer, plads til fordybelse – og healing, der understøtter dig og din krop undervejs. Der bliver taget hensyn til den enkelte, uanset hvilke udfordringer kroppen giver.",
      "Hold: mandage kl. 16.30–18.00 og onsdage kl. 8.30–10.00.",
      "Priser: Klippekort med 10 klip 1.700 kr. · Prøvesession 170 kr. Ved efterfølgende køb af klippekort refunderes din prøvesession som et ekstra klip. Med klippekortet kan du melde afbud op til 2 timer før uden at miste et klip – og skifte mellem holdtiderne, når der er plads.",
    ]),
    forWhom:
      "Alle kan være med – også dig med kroniske smerter, stress, et nervesystem i konstant alarmberedskab eller udfordringer efter hovedtraumer.",
    includes: [
      "Balance i nervesystemet",
      "Bedre indre sundhed og immunforsvar",
      "Mere styrke, fleksibilitet og mobilitet",
      "Ro i krop, sind og sjæl",
      "Små hold – max 10 pladser",
      "Healing, der understøtter dig undervejs",
    ],
  },
  {
    _id: "offering-healing",
    _type: "offering",
    title: "Healing",
    slug: { _type: "slug", current: "healing" },
    summary:
      "Reiki healing, der giver ro i krop og sind, lindrer smerter og forløser blokeringer. Læn dig tilbage og tag imod.",
    format: "Fysisk",
    icon: "HandHeart",
    order: 2,
    price: "Fra 800 kr.",
    duration: "ca. 45 min",
    body: body("o-healing", [
      "Healing er energi fra universets livskraft, der understøtter os lige der, hvor vi har brug for det – både på det fysiske og det mentale plan – uden at vi skal anstrenge os for at modtage den.",
      "Jeg er Reiki Mester og kanaliserer Reiki healing. Til en session tager vi først en kort snak om dit udgangspunkt. På briksen guider jeg dig ind i en kort meditation, så du kan slappe af og tage imod. Du modtager healing i ca. 30 minutter, og vi slutter af med en kort snak om din oplevelse.",
      "Priser: Healing (ca. 45 min) 800 kr. · Klippekort med 5 klip 3.500 kr. · Healing inkl. kortlæsning med 3 kort 997 kr. · Healing for stressramte: 60 min med guidet meditation 1.200 kr. eller forløb med 5 gange 5.400 kr.",
      "Healing kan også foregå på afstand som fjernhealing – hjemme hos dig selv, når det passer dig.",
    ]),
    forWhom:
      "Dig, der har brug for at lande, give slip og lade op – ikke mindst hvis du føler dig stresset eller udbrændt.",
    includes: [
      "Ro i kroppen og på tankerne",
      "Reduceret stress",
      "Lindring af smerter",
      "Forløsning af blokeringer",
      "Afklaring og balance i krop, sind og sjæl",
    ],
  },
  {
    _id: "offering-1-1-sessioner",
    _type: "offering",
    title: "1:1 sessioner",
    slug: { _type: "slug", current: "1-1-sessioner" },
    summary:
      "Personligt tilpassede sessioner, hvor mindfulness, åndedræt og healing kombineres efter dine behov.",
    format: "Fysisk",
    icon: "Heart",
    order: 3,
    body: body("o1", [
      "I en 1:1 session arbejder vi sammen om det, der fylder hos dig. Jeg kombinerer mindfulness, kropsnærvær og healing og giver dig konkrete redskaber – som du kan tage med hjem og bruge i hverdagen.",
    ]),
  },
  {
    _id: "offering-gruppeforloeb",
    _type: "offering",
    title: "Mindfulness",
    slug: { _type: "slug", current: "gruppeforloeb" },
    summary:
      "Forløb på små hold, hvor du lærer mindfulness-principperne og meditation fra bunden – i et trygt fællesskab.",
    format: "Fysisk",
    icon: "Users",
    order: 4,
    body: body("o2", [
      "Mindfulness er bygget op af 8 principper – en tilgang til dig selv og til livet: Beginner's Mind, ikke-bedømmelse, accept, at give slip, tålmodighed, tillid, ikke-ambition samt modstand og tiltrækning. På forløbet arbejder vi os igennem principperne med guidede meditationer og enkle øvelser til hverdagen.",
      "Vi mødes på små hold i trygge rammer, og fællesskabet gør det lettere at holde fast i din praksis.",
    ]),
  },
  {
    _id: "offering-guidede-meditationer",
    _type: "offering",
    title: "Guidede meditationer",
    slug: { _type: "slug", current: "guidede-meditationer" },
    summary:
      "Blide, jordnære øvelser – også som lydfiler du kan bruge derhjemme.",
    format: "Online",
    icon: "Waves",
    order: 5,
    body: body("o6", [
      "Når du er til stede og stille, får du adgang til din indre kerne – din essens, din indre GPS. Blide, jordnære guidede meditationer, som du kan opleve sammen med mig eller som lydfiler, du kan bruge, når det passer dig.",
    ]),
  },
  {
    _id: "offering-online-sessioner",
    _type: "offering",
    title: "Fjernhealing & online sessioner",
    slug: { _type: "slug", current: "online-sessioner" },
    summary:
      "Healing og guidede sessioner på afstand – samme ro og nærvær, hjemme hos dig selv.",
    format: "Online",
    icon: "Moon",
    order: 6,
    body: body("o4", [
      "Fjernhealing foregår hjemme hos dig: Vi aftaler et tidspunkt, du lægger dig godt til rette, og jeg sender healingen til dig på afstand. Mange oplever dyb ro og total afslapning.",
      "Online sessioner i mindfulness og meditation giver dig samme struktur og nærvær som fysiske sessioner – blot via video. Fleksibelt og nemt at passe ind i en travl hverdag.",
    ]),
  },
  {
    _id: "offering-events",
    _type: "offering",
    title: "Workshops/Events",
    slug: { _type: "slug", current: "events" },
    summary:
      "Løbende events med meditation og healing – fx gruppe-events eller en personlig veninde- eller mor/datter-dag.",
    format: "Fysisk",
    icon: "Sun",
    order: 7,
    body: body("o-events", [
      "Jeg holder løbende events, hvor meditation og healing kombineres – både som fastlagte gruppe-events og som individuelt tilrettelagte dage, fx en veninde-dag eller mor/datter-dag.",
      "Hold øje med kommende events her på siden og i min gratis Facebook-gruppe “Mindfulness Universet”, hvor nyheder og tilbud altid lander først.",
    ]),
  },
  {
    _id: "offering-aandedraets-traening",
    _type: "offering",
    title: "Åndedræts-træning",
    slug: { _type: "slug", current: "aandedraets-traening" },
    summary:
      "Enkle teknikker der regulerer nervesystemet og skaber ro i kroppen.",
    format: "Hybrid",
    icon: "Wind",
    order: 8,
    body: body("o5", [
      "Med enkle åndedrætsteknikker lærer du at regulere dit nervesystem og finde ro i kroppen – også når livet føles presset.",
    ]),
  },
  {
    _id: "offering-virksomhedsworkshops",
    _type: "offering",
    title: "Virksomhedsworkshops",
    slug: { _type: "slug", current: "virksomhedsworkshops" },
    summary:
      "Praktiske workshops med mindfulness, åndedræt og mindful yoga, der styrker trivsel, fokus og stressforebyggelse på arbejdspladsen.",
    format: "Fysisk",
    icon: "Compass",
    order: 9,
    price: "Efter aftale",
    duration: "2–3 timer",
    body: body("o3", [
      "Jeg holder praktiske workshops for arbejdspladser, der ønsker mere trivsel, fokus og stressforebyggelse. Indholdet tilpasses jeres hverdag og behov – fra korte sessioner med åndedræt og meditation til workshops med mindful yoga.",
      "Jeg har bl.a. afholdt firmasessioner for ALK og Dansk Industri – hvor tilbagemeldingen lød: “Sessionen fik rigtig god feedback hele vejen rundt.”",
    ]),
    forWhom:
      "Arbejdspladser, der vil forebygge stress og styrke trivsel og fokus – uanset om medarbejderne har prøvet mindfulness før eller ej.",
  },
  {
    _id: "offering-foredrag",
    _type: "offering",
    title: "Foredrag & inspirationsoplæg",
    slug: { _type: "slug", current: "foredrag-og-inspirationsoplaeg" },
    summary:
      "Et levende oplæg om nærvær, stress og kroppens signaler – en oplagt start på temadage og personalemøder.",
    format: "Fysisk",
    icon: "Sparkles",
    order: 10,
    price: "Efter aftale",
    duration: "ca. 1 time",
    body: body("o-foredrag", [
      "Et foredrag giver jeres medarbejdere en let og jordnær introduktion til mindfulness – hvorfor det virker, hvad forskningen viser, og hvordan små pauser kan bruges i en travl arbejdsdag. Oplægget krydres med korte øvelser, alle kan være med til.",
    ]),
    forWhom:
      "Virksomheder og organisationer, der ønsker en inspirerende og konkret introduktion til mindfulness – fx som optakt til en temadag.",
  },
  {
    _id: "offering-firmaforloeb",
    _type: "offering",
    title: "Forløb for medarbejdere",
    slug: { _type: "slug", current: "forloeb-for-medarbejdere" },
    summary:
      "Faste, korte sessioner over 6–8 uger, der giver jeres medarbejdere varige redskaber til ro og fokus.",
    format: "Hybrid",
    icon: "Brain",
    order: 11,
    price: "Efter aftale",
    duration: "6–8 uger",
    body: body("o-firmaforloeb", [
      "Et forløb strækker sig typisk over 6–8 uger med korte, ugentlige sessioner på arbejdspladsen eller online. Medarbejderne opbygger en vane med små pauser, åndedræt og kropsnærvær – og effekten vokser uge for uge.",
    ]),
    forWhom:
      "Teams og afdelinger, der vil gøre trivsel til en vane frem for et enkeltstående arrangement.",
  },
];

const cards = CARDS.map((c) => ({
  _id: `card-${c.id}`,
  _type: "card",
  body: c.text,
  duration: "3–5 min",
  order: c.id,
}));

/* ---- run ------------------------------------------------------------ */

type Doc = { _id: string; _type: string; [key: string]: unknown };

async function commit(label: string, docs: Doc[]) {
  if (!docs.length) return;
  try {
    let tx = client.transaction();
    for (const d of docs) tx = tx.createOrReplace(d);
    await tx.commit();
    console.log(`  ✓ ${label}: ${docs.length}`);
  } catch (err) {
    console.error(
      `  ✗ ${label} fejlede:`,
      err instanceof Error ? err.message : err,
    );
  }
}

async function run() {
  const cfg = client.config();
  console.log(`Seeder projekt "${cfg.projectId}" / dataset "${cfg.dataset}" …`);
  // Remove any earlier docs that used dotted ids — those aren't publicly
  // readable, because the public-read grant only covers single-segment ids.
  try {
    const removed = await client.delete({
      query:
        '*[_type in ["card","offering","post","author","category"] && !(_id in path("*"))]',
    });
    const n = removed?.results?.length ?? 0;
    if (n) console.log(`  ⌫ ryddede ${n} gamle dot-id dokumenter`);
  } catch (err) {
    console.error(
      "  ✗ oprydning fejlede:",
      err instanceof Error ? err.message : err,
    );
  }
  // Content first (so references resolve), pages (singletons) last.
  await commit("Forfatter", [author]);
  await commit("Kategorier", categories);
  await commit("Meditationskort", cards);
  await commit("Forløb", offerings);
  await commit("Blogindlæg", posts);
  await commit("Videoer (gratis bibliotek)", libraryItems);
  await commit("Sider", singletons);
  console.log("Færdig.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
