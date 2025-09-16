"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

type Props = { dimmed?: boolean };

export default function Background({ dimmed }: Props) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Soft gradient using your CSS vars */}
      <motion.div
        aria-hidden
        className={clsx(
          "absolute inset-0 transition-opacity",
          dimmed ? "opacity-80" : "opacity-100"
        )}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, oklch(0.98 0 0) 0%, transparent 60%), linear-gradient(180deg, oklch(1 0 0) 0%, oklch(0.98 0 0) 100%)",
        }}
      />
      {/* Subtle grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.15'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />
      {/* Very slow floating blobs (reduced-motion safe) */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 h-64 w-64 rounded-full"
        style={{ background: "oklch(0.98 0 0)" }}
        initial={{ opacity: 0.4, y: 0 }}
        animate={{ opacity: dimmed ? 0.25 : 0.4, y: 12 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
}
