"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  onClickAction: () => void;
  disabled?: boolean;
};

/**
 * Deck stack sized like the Card, using the shared back image.
 * No per-layer scaling to avoid jitter when exiting.
 */
export default function Deck({ onClickAction, disabled }: Props) {
  const layers = [0, 1, 2, 3, 4, 5];

  return (
    <div className="relative w-full max-w-[500px] h-[72vh] md:h-[78vh]">
      <motion.button
        type="button"
        onClick={onClickAction}
        disabled={disabled}
        aria-label="Træk et kort"
        className="absolute inset-0 w-full h-full rounded-xl outline-none"
        whileTap={!disabled ? { scale: 0.985 } : undefined}
        style={{ willChange: "transform" }}
      >
        {layers.map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-xl border border-border shadow-xl overflow-hidden bg-card will-change-transform"
            style={{ top: i * 6, left: i * 6, transform: "translateZ(0)" }}
          >
            {/* Back-of-card image fills each stacked card */}
            <Image
              src="/images/card-back.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 680px) 100vw, 680px"
              priority={i === layers.length - 1}
            />
          </div>
        ))}

        {/* Center label — high-contrast pill */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-[74%] -translate-x-1/2 -translate-y-1/2
                       px-4 py-2 rounded-full shadow-lg ring-1 bg-black/80 text-white ring-white/20
                       md:px-5 md:py-2.5"
          >
            <motion.span
              animate={!disabled ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={!disabled ? { duration: 1.2, repeat: Infinity, repeatType: "loop" } : undefined}
              className="text-base md:text-lg font-semibold tracking-wide"
            >
              Tryk for at trække
            </motion.span>
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}
