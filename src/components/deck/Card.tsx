"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { CardData } from "@/data/cards";

type Props = {
  data: CardData;
  showBack: boolean; // false = show back-of-card, true = reveal content
  reducedMotion: boolean;
};

/**
 * Sage palette: base is light; fades to even lighter at bottom-right.
 */
const SAGE_BASE = "oklch(0.965 0.03 160)"; // light green used across the card
const SAGE_LIGHT = "oklch(0.985 0.02 160)"; // even lighter green for the fade
const SAGE_WASH  = "oklch(0.92 0.06 160 / 0.22)"; // wash over the back image

export default function Card({ data, showBack, reducedMotion }: Props) {
  // iPadOS Safari sometimes reports as "Mac" but with touch points.
  const isIOS = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" &&
          (navigator as unknown as { maxTouchPoints: number }).maxTouchPoints > 1)),
    []
  );

  const flat = reducedMotion || isIOS;

  // Rotate the wrapper (initialize at 0 so we animate on first reveal)
  const rotation = useMotionValue(0);

  useEffect(() => {
    const to = showBack ? 180 : 0;
    if (flat) {
      rotation.set(to);
      return;
    }
    const controls = animate(rotation, to, {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9,
    });
    return () => controls.stop();
  }, [showBack, flat, rotation]);

  // Subtle lift/scale/shadow during mid-flip
  const lift = useTransform(rotation, [0, 90, 180], [0, -8, 0]);
  const scale = useTransform(rotation, [0, 90, 180], [1, 1.02, 1]);
  const shadow = useTransform(rotation, [0, 90, 180], [
    "0 10px 28px rgba(0,0,0,0.10)",
    "0 22px 55px rgba(0,0,0,0.18)",
    "0 10px 28px rgba(0,0,0,0.10)",
  ]);
  const backOpacity3D = useTransform(rotation, [90, 120, 180], [0, 0.25, 1]);

  // Mobile height: front ~70vh, back ~68vh
  const mobileHeightClass = showBack ? "h-[68vh]" : "h-[70vh]";

  // Reusable diagonal gradient: top-left (base) -> bottom-right (lighter)
  const SAGE_DIAGONAL = `linear-gradient(135deg, ${SAGE_BASE} 0%, ${SAGE_LIGHT} 100%)`;

  return (
    <div className="relative w-full max-w-[500px] mx-auto [perspective:1200px]">
      <motion.div
        className="rounded-xl border border-border shadow-xl bg-transparent overflow-hidden"
        style={flat ? undefined : { boxShadow: shadow }}
      >
        {!flat ? (
          // 3D FLIP PATH
          <motion.div
            className={`relative ${mobileHeightClass} md:h-[70vh] transition-[height] duration-200 will-change-transform [transform-style:preserve-3d]`}
            style={{ rotateY: rotation, y: lift, scale }}
          >
            {/* FRONT: back-of-card image + gentle wash */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(0deg)]">
              <Image
                src="/images/card-back.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 680px) 100vw, 680px"
              />
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(180deg, ${SAGE_WASH} 0%, transparent 100%)`,
                  mixBlendMode: "soft-light",
                }}
              />
            </div>

            {/* BACK: light green base → even lighter toward bottom-right */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="absolute inset-0" style={{ background: SAGE_DIAGONAL }} />
              <motion.div className="absolute inset-0 z-10 flex flex-col p-8" style={{ opacity: backOpacity3D }}>
                {/* Top-left PNG icon */}
                <Image
                  src="/images/corner.png"
                  alt=""
                  width={40}
                  height={40}
                  className="absolute top-3 left-3 md:top-4 md:left-4 opacity-95 select-none pointer-events-none"
                />

                {/* Bottom-right flower icon (replaces CalmGlyph) */}
                <div className="absolute bottom-1 right-3 md:bottom-1 md:right-1 w-20 h-20 opacity-90 select-none pointer-events-none">
                  <Image
                    src="/images/flower-icon.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>

                {/* Body text with preserved line breaks */}
                <div className="mt-10 flex-1 overflow-auto">
                  <p className="whitespace-pre-line leading-relaxed text-lg md:text-xl text-card-foreground">
                    {data.text}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // FLAT / iOS PATH (crossfade)
          <div className={`${mobileHeightClass} md:h-[78vh] relative transition-[height] duration-200`}>
            {/* FRONT */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: showBack ? 0 : 1, scale: showBack ? 0.98 : 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Image
                src="/images/card-back.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 680px) 100vw, 680px"
              />
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(180deg, ${SAGE_WASH} 0%, transparent 100%)`,
                  mixBlendMode: "soft-light",
                }}
              />
            </motion.div>

            {/* BACK */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: showBack ? 1 : 0, scale: showBack ? 1 : 1.02 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="absolute inset-0" style={{ background: SAGE_DIAGONAL }} />
              <div className="relative z-10 h-full flex flex-col p-8">
                {/* Top-left icon */}
                <Image
                  src="/images/corner.png"
                  alt=""
                  width={40}
                  height={40}
                  className="absolute top-3 left-3 md:top-4 md:left-4 opacity-95 select-none pointer-events-none"
                />
                {/* Bottom-right flower icon */}
                <div className="absolute bottom-1 right-1 md:bottom-1 md:right-1 w-20 h-20 opacity-90 select-none pointer-events-none">
                  <Image
                    src="/images/flower-icon.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                {/* Text */}
                <div className="mt-10 flex-1 overflow-auto">
                  <p className="whitespace-pre-line leading-relaxed text-[17px] md:text-3xl text-card-foreground">
                    {data.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
