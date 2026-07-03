"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Clock } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import type { Card } from "@/sanity/types";

/**
 * A single meditation card that flips from its decorative back to the
 * instruction side when mounted. Uses an opacity face-swap (instead of
 * `backface-visibility`) so it renders reliably on iOS Safari too.
 */
export function MeditationCard({
  card,
  reducedMotion,
}: {
  card: Card;
  reducedMotion: boolean;
}) {
  const rotation = useMotionValue(reducedMotion ? 180 : 0);

  useEffect(() => {
    if (reducedMotion) {
      rotation.set(180);
      return;
    }
    const controls = animate(rotation, 180, {
      type: "spring",
      stiffness: 190,
      damping: 26,
      mass: 0.9,
    });
    return () => controls.stop();
  }, [rotation, reducedMotion]);

  const lift = useTransform(rotation, [0, 90, 180], [0, -12, 0]);
  const scale = useTransform(rotation, [0, 90, 180], [1, 1.03, 1]);
  const frontOpacity = useTransform(rotation, [0, 89, 90], [1, 1, 0]);
  const backOpacity = useTransform(rotation, [90, 91, 180], [0, 1, 1]);

  return (
    <div className="relative mx-auto w-full max-w-[420px] [perspective:1400px]">
      <motion.div
        className="relative min-h-[clamp(26rem,70svh,42rem)]"
        style={{
          rotateY: rotation,
          y: lift,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT — decorative back-of-card */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-primary/15 p-8 shadow-lift [transform:rotateY(0deg)]"
          style={{
            opacity: frontOpacity,
            background:
              "linear-gradient(160deg, var(--sage-100) 0%, var(--sage-50) 55%, var(--mist-100) 140%)",
          }}
        >
          <div className="grain absolute inset-0 rounded-[1.75rem]" />
          <BrandMark className="h-16 w-16 opacity-70" />
          <p className="mt-6 font-serif text-xl text-primary/80">
            Circle of Mindfulness
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-primary/50">
            Meditation
          </p>
        </motion.div>

        {/* BACK — instructions (counter-rotated so text stays upright) */}
        <motion.div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card p-8 shadow-lift [transform:rotateY(180deg)]"
          style={{ opacity: backOpacity }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
              {card.title || "Meditation"}
            </span>
            {card.duration && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/70 px-3 py-1 text-xs text-secondary-foreground">
                <Clock className="h-3.5 w-3.5" />
                {card.duration}
              </span>
            )}
          </div>

          <div className="mt-6 flex-1 overflow-auto pr-1">
            <p className="whitespace-pre-line font-serif text-lg leading-relaxed text-card-foreground text-pretty">
              {card.body}
            </p>
          </div>

          <BrandMark className="pointer-events-none absolute -bottom-4 -right-3 h-24 w-24 opacity-10" />
        </motion.div>
      </motion.div>
    </div>
  );
}
