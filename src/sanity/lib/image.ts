import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";
import type { SanityImage } from "../types";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity image URL.
 * Accepts either a raw Sanity image source or the app's `SanityImage` type.
 * Usage: urlFor(image).width(1200).height(800).url()
 */
export function urlFor(source: SanityImageSource | SanityImage) {
  return builder.image(source as SanityImageSource);
}
