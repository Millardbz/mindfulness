"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { CardData } from "@/data/cards";
import { hueFromId } from "@/lib/cardBackground";
import { CalmGlyph } from "@/components/CalmGlyphs";

type Props = {
  data: CardData;
  showBack: boolean; // false = show back-of-card, true = reveal content
  reducedMotion: boolean;
};

export default function Card({ data, showBack, reducedMotion }: Props) {
  const hue = hueFromId(data.id.toString());

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

  // A little lift/scale/shadow during mid-flip
  const lift = useTransform(rotation, [0, 90, 180], [0, -8, 0]);
  const scale = useTransform(rotation, [0, 90, 180], [1, 1.02, 1]);
  const shadow = useTransform(rotation, [0, 90, 180], [
    "0 10px 28px rgba(0,0,0,0.10)",
    "0 22px 55px rgba(0,0,0,0.18)",
    "0 10px 28px rgba(0,0,0,0.10)",
  ]);
  const backOpacity3D = useTransform(rotation, [90, 120, 180], [0, 0.25, 1]);

  return (
    <div className="relative w-full max-w-[500px] mx-auto [perspective:1200px]">
      <motion.div
        className="rounded-xl border border-border shadow-xl bg-transparent overflow-hidden"
        style={flat ? undefined : { boxShadow: shadow }}
      >
        {!flat ? (
          // 3D FLIP PATH
          <motion.div
            className="relative h-[72vh] md:h-[78vh] will-change-transform [transform-style:preserve-3d]"
            style={{ rotateY: rotation, y: lift, scale }}
          >
            {/* FRONT: back-of-card image */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(0deg)]">
              <Image
                src="/images/card-back.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 680px) 100vw, 680px"
              />
              {/* Optional: a very subtle tint/texture over the back image */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(180deg, hsl(${hue} 40% 60% / 0.08) 0%, transparent 100%)`,
                  mixBlendMode: "soft-light",
                }}
              />
            </div>

            {/* BACK: plain white content face */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="absolute inset-0 bg-white" />
              <motion.div className="absolute inset-0 z-10 flex flex-col p-8" style={{ opacity: backOpacity3D }}>
                {/* Top-right PNG icon */}
                <Image
                  src="/images/corner.png"
                  alt=""
                  width={64}
                  height={64}
                  className="absolute top-3 right-3 md:top-4 md:right-4 opacity-95 select-none pointer-events-none"
                />

                {/* Bottom-right CalmGlyph */}
                <CalmGlyph
                  glyphId={data.id}
                  className="absolute bottom-1 right-3 md:bottom-1 md:right-1 h-20 w-20 text-card-foreground/60 select-none pointer-events-none"
                />

                {/* Body text with preserved line breaks */}
                <div className="mt-14 flex-1 overflow-auto">
                  <p className="whitespace-pre-line leading-relaxed text-lg md:text-xl text-card-foreground">
                    {data.text}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // FLAT / iOS PATH (crossfade)
          <div className="relative h-[72vh] md:h-[78vh]">
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
                  background: `linear-gradient(180deg, hsl(${hue} 40% 60% / 0.08) 0%, transparent 100%)`,
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
              <div className="absolute inset-0 bg-white" />
              <div className="relative z-10 h-full flex flex-col p-8">
                <Image
                  src="/images/corner.png"
                  alt=""
                  width={64}
                  height={64}
                  className="absolute top-3 right-3 md:top-4 md:right-4 opacity-95 select-none pointer-events-none"
                />
                <CalmGlyph
                  glyphId={data.id}
                  className="absolute bottom-1 right-3 md:bottom-1 md:right-1 h-20 w-20 text-card-foreground/60 select-none pointer-events-none"
                />
                <div className="mt-14 flex-1 overflow-auto">
                  <p className="whitespace-pre-line leading-relaxed text-l md:text-3xl text-card-foreground">
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
