/**
 * Udtalelser — real client testimonials migrated from the previous website
 * (circleofmindfulness.dk/udtalelser). Shared between the Sanity seed, the
 * schema `initialValue` and the page fallback, so they never drift.
 */
import { TINA_REVIEW } from "./site-content";

export const TESTIMONIALS_TITLE = "Det siger andre";

export const TESTIMONIALS_SUBTITLE =
  "Ord fra mennesker og virksomheder, der har fundet mere ro, nærvær og balance hos Circle of Mindfulness.";

export type TestimonialGroup = {
  title: string;
  reviews: { quote: string; author: string; role?: string }[];
};

export const TESTIMONIAL_GROUPS: TestimonialGroup[] = [
  {
    title: "Mindfulness-forløb",
    reviews: [
      {
        quote:
          "Fik så meget inspiration, nye måder at tænke, reflektere og handle på i hverdagen. Jeg blev så meget klædt på til at gå ud i den store verden med ny relevant viden og erfaring – glæder mig vildt til at bruge det hver dag, fordi det gør en forskel for mig på mange planer. Hver dag bruger jeg koncepterne i de 8 grundprincipper, vælger nogle ud og har fokus på dem, og mediterer ca. 30 minutter pr. dag – og yderligere, når jeg er ved stranden, i haven eller finder et spot på en gåtur. Tak for at du gav mig så meget.",
        author: "Birgitte F.",
      },
    ],
  },
  {
    title: "Mindfulness & meditation",
    reviews: [
      {
        quote:
          "Det har hjulpet mig til at blive mere bevidst om det tankemylder, jeg ofte har – og det er hermed blevet nemmere at sætte på pause.",
        author: "Betinna",
      },
      {
        quote:
          "Det har hjulpet mig til at stoppe op og nyde det, der er i nuet, hvilket har givet mig mere ro i en hektisk hverdag.",
        author: "Bente",
      },
      {
        quote:
          "Jeg begyndte på meditation hos Sonja fra Circle of Mindfulness, efter at jeg havde været igennem et langt sygdomsforløb. Jeg havde brug for nogle værktøjer til at kunne finde ro og balance i min krop og sjæl. Nu 1,5 år efter har jeg fundet roen, og jeg kan trække vejret. Det at kunne gå ind i en meditativ tilstand hjælper mig meget i min hverdag – jeg bruger det bl.a. også, når jeg er til mine mange undersøgelser på hospitalet. Jeg kan varmt anbefale meditation hos Sonja fra Circle of Mindfulness.",
        author: "Kit Horlacher",
      },
    ],
  },
  {
    title: "Mindful Yoga",
    reviews: [
      {
        quote:
          "Jeg lider af PTSD og angst og har ikke haft ro et øjeblik i de sidste 6 år. Jeg fandt Circle of Mindfulness for 3 uger siden og kan bare sige, at jeg nu har fået ro på nervesystemet efter hver session. Jeg kan anbefale mindful yoga med Sonja – skønne og varme omgivelser og en yderst kompetent lærer.",
        author: "Lissie Tuekær",
      },
      {
        quote:
          "Yoga var ret nyt for mig, inden jeg startede hos Sonja. Jeg havde lidt kendskab til mindful vejrtrækning, så jeg startede, fordi jeg blev nysgerrig og fik en prøvetime! Sonja er dygtig til at kombinere den dybe vejrtrækning med yogaøvelserne. Hun vejleder roligt og præcist, når man ikke magter eller er i tvivl om øvelsen. Jeg lærte at acceptere min krops naturlige grænser, blev styrket og smidiggjort i muskler og led – og virkelig afspændt i krop og sjæl. Tak for Sonja og mindful yoga.",
        author: "Mie",
      },
      {
        quote:
          "Jeg er kronisk syg med fibromyalgi og slidgigt. Inden starten hos Sonja var jeg meget stiv i kroppen, og jeg var ofte meget ked af det. Jeg har virkelig følt mig set og hørt hos Sonja og har altid gået fra yogatimen med en succesoplevelse. Hvis det ikke er muligt at lave de øvelser, hun har lagt for programmet, hjælper hun en med at lave nogle andre, som kroppen vil være med til. At gå hos Sonja har i den grad fået min krop ud af dvalen, både fysisk og psykisk. Jeg har fået livet tilbage.",
        author: "Sanne Andreasen",
      },
      {
        quote:
          "Det er dejligt at kunne røre kroppen i et roligt tempo, hvor jeg har mulighed for at mærke mig selv og få et pusterum fra ydre stimuli. Som Sonja siger: “Det er ikke vigtigt at kunne stillingerne til perfektion – det er vigtigere at lytte til sig selv og sin krop.” Sonja er en grundig og indfølende underviser, der går op i den enkelte, selvom man undervises på hold. Jeg giver Sonja de varmeste anbefalinger.",
        author: "Camilla Rasmussen",
      },
      {
        quote:
          "Yoga hjalp efter blodprop. Efter en blodprop i hjernen i 2021 fyldte træthed og smerter rigtig meget. Sonja tilrettelagde yogaøvelser, hvor hele kroppen blev aktiveret, med hensyn til mine udfordringer. I efteråret kunne jeg arbejde på samme måde som tidligere uden at blive træt – og muskelmassen er genoprettet, faktisk bedre end før. Jeg kan kun anbefale yoga hos Circle of Mindfulness.",
        author: "Henrik Kuske Schou",
        role: "Selvstændig anlægsgartner",
      },
      {
        quote:
          "Som seniorbruger har jeg stor glæde af yoga med bl.a. styrke, balance, afslapning og vejrtrækning. Man er velkommen, selv om man har skavanker og begrænsninger – Sonja er altid klar med alternative øvelser og husker det. Alle får noget godt ud af Sonjas yoga, og man føler sig tilpas på holdet. Jeg kan kun sige: kom og prøv det.",
        author: "Irene Hemmingsen",
      },
      {
        quote:
          "Hold da op, jeg kan virkelig mærke en kæmpe god forskel fra da jeg ankom til yoga og nu bagefter. Min krop føles let og fri for spændinger, og mit sind er afstresset på allerbedste vis. Det letter mine kroniske smerter, og uanset alder og funktionsevne vil det være en gave til en selv at blive guidet gennem en bearbejdning af kroppen og efterfølgende afslapning. Tak for dig.",
        author: "Annette Von Magnus",
      },
      {
        quote:
          "Det sku' du prøve! Det er “me time” – altså fokus på dig. En god stund med god tid, stræk, fokus på vejrtrækning og fordybelse i dig selv og de muligheder, din krop har. Jeg kan ikke undvære at komme hos Sonja!",
        author: "Dorthe B.",
      },
      {
        quote:
          "Kan kun anbefales – virkelig fantastisk med en super underviser, der tilpasser efter skavanker.",
        author: "Heidi Kolze Frederiksen",
      },
      {
        quote:
          "Du har et dejligt studie og er mega dygtig, og jeg elsker din rolige yoga.",
        author: "Tina Koudal Sørensen",
      },
      {
        quote: "Mindful yoga kan kun anbefales – blid yoga for alle!",
        author: "Dorthe Braad",
      },
      {
        quote:
          "Jeg vil gerne sige tak for en rigtig god og givende undervisning.",
        author: "Marlene",
      },
    ],
  },
  {
    title: "Healing",
    reviews: [
      {
        quote: TINA_REVIEW,
        author: "Tina Hansen",
      },
      {
        quote:
          "Vil sige tusind tak for en utrolig behagelig healing i går. Jeg kunne mærke en ro og svævende følelse i kroppen. Dine hænder var meget varme – når du løftede hænderne, kunne jeg stadigvæk mærke varmen. Det føltes, som om kroppen blev pakket ind i varme. Jeg fik en ro i mit hoved, jeg ikke har mærket længe. Tak for det.",
        author: "Majbritt",
      },
      {
        quote:
          "Healing med Sonja er fantastisk. Jeg kom helt ned i gear, mærkede varme og sitren i kroppen og følte mig badet i det klareste hvide lys under hele healingen. Bagefter følte jeg en dejlig lethed i kroppen og klarhed i hovedet. Kan varmt anbefales.",
        author: "Tina Koudal Sørensen",
      },
      {
        quote:
          "Tusind tak for i dag. Det var en virkelig varm og energifyldt healing. Jeg er stadig lidt i min egen lille boble, men her er dejligt roligt og smertefrit at være – så tusind tak for dig.",
        author: "Annette Von Magnus",
      },
      {
        quote:
          "Det var en spændende oplevelse med healing. Om aftenen havde jeg det, som om jeg var meget “let”. Tak for oplevelsen.",
        author: "Birthe",
      },
    ],
  },
  {
    title: "Fjernhealing",
    reviews: [
      {
        quote:
          "En halv time med healing – en vidunderlig oplevelse. Da jeg fik sms, lagde jeg mig og koncentrerede mig om åndedrættet. Ret hurtigt oplevede jeg en ro og total afslapning, specielt omkring brystkassen. Efter fire dage, hvor corona havde slået mig helt ud, har jeg nu lavet brunch til os og føler, at jeg er tilbage på sporet. Jeg er taknemmelig og glad – kæmpe fan af, hvad du kan, Sonja.",
        author: "Dorthe Braad",
      },
    ],
  },
  {
    title: "Virksomheder",
    reviews: [
      {
        quote:
          "Sessionen fik i øvrigt rigtig god feedback hele vejen rundt, og flere sagde faktisk, at de gerne vil begynde at dyrke yoga noget mere, så godt gået.",
        author: "Alexander Moldt Nielsen",
        role: "ALK",
      },
      {
        quote: "Tak for sidst. De var rigtig glade for dit input.",
        author: "Henrik Chr. X. Wedell-Neergaard",
        role: "Dansk Industri",
      },
    ],
  },
];
