// src/lib/cardBackground.ts

// Tiny hash → 0..359 hue. Stable per card id.
export function hueFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

// Noise layer as SVG data URI (very faint)
export function noiseDataUri(opacity = 0.06): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <filter id="n" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#n)" opacity="${opacity}"/>
</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

/**
 * Builds a layered CSS background (front/back share the same language but different emphasis).
 * We keep opacity extremely low so the text remains the hero.
 */
export function buildCardLayers(hue: number, variant: "front" | "back") {
  // Subtle paper lines
  const stripes =
    "repeating-linear-gradient(45deg, color-mix(in oklch, var(--card) 96%, black 4%) 0 12px, transparent 12px 24px)";

  // Soft wash colored by hue (ultra faint)
  const wash =
    `linear-gradient(180deg, hsl(${hue} 30% 60% / ${variant === "front" ? 0.06 : 0.08}) 0%, transparent 100%)`;

  // Gentle vignette / spotlight to draw attention to center
  const vignette =
    `radial-gradient(80% 70% at 50% 40%, color-mix(in oklch, var(--card) 98%, black 2%) 0%, transparent 60%)`;

  const noise = noiseDataUri(variant === "front" ? 0.04 : 0.06);

  // Order matters: top-most first
  const backgroundImage = [noise, wash, stripes, vignette].join(", ");
  const backgroundBlendMode = "soft-light, normal, normal, normal";
  const backgroundSize = ["180px 180px", "auto", "auto", "auto"].join(", ");

  return { backgroundImage, backgroundBlendMode, backgroundSize };
}
