"use client";

import { motion } from "framer-motion";
import { CardData } from "@/data/cards";
import { hueFromId, noiseDataUri } from "@/lib/cardBackground";

type Props = {
  data: CardData;
  showBack: boolean;      // false = front/backside, true = reveal content
  reducedMotion: boolean;
};

function FaceLayers({ hue, variant }: { hue: number; variant: "front" | "back" }) {
  // Variant tuning: front is quieter than back
  const washAlpha = variant === "front" ? 0.08 : 0.12;
  const stripesAlpha = variant === "front" ? 0.04 : 0.06;
  const noiseAlpha = variant === "front" ? 0.04 : 0.06;
  const vignetteAlpha = variant === "front" ? 0.10 : 0.14;

  return (
    <>
      {/* Base panel color from theme (guarantees a visible surface) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl"
        style={{ backgroundColor: "var(--card)" }}
      />

      {/* Soft vignette to focus center */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(75% 65% at 50% 38%, rgba(0,0,0,${vignetteAlpha}) 0%, rgba(0,0,0,0) 60%)`,
          mixBlendMode: "soft-light",
          opacity: 1,
        }}
      />

      {/* Subtle diagonal stripes (paper-like) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            `repeating-linear-gradient(45deg, rgba(0,0,0,${stripesAlpha}) 0 12px, rgba(0,0,0,0) 12px 24px)`,
          opacity: 1,
        }}
      />

      {/* Gentle hue wash based on card id */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(180deg, hsl(${hue} 40% 60% / ${washAlpha}) 0%, transparent 100%)`,
          mixBlendMode: "soft-light",
          opacity: 1,
        }}
      />

      {/* Fine noise texture */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundImage: noiseDataUri(noiseAlpha),
          backgroundSize: "180px 180px",
          mixBlendMode: "soft-light",
          opacity: 1,
        }}
      />
    </>
  );
}

export default function Card({ data, showBack, reducedMotion }: Props) {
  const hue = hueFromId(data.id.toString());

  const shell =
    "relative w-full max-w-[680px] mx-auto rounded-xl border border-border shadow-xl";
  const inner = "relative preserve-3d perspective-1000 h-full";
  const faceBase =
    "absolute inset-0 backface-hidden rounded-xl overflow-hidden p-6 md:p-8 flex";

  return (
    <div
      className={shell}
      style={{ maxHeight: "72vh", backgroundColor: "transparent" }}
      role="group"
    >
      <div className={inner}>
        {/* FRONT: card back design */}
        <motion.div
          className={faceBase}
          style={{ transform: "rotateY(0deg)" }}
          animate={reducedMotion ? {} : { rotateY: showBack ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <FaceLayers hue={hue} variant="front" />
          <div className="relative z-10 flex-1 items-center justify-center hidden md:flex">
            <div className="text-muted-foreground tracking-widest uppercase text-sm">
              Mindfulness Cards
            </div>
          </div>
        </motion.div>

        {/* BACK: content side (no title, only text) */}
        <motion.div
          className={faceBase}
          style={{ transform: "rotateY(180deg)" }}
          animate={reducedMotion ? {} : { rotateY: showBack ? 360 : 180 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <FaceLayers hue={hue} variant="back" />
          {/* Content panel (ensures high legibility on any theme) */}
          <div className="relative z-10 flex-1 flex flex-col gap-4">
            {/* Removed the <h2> with data.title */}
            <div className="flex-1 overflow-auto">
              <p className="whitespace-pre-line leading-relaxed text-lg md:text-xl text-card-foreground">
                {data.text}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
