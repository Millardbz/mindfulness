"use client";

import { useEffect, useMemo } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { CardData } from "@/data/cards";
import { hueFromId, noiseDataUri } from "@/lib/cardBackground";

type Props = {
  data: CardData;
  showBack: boolean;       // false = front/backside, true = reveal content
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

  // Detect iOS: use flat animation to avoid Safari 3D text painting bugs
  const isIOS = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      // iPadOS on desktop UA sometimes reports "Mac" but supports touch
      ("maxTouchPoints" in navigator && (navigator as any).maxTouchPoints > 1 || /iPhone|iPad|iPod/.test(navigator.userAgent)),
    []
  );
  const flat = reducedMotion || isIOS;

  /** ---------- Motion values for 3D path (non-iOS) ---------- **/
  const rotation = useMotionValue(showBack ? 180 : 0);

  useEffect(() => {
    if (flat) {
      // snap states in flat mode
      rotation.set(showBack ? 180 : 0);
      return;
    }
    const controls = animate(rotation, showBack ? 180 : 0, {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9,
    });
    return () => controls.stop();
  }, [showBack, flat, rotation]);

  const lift   = useTransform(rotation, [0, 90, 180], [0, -8, 0]);
  const scale  = useTransform(rotation, [0, 90, 180], [1, 1.02, 1]);
  const shadow = useTransform(rotation, [0, 90, 180], [
    "0 10px 28px rgba(0,0,0,0.10)",
    "0 22px 55px rgba(0,0,0,0.18)",
    "0 10px 28px rgba(0,0,0,0.10)",
  ]);
  const frontOpacity3D = useTransform(rotation, [0, 60, 90], [1, 0.25, 0]);
  const backOpacity3D  = useTransform(rotation, [90, 120, 180], [0, 0.25, 1]);

  /** ---------- Render ---------- **/
  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      <motion.div className="rounded-xl border border-border shadow-xl bg-transparent" style={{ boxShadow: flat ? undefined : shadow }}>
        {/* Give the card a real, fixed height so content never collapses */}
        <motion.div
          className="relative rounded-xl overflow-hidden h-[72vh] md:h-[78vh]"
          style={flat ? undefined : { y: lift, scale }}
        >
          {/* FLAT PATH (iOS or reduced motion): cross-fade + slight scale */}
          {flat ? (
            <div className="relative h-full w-full">
              {/* FRONT (stacked) */}
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

              {/* BACK (stacked) */}
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
            // 3D PATH (non-iOS): spring rotateY
            <div className="perspective-1000 h-full">
              <motion.div
                className="relative h-full w-full preserve-3d will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d" as any,
                  rotateY: rotation,
                  transformOrigin: "50% 50%",
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: "rotateY(0deg)", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0">
                    <Layers hue={hue} />
                  </div>
                  <motion.div className="absolute inset-0 z-10 grid place-items-center p-8" style={{ opacity: frontOpacity3D }}>
                    <div className="text-muted-foreground tracking-widest uppercase text-sm">
                      Mindfulness Cards
                    </div>
                  </motion.div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: "rotateY(180deg)", WebkitBackfaceVisibility: "hidden" }}
                >
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
