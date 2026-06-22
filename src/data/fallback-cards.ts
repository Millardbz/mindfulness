import type { Card } from "@/sanity/types";
import { CARDS } from "./cards";

/**
 * The bundled 23 meditation cards, mapped to the shared `Card` shape.
 * Used when Sanity isn't configured yet, or returns no cards.
 * (These are also the seed content — see scripts/seed-cards.ndjson.)
 */
export const FALLBACK_CARDS: Card[] = CARDS.map((c) => ({
  _id: `local-${c.id}`,
  body: c.text,
  order: c.id,
  duration: "3–5 min",
}));
