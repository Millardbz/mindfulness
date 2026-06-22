import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Fetch fresh from the API and let Next.js's data cache (revalidate + tags
  // in sanityFetch) handle caching. Avoids stale Sanity-CDN reads.
  useCdn: false,
  perspective: "published",
});
