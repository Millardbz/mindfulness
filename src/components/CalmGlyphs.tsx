import * as React from "react";

export type GlyphProps = Omit<React.SVGProps<SVGSVGElement>, "id"> & { "data-id"?: number };

const Base: React.FC<GlyphProps> = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const Glyph1: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={1}>
    {/* soft spiral / swirl */}
    <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6c2.209 0 4-1.567 4-3.5S14.209 11 12 11s-4 1.567-4 3.5" />
  </Base>
);

export const Glyph2: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={2}>
    {/* four calm counting dots */}
    <circle cx="6" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Glyph3: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={3}>
    {/* grounded triangle */}
    <path d="M6 9h12l-6 8z" />
  </Base>
);

export const Glyph4: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={4}>
    {/* double wave */}
    <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M3 11c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
  </Base>
);

export const Glyph5: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={5}>
    {/* concentric calm rings */}
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="2.5" />
  </Base>
);

export const Glyph6: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={6}>
    {/* rounded square + still point */}
    <rect x="6.5" y="6.5" width="11" height="11" rx="3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Glyph7: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={7}>
    {/* single soft arc */}
    <path d="M5 15a7 7 0 0 1 14 0" />
  </Base>
);

export const Glyph8: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={8}>
    {/* rising dots */}
    <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Glyph9: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={9}>
    {/* off-center focus */}
    <circle cx="12" cy="12" r="5" />
    <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Glyph10: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={10}>
    {/* gentle smile arc */}
    <path d="M7 15c2 2 8 2 10 0" />
  </Base>
);

export const Glyph11: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={11}>
    {/* infinity breath */}
    <path d="M5 12c2-2 4-2 6 0s4 2 6 0" />
    <path d="M5 12c2 2 4 2 6 0s4-2 6 0" />
  </Base>
);

export const Glyph12: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={12}>
    {/* stacked pebbles */}
    <ellipse cx="12" cy="16" rx="5" ry="1.5" />
    <ellipse cx="12" cy="12.5" rx="3.5" ry="1.2" />
    <ellipse cx="12" cy="9.5" rx="2.2" ry="0.9" />
  </Base>
);

export const Glyph13: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={13}>
    {/* descending lines */}
    <line x1="6" y1="10" x2="18" y2="10" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </Base>
);

export const Glyph14: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={14}>
    {/* crescent moonline */}
    <path d="M15 6a7 7 0 1 0 0 12a5.5 5.5 0 1 1 0-12" />
  </Base>
);


export const Glyph15: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={15}>
    {/* gentle radiance */}
    <circle cx="12" cy="12" r="2" />
    <line x1="12" y1="6" x2="12" y2="8" />
    <line x1="12" y1="16" x2="12" y2="18" />
    <line x1="6" y1="12" x2="8" y2="12" />
    <line x1="16" y1="12" x2="18" y2="12" />
  </Base>
);

export const Glyph16: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={16}>
    {/* sparkle */}
    <path d="M12 7l1.5 3.5L17 12l-3.5 1.5L12 17l-1.5-3.5L7 12l3.5-1.5L12 7z" />
  </Base>
);

export const Glyph17: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={17}>
    {/* grounded triangle down */}
    <path d="M6 9l6 8 6-8H6z" />
  </Base>
);

export const Glyph18: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={18}>
    {/* dot above calm arc */}
    <path d="M6 15c2-2 10-2 12 0" />
    <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Glyph19: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={19}>
    {/* ripples */}
    <path d="M4 14c2-1 5-1 8-1s6 0 8 1" />
    <path d="M6 17c2-1 4-1 6-1s4 0 6 1" />
  </Base>
);

export const Glyph20: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={20}>
    {/* long wave */}
    <path d="M3 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
  </Base>
);

export const Glyph21: React.FC<GlyphProps> = (props) => (
<Base {...props} data-id={21}>
{/* open enso (calm circle with a small gap) */}
<path d="M12 5 A7 7 0 1 0 19 12" />
<circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
</Base>
);

export const Glyph22: React.FC<GlyphProps> = (props) => (
  <Base {...props} data-id={22}>
    {/* interlaced circles */}
    <circle cx="10" cy="12" r="3" />
    <circle cx="14" cy="12" r="3" />
  </Base>
);

export const GLYPHS = [
  Glyph1,
  Glyph2,
  Glyph3,
  Glyph4,
  Glyph5,
  Glyph6,
  Glyph7,
  Glyph8,
  Glyph9,
  Glyph10,
  Glyph11,
  Glyph12,
  Glyph13,
  Glyph14,
  Glyph15,
  Glyph16,
  Glyph17,
  Glyph18,
  Glyph19,
  Glyph20,
  Glyph21,
  Glyph22,
] as const;

export const CalmGlyph: React.FC<GlyphProps & { glyphId: number }> = ({ glyphId, ...props }) => {
  const Idx = Math.max(1, Math.min(22, Math.floor(glyphId)));
  const G = GLYPHS[Idx - 1];
  return <G {...props} data-id={Idx} />;
};

// Optional: quick mapping helper from the 22 card texts
export const CARD_TO_GLYPH_ID: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
};
