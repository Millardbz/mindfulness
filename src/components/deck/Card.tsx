"use client";

import { useEffect, useMemo } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { CardData } from "@/data/cards";
import { hueFromId, noiseDataUri } from "@/lib/cardBackground";

type Props = {
  data: CardData;
  showBack: boolean;       // false = show front/backside, true = reveal content
  reducedMotion: boolean;
};

function Layers({ hue }: { hue: number }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0" style={{ backgroundColor: "var(--card)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(75% 65% at 50% 38%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 60%)`, mixBlendMode: "soft-light" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: `repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 12px, rgba(0,0,0,0) 12px 24px)` }} />
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(180deg, hsl(${hue} 40% 60% / 0.12) 0%, transparent 100%)`, mixBlendMode: "soft-light" }} />
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: noiseDataUri(0.06), backgroundSize: "180px 180px", mixBlendMode: "soft-light" }} />
    </>
  );
}

export default function Card({ data, showBack, reducedMotion }: Props) {
  const hue = hueFromId(data.id);

  // Detect iOS; use flat animation there (avoids Safari 3D text bugs)
  const isIOS = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        // iPadOS sometimes says "Mac" but has touch
        ("maxTouchPoints" in navigator && (navigator as unknown as { maxTouchPoints: number }).maxTouchPoints > 1)),
    []
  );
  const flat = reducedMotion || isIOS;

  // 3D rotation motion value (used only when not flat)
  const rotation = useMotionValue(showBack ? 180 : 0);

  useEffect(() => {
    if (flat) {
      rotation.set(showBack ? 180 : 0);
      return;
    }
    const controls = animate(rotation, showBack ? 180 : 0, {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9
    });
    return () => controls.stop();
  }, [showBack, flat, rotation]);

  const lift   = useTransform(rotation, [0, 90, 180], [0, -8, 0]);
  const scale  = useTransform(rotation, [0, 90, 180], [1, 1.02, 1]);
  const shadow = useTransform(rotation, [0, 90, 180], [
    "0 10px 28px rgba(0,0,0,0.10)",
    "0 22px 55px rgba(0,0,0,0.18)",
    "0 10px 28px rgba(0,0,0,0.10)"
  ]);
  const frontOpacity3D = useTransform(rotation, [0, 60, 90], [1, 0.25, 0]);
  const backOpacity3D  = useTransform(rotation, [90, 120, 180], [0, 0.25, 1]);

  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      <motion.div className="rounded-xl border border-border shadow-xl bg-transparent" style={flat ? undefined : { boxShadow: shadow }}>
        <motion.div className="relative rounded-xl overflow-hidden h-[72vh] md:h-[78vh]" style={flat ? undefined : { y: lift, scale }}>
          {flat ? (
            // Flat path (iOS / reduced motion)
            <div className="relative h-full w-full">
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: showBack ? 0 : 1, scale: showBack ? 0.98 : 1 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div className="absolute inset-0">
                  <Layers hue={hue} />
                </div>
                <div className="relative z-10 grid h-full place-items-center p-8">
                  <div className="text-muted-foreground tracking-widest uppercase text-sm">
                    Mindfulness Cards
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: showBack ? 1 : 0, scale: showBack ? 1 : 1.02 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div className="absolute inset-0">
                  <Layers hue={hue} />
                </div>
                <div className="relative z-10 h-full flex flex-col p-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-card-foreground">
                    {data.title}
                  </h2>
                  <div className="mt-4 flex-1 overflow-auto">
                    <p className="leading-relaxed text-lg md:text-xl text-card-foreground">
                      {data.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            // 3D path (non-iOS)
            <div className="perspective-1000 h-full">
              <motion.div
                className="relative h-full w-full preserve-3d will-change-transform"
                style={{ transformStyle: "preserve-3d", rotateY: rotation, transformOrigin: "50% 50%" }}
              >
                <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(0deg)" }}>
                  <div className="absolute inset-0">
                    <Layers hue={hue} />
                  </div>
                  <motion.div className="absolute inset-0 z-10 grid place-items-center p-8" style={{ opacity: frontOpacity3D }}>
                    <div className="text-muted-foreground tracking-widest uppercase text-sm">
                      Mindfulness Cards
                    </div>
                  </motion.div>
                </div>

                <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(180deg)" }}>
                  <div className="absolute inset-0">
                    <Layers hue={hue} />
                  </div>
                  <motion.div className="absolute inset-0 z-10 flex flex-col p-8" style={{ opacity: backOpacity3D }}>
                    <h2 className="text-2xl md:text-3xl font-semibold text-card-foreground">
                      {data.title}
                    </h2>
                    <div className="mt-4 flex-1 overflow-auto">
                      <p className="leading-relaxed text-lg md:text-xl text-card-foreground">
                        {data.text}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
