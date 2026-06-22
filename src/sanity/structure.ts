import type { StructureBuilder } from "sanity/structure";
import {
  Cog,
  FileText,
  Home,
  Info,
  Layers,
  Mail,
  Sparkles,
  Tag,
  User,
} from "lucide-react";

/**
 * Studio desk structure (in Danish), organised so a non-technical editor
 * can immediately tell where each kind of content lives.
 */

// Types we place by hand below, so they don't also appear in the auto list.
const HANDLED = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "offeringsPage",
  "contactPage",
  "post",
  "author",
  "category",
  "card",
  "offering",
];

export const structure = (S: StructureBuilder) => {
  const singleton = (
    type: string,
    title: string,
    icon: typeof Home,
  ) =>
    S.listItem()
      .title(title)
      .id(type)
      .icon(icon)
      .child(S.document().schemaType(type).documentId(type).title(title));

  return S.list()
    .title("Indhold")
    .items([
      // --- Sider (singletons) ---
      singleton("homePage", "Forside", Home),
      singleton("aboutPage", "Om mig", Info),
      singleton("contactPage", "Kontakt", Mail),

      S.divider(),

      // --- Blog ---
      S.listItem()
        .title("Blog")
        .icon(FileText)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Indlæg").icon(FileText),
              S.documentTypeListItem("category")
                .title("Kategorier")
                .icon(Tag),
              S.documentTypeListItem("author")
                .title("Forfattere")
                .icon(User),
            ]),
        ),

      // --- Forløb / Tilbud ---
      S.listItem()
        .title("Forløb & tilbud")
        .icon(Sparkles)
        .child(
          S.list()
            .title("Forløb & tilbud")
            .items([
              S.documentTypeListItem("offering")
                .title("Alle forløb")
                .icon(Sparkles),
              singleton("offeringsPage", "Forløb-siden (tekst i toppen)", FileText),
            ]),
        ),

      // --- Meditationskort ---
      S.documentTypeListItem("card").title("Meditationskort").icon(Layers),

      S.divider(),

      // --- Indstillinger ---
      singleton("siteSettings", "Indstillinger", Cog),

      // Any future, unhandled document types
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return !!id && !HANDLED.includes(id);
      }),
    ]);
};
