"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STORAGE_KEY = "com-nyhedsbrev";
/** How long a dismissal keeps the popup away. */
const DISMISS_DAYS = 21;
/** Show after this delay … */
const SHOW_DELAY_MS = 9000;
/** … or once the visitor has scrolled this far, whichever comes first. */
const SHOW_SCROLL_RATIO = 0.6;

type Stored = { dismissedAt?: number; subscribed?: boolean };

function readStored(): Stored {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Stored;
  } catch {
    return {};
  }
}

function writeStored(value: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* private mode etc. — the popup just shows again next visit */
  }
}

export function NewsletterPopup({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The library pages have their own email gate — don't double up.
  const suppressed = pathname.startsWith("/bibliotek");

  useEffect(() => {
    const stored = readStored();
    if (stored.subscribed) return;
    if (
      stored.dismissedAt &&
      Date.now() - stored.dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000
    ) {
      return;
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      cleanup();
      setVisible(true);
    };
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * SHOW_SCROLL_RATIO) show();
    };
    const timer = setTimeout(show, SHOW_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    writeStored({ ...readStored(), dismissedAt: Date.now() });
  };

  const handleSuccess = () => {
    writeStored({ subscribed: true });
    // Leave the thank-you note readable, then slide away.
    closeTimer.current = setTimeout(() => setVisible(false), 4500);
  };

  return (
    <AnimatePresence>
      {visible && !suppressed && (
        <motion.aside
          initial={
            reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }
          }
          animate={
            reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
          }
          exit={
            reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
          }
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          role="dialog"
          aria-label={title}
          className="fixed inset-x-4 bottom-4 z-40 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[24rem]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-card p-6 shadow-lift">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24"
              style={{
                background:
                  "radial-gradient(120% 140% at 80% 0%, var(--sage-100), transparent 70%)",
              }}
            />

            <button
              type="button"
              onClick={dismiss}
              aria-label="Luk"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BrandMark className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-serif text-xl font-medium tracking-tight">
                {title}
              </h2>
              {text && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {text}
                </p>
              )}
              <NewsletterForm
                layout="stacked"
                onSuccess={handleSuccess}
                className="mt-4"
              />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
