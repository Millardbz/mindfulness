/**
 * Sanity environment configuration.
 *
 * The project id defaults to the live Circle of Mindfulness project, so the
 * site and Studio work out of the box. Override any value via `.env.local`.
 * If a query fails (e.g. empty dataset), `sanityFetch` falls back to the
 * bundled Danish defaults instead of throwing.
 */

const DEFAULT_PROJECT_ID = "3s6to78r";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID;

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

/** True when a real Sanity project id is configured. */
export const isSanityConfigured =
  !!projectId && projectId !== "your-project-id";
