import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Public, published content is served from the CDN for speed.
  useCdn: true,
  perspective: "published",
});
