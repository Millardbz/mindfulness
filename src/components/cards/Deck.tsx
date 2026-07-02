"use client";

import { motion } from "framer-motion";

import { LotusMark } from "@/components/brand/LotusMark";

const SAGE_BACK =
  "linear-gradient(160deg, var(--sage-100) 0%, var(--sage-50) 55%, var(--mist-100) 140%)";

/** Clickable stack of cards that invites the visitor to draw one. */
export function Deck({
  onDraw,
  disabled,
}: {
  onDraw: () => void;
  disabled?: boolean;
}) {
  const layers = [0, 1, 2, 3];

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <motion.button
        type="button"
        onClick={onDraw}
        disabled={disabled}
        aria-label="Træk et kort"
        className="relative block min-h-[clamp(26rem,70svh,42rem)] w-full rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        whileHover={disabled ? undefined : { y: -4 }}
        whileTap={disabled ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {layers.map((i) => (
          <div
            key={i}
            className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-primary/15 shadow-lift"
            style={{
              transform: `translate(${i * 5}px, ${i * 7}px)`,
              zIndex: 40 - i,
              background: SAGE_BACK,
            }}
          >
            {i === 0 && (
              <div className="grain absolute inset-0 flex flex-col items-center justify-center rounded-[1.75rem] p-8">
                <LotusMark className="h-16 w-16 text-primary/70" />
                <p className="mt-6 font-serif text-xl text-primary/80">
                  Circle of Mindfulness
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-primary/50">
                  Meditation
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Draw label */}
        <span className="absolute bottom-7 left-1/2 z-50 -translate-x-1/2">
          <motion.span
            className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lift"
            animate={disabled ? { scale: 1 } : { scale: [1, 1.05, 1] }}
            transition={
              disabled
                ? undefined
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            Træk et kort
          </motion.span>
        </span>
      </motion.button>
    </div>
  );
}
