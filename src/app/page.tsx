"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Background from "@/components/background/Background";
import Deck from "@/components/deck/Deck";
import Card from "@/components/deck/Card";
import Controls from "@/components/ui/Controls";
import { CARDS, CardData } from "@/data/cards";
import { shuffle } from "@/lib/shuffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "next/image";
import logo from "../../public/images/logo.png";

type Phase = "idle" | "drawing" | "revealed";

export default function Page() {
  const reducedMotion = useReducedMotion();
  const hasCards = CARDS.length > 0;

  // Shuffle once (works fine even if CARDS is empty)
  const initialOrder = useMemo(() => shuffle(CARDS.map((c) => c.id)), []);
  const [order] = useState(initialOrder);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [current, setCurrent] = useState<CardData | null>(null);

  function draw() {
    if (phase !== "idle" || !hasCards) return;
    const id = order[index];
    const data = CARDS.find((c) => c.id === id);
    if (!data) return;

    setPhase("drawing");
    const travel = reducedMotion ? 50 : 300;
    setTimeout(() => {
      setCurrent(data);
      setPhase("revealed");
    }, travel);
  }

  function drawAgain() {
    if (!hasCards) return;
    const next = index + 1;
    if (next >= order.length) {
      if (typeof window !== "undefined") window.location.reload();
      return;
    }
    setCurrent(null);
    setPhase("idle");
    setIndex(next);
  }

  // Deep-link support: /?card=id (run once on mount)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cid = params.get("card");
    if (cid) {
      const numCid = Number(cid);
      const data = CARDS.find((c) => c.id === numCid);
      if (data) {
        setCurrent(data);
        setPhase("revealed");
      }
    }
  }, []);

  const dimBackground = phase === "revealed";

  return (
    <main className="relative min-h-[100svh] flex flex-col items-center px-4">
      <Background dimmed={dimBackground} />

      {/* Header: centered title + subtitle */}
      <header className="relative w-full mx-auto pb-2">
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-semibold tracking-tight">
            Tid til en pause
          </h1>
          <p className="mt-1 text-base md:text-2xl text-muted-foreground">
            Træk et meditations kort og få 5 minutters pause
          </p>
        </div>
      </header>

      {/* Content area: extra bottom padding so footer + controls never overlap (scaled up on lg/xl) */}
      <div className="relative flex-1 w-full max-w-[960px] mx-auto flex flex-col items-center justify-center pb-20 md:pb-24">
        <AnimatePresence initial={false} mode="wait">
          {phase !== "revealed" || !current ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // fade-only to prevent layout shift
              transition={{ duration: 0.2 }}
              className="flex w-full justify-center"
            >
              <Deck onClickAction={draw} disabled={phase !== "idle"} />
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <Card data={current} showBack={true} reducedMotion={reducedMotion} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls overlayed above footer so they don't push content */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 md:bottom-12 flex justify-center z-40">
          <div className="pointer-events-auto">
            <Controls
              visible={phase === "revealed" && !!current}
              onDrawAgainAction={drawAgain}
            />
          </div>
        </div>
      </div>

      {/* Fixed footer: auto height, items anchored to bottom, safe-area padding on the bar */}
      <footer className="fixed inset-x-0 bottom-0 z-10 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto w-full px-2">
          <div className="grid grid-cols-3 items-end gap-2 pb-2 md:pb-1.5">
            {/* Left text — tiny on phones, no wrap */}
            <div className="justify-self-start min-w-0">
              <span className="block whitespace-nowrap overflow-hidden text-ellipsis leading-none text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-muted-foreground">
                Design by Millard Barakzai
              </span>
            </div>

            {/* Center text — tiny on phones, no wrap */}
            <div className="justify-self-center min-w-0">
              <span className="block whitespace-nowraps text-ellipsis leading-none text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-muted-foreground text-center">
                ©️Circle of Mindfulness 2025
              </span>
            </div>

            {/* Right logo — scale by height, keep aspect ratio, bottom-aligned */}
            <div className="justify-self-end">
              <Image
                src={logo}
                alt="Logo"
                priority
                className="h-8 sm:h-7 md:h-10 lg:h-16 xl:h-20 2xl:h-24 w-auto"
                sizes="(min-width: 1536px) 192px, (min-width: 1280px) 160px, (min-width: 1024px) 120px, (min-width: 640px) 64px, 48px"
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
