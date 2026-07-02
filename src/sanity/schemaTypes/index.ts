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
import { erhvervPage } from "./singletons/erhvervPage";
import { homePage } from "./singletons/homePage";
import { legalPage } from "./singletons/legalPage";
import { offeringsPage } from "./singletons/offeringsPage";
import { siteSettings } from "./singletons/siteSettings";
import { testimonialsPage } from "./singletons/testimonialsPage";

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
  erhvervPage,
  testimonialsPage,
  contactPage,
  legalPage,
  // Objects
  blockContent,
  seo,
];
