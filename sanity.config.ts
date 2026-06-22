import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "offeringsPage",
  "contactPage",
]);

export default defineConfig({
  name: "default",
  title: "Circle of Mindfulness",
  // "/studio" for the embedded Next route; overridden to "/" for the
  // standalone hosted studio (sanity deploy) via SANITY_STUDIO_BASEPATH.
  basePath: process.env.SANITY_STUDIO_BASEPATH || "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    // Keep singletons out of the global "Create new" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // Remove create/duplicate/delete actions for singleton documents.
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : input,
  },
});
