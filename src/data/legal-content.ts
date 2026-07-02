/**
 * Handelsbetingelser & privatlivspolitik — real brand content migrated from
 * the previous website. Shared between the Sanity seed, the schema
 * `initialValue` and the page fallback, so they never drift.
 */

export const LEGAL_TITLE = "Handelsbetingelser & privatlivspolitik";

export const LEGAL_INTRO =
  "Her finder du de generelle handelsbetingelser og privatlivspolitikken for tjenesteydelser og digitale produkter udbudt af Circle of Mindfulness.";

export type LegalSection = {
  heading?: string;
  paragraphs: string[];
};

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    paragraphs: [
      "For tjenesteydelser og digitale produkter udbudt af Circle of Mindfulness, Høm Byvej 11, 4100 Ringsted, CVR 30311434. Kontakt: info@circleofmindfulness.dk.",
      "EU ønsker at styrke beskyttelsen af personoplysninger med databeskyttelsesforordningen GDPR (General Data Protection Regulation). På websitet indsamles og behandles typisk følgende typer af oplysninger: unikt ID og tekniske oplysninger om din computer, tablet eller mobiltelefon, dit IP-nummer, geografiske placering og hvilke sider du viser interesse for ved at klikke på dem.",
    ],
  },
  {
    heading: "Betaling",
    paragraphs: [
      "Fysiske aktiviteter hos Circle of Mindfulness betales med MobilePay. På digitale produkter kan du anvende følgende betalingsmidler: Visa, Visa Electron, MasterCard og American Express.",
      "Ved betaling med VISA Debit og MasterCard Debit, som er debetkort, vil betalingen blive reserveret på din konto i overensstemmelse med vilkårene for dit kort, indtil vi trækker eller afviser betalingen.",
      "Alle priser er i danske kroner inkl. moms.",
    ],
  },
  {
    heading: "Køb af serviceydelser på fysiske aktiviteter",
    paragraphs: [
      "Alle fysiske aktiviteter hos Circle of Mindfulness hører under kategorien serviceydelser. Serviceydelser på fysiske aktiviteter købes via MobilePay.",
    ],
  },
  {
    heading: "Fortrydelsesret og refundering",
    paragraphs: [
      "Circle of Mindfulness' fysiske aktiviteter er serviceydelser og derfor ikke underlagt fortrydelsesret. Alle køb af fysiske aktiviteter som mindful yoga, healing, diverse events, forløb, workshops og lign. er derfor bindende fra betalingsøjeblikket, og der ydes ikke fortrydelsesret/refusion.",
      "Ved afbrydelse af igangværende aktiviteter, forløb, klippekort eller lign. fra kundens side refunderes restbeløbet ikke.",
    ],
  },
  {
    heading: "Retningslinjer for brug af klippekort",
    paragraphs: [
      "Klippekortet er gyldigt 1 år fra købsdatoen, er personligt og kan ikke overdrages til andre.",
      "Du er automatisk tilmeldt den ønskede tid, du har valgt. Du kan melde afbud op til 2 timer før aktiviteten uden at miste et klip. Du finder retningslinjerne for afbud på dit klippekort.",
    ],
  },
  {
    heading: "Aflysninger fra Circle of Mindfulness' side",
    paragraphs: [
      "I tilfælde af aflysninger fra Circle of Mindfulness' side vil kunden blive tilbudt et andet tidspunkt for aktiviteten, når der er tale om forløb eller klippekort. Ved enkeltstående arrangementer vil det være muligt at få refunderet det fulde beløb, såfremt et nyt tidspunkt for aktiviteten ikke passer kunden.",
    ],
  },
  {
    heading: "Køb af digitale produkter",
    paragraphs: [
      "Digitale produkter er online ydelser i form af forløb, workshops og lign. samt modtagelse af e-mails. Produkterne bliver leveret digitalt på en medlemsside eller via mail. Det er dit eget ansvar at gemme de mails, der indeholder vigtige informationer om adgang til de købte produkter, herunder eventuelle login-oplysninger.",
      "Produkterne kan købes med VISA og MasterCard. Dine kortoplysninger er krypterede, og Circle of Mindfulness har dermed ikke adgang til oplysningerne på dit betalingskort.",
      "De personlige oplysninger, du indtaster ved køb, opbevares sikkert og i henhold til gældende EU-lovgivning (GDPR). Såfremt du ikke ønsker at have dine oplysninger opbevaret længere, har du til enhver tid ret til at få dem slettet og få skriftlig meddelelse herom. Der gemmes ikke andre data end dem, du selv har angivet i forbindelse med dit køb, og de videregives ikke.",
      "Den mailadresse, du har indtastet i forbindelse med dit køb, bruges til at sende dig vigtige informationer vedr. dit køb, herunder faktura og oplysninger om levering. Nyhedsbreve og marketingmails sendes udelukkende, hvis du har givet dit samtykke, og kan til enhver tid afmeldes via linket i bunden af alle mails.",
    ],
  },
  {
    heading: "Abonnementer og medlemskaber",
    paragraphs: [
      "For abonnementer/medlemskaber gælder, at den angivne abonnementspris på produktsiden automatisk trækkes for hver abonnementsperiode. Kvittering for abonnementsbetalingerne tilsendes pr. mail ved hver betaling, og du modtager en bekræftelse på dit abonnement efter indgåelse af aftalen.",
      "Du kan til enhver tid opsige dit abonnement ved at logge ind på din konto og stoppe abonnementet inden den indeværende periodes udgang – eller ved at skrive til info@circleofmindfulness.dk. Opsigelsen er øjeblikkelig, og der faktureres ikke yderligere; allerede udsendte fakturaer skal dog stadig betales. Du har adgang til abonnementets indhold resten af den pågældende måned.",
    ],
  },
  {
    heading: "Levering og returret af digitale produkter",
    paragraphs: [
      "Levering af digitale produkter sker oftest få minutter efter køb.",
      "Der er 14 dages returret på alle digitale produkter, såfremt de ikke er downloadet/streamet, da dette anses for ibrugtagning. I det øjeblik de er downloadet/streamet, bortfalder fortrydelsesretten. Hvis du fortryder dit køb inden 14 dage, og materialet ikke er downloadet/streamet, skal du kontakte info@circleofmindfulness.dk.",
    ],
  },
  {
    heading: "Rettigheder",
    paragraphs: [
      "Alle rettigheder til digitale produkter, kurser, forløb, workshops, events og lign. tilhører Circle of Mindfulness. Ved køb opnås udelukkende licens til at benytte det købte produkt til privat brug. Produkter og materiale skal behandles fortroligt og må ikke deles eller videregives til tredjemand. Alt materiale er beskyttet af copyright-lovgivning og må derfor ikke deles, kopieres eller plagieres.",
    ],
  },
  {
    heading: "Kundens eget ansvar",
    paragraphs: [
      "Alle produkter og ydelser, online og fysiske aktiviteter, købes og anvendes på eget ansvar og kan ikke træde i stedet for læge- eller psykologhjælp. Alle produkter og ydelser skal således opfattes og anvendes som inspiration. Personer med fysiske og psykiske lidelser eller kroniske sygdomme bør altid konsultere en læge. Sonja Bomberg og Circle of Mindfulness kan ikke drages til ansvar for direkte eller indirekte bivirkninger, som ydelserne måtte medføre.",
    ],
  },
  {
    heading: "Cookie- og privatlivspolitik",
    paragraphs: [
      "Websitet anvender cookies, som er tekstfiler, der gemmes i din browser, når du har besøgt websitet. Cookies anvendes med henblik på at føre statistik og målrette markedsføring og annoncer til relevante modtagere, hvilket bl.a. kan forbedre brugeroplevelsen.",
      "Du har til enhver tid mulighed for at blokere og slette cookies via din egen enheds indstillinger. Du skal i den forbindelse være opmærksom på, at der kan være indhold, du ikke kan få vist, og at siden muligvis ikke fungerer optimalt.",
    ],
  },
  {
    heading: "Ansvarsbegrænsning",
    paragraphs: [
      "Der tages forbehold for prisstigninger, afgiftsændringer, udsolgte/udgåede produkter og tastefejl.",
    ],
  },
  {
    heading: "Lovvalg og værneting",
    paragraphs: [
      "Enhver tvist afgøres efter dansk ret ved de almindelige domstole.",
    ],
  },
  {
    heading: "Klageadgang",
    paragraphs: [
      "Hvis du ønsker at klage over dit køb, skal du rette henvendelse til info@circleofmindfulness.dk. Lykkes det mod forventning ikke at finde en løsning, kan du indgive en klage til de relevante nævn på området, såfremt betingelserne herfor er opfyldt.",
      "Forbrugerklagenævnet: Konkurrence- og Forbrugerstyrelsen, Carl Jacobsens Vej 35, 2500 Valby, tlf. 41 71 50 00, www.kfst.dk.",
    ],
  },
  {
    heading: "Kontaktinformation",
    paragraphs: [
      "Du er altid velkommen til at kontakte Circle of Mindfulness, hvis du har ris, ros, spørgsmål, gode idéer eller andre input, vi kan blive klogere af – vi vender tilbage hurtigst muligt.",
      "Circle of Mindfulness · CVR 30311434 · Høm Byvej 11, 4100 Ringsted · info@circleofmindfulness.dk",
    ],
  },
];
