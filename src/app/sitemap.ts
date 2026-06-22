import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { offeringSlugsQuery, postSlugsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/forloeb",
    "/kort",
    "/om",
    "/kontakt",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [posts, offerings] = await Promise.all([
    sanityFetch<{ slug: string }[]>({
      query: postSlugsQuery,
      tags: ["post"],
      fallback: [],
    }),
    sanityFetch<{ slug: string }[]>({
      query: offeringSlugsQuery,
      tags: ["offering"],
      fallback: [],
    }),
  ]);

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const offeringRoutes: MetadataRoute.Sitemap = offerings
    .filter((o) => o.slug)
    .map((o) => ({
      url: `${base}/forloeb/${o.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...postRoutes, ...offeringRoutes];
}
