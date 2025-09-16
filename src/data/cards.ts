export type CardData = {
  id: string;
  title: string;
  text: string;
  image?: string; // filename in /public/cards, optional
};

export const CARDS: CardData[] = [
  { id: "presence", title: "Nærvær", text: "Træk vejret dybt. Læg mærke til luften ved næsen, brystet og maven. Lad tankerne passere som skyer." },
  { id: "gratitude", title: "Taknemmelighed", text: "Tænk på én lille ting i dag, du er taknemmelig for. Lad følelsen fylde dig roligt indefra." },
  { id: "release", title: "Give slip", text: "Læg mærke til, hvad du spænder i. Udånd langsomt og giv slip i kroppen, skuldre og kæbe." },
  { id: "compassion", title: "Mildhed", text: "Henvend dig til dig selv med venlighed. Gentag stille: 'Må jeg være tryg. Må jeg have ro.'" },
  { id: "anchor", title: "Anker", text: "Vælg et anker: åndedræt, lyde eller kroppen. Vend blidt tilbage til ankeret, når du driver væk." },
  { id: "slow", title: "Sænk tempoet", text: "Gør én ting langsommere: at rejse dig, at drikke vand, at svare. Giv handlingen din fulde opmærksomhed." },
  { id: "scan", title: "Kropsscanning", text: "Flyt opmærksomheden fra tæer til isse. Registrér fornemmelser uden at dømme. Bare mærk." },
  { id: "breath4", title: "4-6-åndedræt", text: "Indånd roligt til fire. Udånd blidt til seks. Gentag 6–10 gange og mærk nervesystemet falde til ro." },
  { id: "observe", title: "Observer", text: "Navngiv det, du oplever: 'tanke', 'lyd', 'fornemmelse'. Slip så navnet og vend tilbage til nuet." },
  { id: "ground", title: "Grounding", text: "Se 5 ting, mærk 4, hør 3, duft 2, smag 1. Brug sanserne til at lande her-og-nu." },
  { id: "accept", title: "Accept", text: "Tillad oplevelsen at være, som den er. Modstand skaber spænding; blid accept skaber plads." },
  { id: "kindness", title: "Venlighed", text: "Tænk på en person. Send dem en venlig tanke: 'Må du være glad. Må du være sund. Må du være i fred.'" },
  { id: "pause", title: "Pause", text: "Stop et øjeblik. Indånd… udånd… Læg mærke til hvad der sker i kroppen, når du giver dig selv pause." },
  { id: "space", title: "Indre rum", text: "Forestil dig, at du udvider et blødt rum omkring hjertet. Lad åndedrættet skabe plads." },
  { id: "note", title: "Notér", text: "Når tanken dukker op, notér 'planlægning' eller 'bekymring'. Vend blidt tilbage til vejret." },
  { id: "walk", title: "Gå-bevidsthed", text: "Gå langsomt. Læg mærke til løft, frem, ned. Lad skridtene være din meditation." },
  { id: "listen", title: "Lyt", text: "Luk øjnene og lyt til lyde nær og fjern. Ingen analyse, kun lytning." },
  { id: "heart", title: "Hjerteåndedræt", text: "Forestil dig, at du ånder ind og ud gennem hjertet. Fyld indåndingen med mildhed, udåndingen med slip." },
  { id: "soften", title: "Blødgør", text: "Find et område af spænding. Sig indeni: blødgør, løsne, give plads. Ånd ud." },
  { id: "focus", title: "Fokus", text: "Vælg én intention for de næste 10 minutter. Mind dig selv blidt om den, når du driver væk." },
  { id: "waves", title: "Bølger", text: "Se åndedrættet som bølger, der ruller ind og ud. Lad tankerne flyde som tang på vandet." },
  { id: "arrive", title: "Ankomme", text: "Sig stille: 'Jeg er her nu'. Læg mærke til kroppen, kontakten til underlaget og rummet omkring dig." },
];
