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
    <main className="relative min-h-[100svh] flex flex-col items-center justify-center px-4">
      <Background dimmed={dimBackground} />

      {/* Desktop/tablet: fixed logo in the corner */}
      <div className="hidden md:block fixed top-3 left-3 z-50">
        <Image
          src={logo}
          alt="Logo"
          priority
          className="w-20 lg:w-70 h-auto"
          sizes="(max-width: 1024px) 56px, 80px"
        />
      </div>

      <div className="w-full max-w-[960px] flex flex-col items-center">
        {/* Mobile header: logo + title aligned in one row */}
        <div className="md:hidden w-full flex items-center gap-3  mb-4">
          <Image
            src={logo}
            alt="Logo"
            priority
            className="w-24 h-auto"
            sizes="500px"
          />
          <h1 className="text-4xl font-semibold tracking-tight">Stress Fri</h1>
        </div>

        {/* Desktop/tablet title */}
        <h1 className="hidden md:block mb-4 text-7xl font-semibold tracking-tight">
          Stress Fri
        </h1>

        <AnimatePresence initial={false} mode="wait">
          {phase !== "revealed" || !current ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
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

        <Controls
          visible={phase === "revealed" && !!current}
          onDrawAgainAction={drawAgain}
        />
      </div>
    </main>
  );
}
