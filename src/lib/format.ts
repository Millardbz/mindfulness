/** Format an ISO date string as Danish long date, e.g. "12. marts 2026". */
export function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Reading time in minutes, never below 1. */
export function readingMinutes(value?: number): number {
  return Math.max(1, Math.round(value ?? 0));
}

/**
 * URL-safe anchor id from a Danish heading, e.g. "Mindful Yoga" →
 * "mindful-yoga". Used for section anchors (udtalelser categories).
 */
export function anchorSlug(value?: string): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
