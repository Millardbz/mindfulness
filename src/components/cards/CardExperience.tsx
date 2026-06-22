"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { shuffle } from "@/lib/shuffle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Card } from "@/sanity/types";
import { Deck } from "./Deck";
import { MeditationCard } from "./MeditationCard";

export function CardExperience({ cards }: { cards: Card[] }) {
  const reducedMotion = useReducedMotion();
  const count = cards.length;

  const initialOrder = useMemo(() => shuffle(cards.map((_, i) => i)), [cards]);
  const [order, setOrder] = useState<number[]>(initialOrder);
  const [pos, setPos] = useState(0);
  const [started, setStarted] = useState(false);
  const [drawSeq, setDrawSeq] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentIndex = order[pos] ?? 0;
  const current = cards[currentIndex];

  function draw() {
    if (!count) return;
    setStarted(true);
    setPos(0);
    setDrawSeq((s) => s + 1);
  }

  function next() {
    if (!count) return;
    setCopied(false);
    setPos((p) => {
      const np = p + 1;
      if (np >= order.length) {
        setOrder(shuffle(cards.map((_, i) => i)));
        return 0;
      }
      return np;
    });
    setDrawSeq((s) => s + 1);
  }

  async function copyLink() {
    if (!current) return;
    const url = `${window.location.origin}${window.location.pathname}?kort=${currentIndex + 1}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  // Deep link support: /kort?kort=<1-based index>. Reads a browser-only value
  // on mount to seed state — a legitimate one-time external-sync effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("kort");
    if (!raw) return;
    const j = Number(raw) - 1;
    if (Number.isInteger(j) && j >= 0 && j < count) {
      const idx = initialOrder.indexOf(j);
      setStarted(true);
      setPos(idx >= 0 ? idx : 0);
      setDrawSeq((s) => s + 1);
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!count) {
    return (
      <p className="text-center text-muted-foreground">
        Der er ingen kort endnu. Tilføj nogle i studiet.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          {!started || !current ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Deck onDraw={draw} />
            </motion.div>
          ) : (
            <motion.div
              key={`card-${drawSeq}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MeditationCard card={current} reducedMotion={reducedMotion} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {started && current && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={next} size="lg">
                <Shuffle className="h-4 w-4" />
                Træk igen
              </Button>
              <Button onClick={copyLink} variant="outline" size="lg">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
                {copied ? "Kopieret" : "Kopiér link"}
              </Button>
            </div>
            <p className="text-xs tracking-wide text-muted-foreground">
              Kort {pos + 1} af {count}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
