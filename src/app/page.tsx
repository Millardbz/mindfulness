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

  // a11y live region
  const [ariaMessage, setAriaMessage] = useState("");
  useEffect(() => {
    if (phase === "revealed" && current) {
      setAriaMessage(`Kort trukket: ${current.title}`);
    }
  }, [phase, current]);

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
      const data = CARDS.find((c) => c.id === cid);
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

      {/* Screen reader announcement only */}
      <div aria-live="polite" className="sr-only">
        {ariaMessage}
      </div>

      <div className="w-full max-w-[960px] flex flex-col items-center">
        {!hasCards ? (
          <div className="min-h-[40vh] grid place-items-center p-6">
            <div className="max-w-md text-center space-y-3">
              <h1 className="text-2xl font-semibold">Ingen kort fundet</h1>
              <p className="text-muted-foreground">
                Tilføj mindst ét kort i{" "}
                <code className="px-1 rounded bg-secondary">src/data/cards.ts</code>.
              </p>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </main>
  );
}
