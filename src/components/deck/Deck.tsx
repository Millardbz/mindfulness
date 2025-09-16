"use client";

import { motion } from "framer-motion";

type Props = {
  onClickAction: () => void;
  disabled?: boolean;
};

/**
 * Deck stack sized exactly like the Card:
 * - width: w-full max-w-[680px]
 * - height: h-[72vh] md:h-[78vh]
 * The outer wrapper owns the size; the button fills it.
 */
export default function Deck({ onClickAction, disabled }: Props) {
  const layers = [0, 1, 2, 3, 4, 5];

  return (
    <div className="relative w-full max-w-[680px] h-[72vh] md:h-[78vh]">
      <button
        type="button"
        onClick={onClickAction}
        disabled={disabled}
        aria-label="Træk et kort"
        className="absolute inset-0 w-full h-full rounded-xl"
      >
        {layers.map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl border border-border bg-card shadow-xl"
            style={{ top: i * 6, left: i * 6 }}
            initial={{ scale: 1 }}
            animate={{ scale: disabled ? 0.99 : 1 }}
            transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse" }}
          />
        ))}

        {/* Center label */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="px-3 py-1.5 rounded-md text-sm text-muted-foreground bg-background/60 backdrop-blur-sm border border-border">
            Tryk for at trække
          </div>
        </div>
      </button>
    </div>
  );
}
