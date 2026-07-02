import type { QueryParams } from "@sanity/client";

import { isSanityConfigured } from "../env";
import { client } from "./client";

type SanityFetchOptions<T> = {
  query: string;
  params?: QueryParams;
  /** Cache tags for on-demand revalidation (see /api/revalidate). */
  tags?: string[];
  /**
   * Seconds before ISR revalidates. Applies even when `tags` are set, so
   * content still refreshes (at most every `revalidate`s) if the Sanity
   * webhook isn't firing. Pass `false` to opt into tag-only invalidation.
   */
  revalidate?: number | false;
  /** Returned when Sanity isn't configured yet, or a fetch fails. */
  fallback: T;
};

/**
 * Resilient Sanity fetch.
 *
 * - When no project id is configured, returns `fallback` immediately so the
 *   whole site builds and renders without any CMS connection.
 * - On a network/query error, logs and returns `fallback` instead of throwing,
 *   so a single bad query never takes down a page.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 10,
  fallback,
}: SanityFetchOptions<T>): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    return await client.fetch<T>(query, params, {
      next: {
        // Time-based fallback + on-demand tag busting. With both set, the
        // webhook (if configured) refreshes instantly, and the timer guarantees
        // content is never stale for longer than `revalidate` seconds.
        revalidate,
        tags,
      },
    });
  } catch (error) {
    console.error("[sanityFetch] query failed, using fallback:", error);
    return fallback;
  }
}
