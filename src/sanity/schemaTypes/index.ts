import { type SchemaTypeDefinition } from "sanity";

// Objects
import { blockContent } from "./objects/blockContent";
import { seo } from "./objects/seo";

// Documents
import { author } from "./documents/author";
import { card } from "./documents/card";
import { category } from "./documents/category";
import { offering } from "./documents/offering";
import { post } from "./documents/post";

// Singletons
import { aboutPage } from "./singletons/aboutPage";
import { contactPage } from "./singletons/contactPage";
import { homePage } from "./singletons/homePage";
import { offeringsPage } from "./singletons/offeringsPage";
import { siteSettings } from "./singletons/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  author,
  category,
  card,
  offering,
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  offeringsPage,
  contactPage,
  // Objects
  blockContent,
  seo,
];
