"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Review } from "@/sanity/types";

function initials(name?: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Pixel equivalents of the collapsed `max-h-40 md:max-h-48` classes below. */
const COLLAPSED_PX = { base: 160, md: 192 };

export function Testimonial({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  // null = not measured yet. We render collapsed until measured, so long
  // quotes never flash at full height; the fade and read-more button only
  // appear once we know the quote actually overflows.
  const [clamped, setClamped] = useState<boolean | null>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const check = () => {
      const el = quoteRef.current;
      if (!el) return;
      const cap = window.matchMedia("(min-width: 768px)").matches
        ? COLLAPSED_PX.md
        : COLLAPSED_PX.base;
      // scrollHeight is the natural content height, also while clamped.
      setClamped(el.scrollHeight > cap + 8);
    };
    const raf = requestAnimationFrame(check);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", check);
    };
  }, [review.quote]);

  if (!review?.quote) return null;

  const collapsed = !open && clamped !== false;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-soft md:p-8">
      <Quote
        className="pointer-events-none absolute -left-2 -top-2 h-16 w-16 text-primary/10"
        aria-hidden
      />

      <div className="relative">
        <blockquote
          ref={quoteRef}
          className={cn(
            "overflow-hidden transition-[max-height] duration-300",
            collapsed ? "max-h-40 md:max-h-48" : "max-h-[2000px]",
          )}
        >
          <p className="whitespace-pre-line font-serif text-base leading-relaxed text-foreground/90 text-pretty md:text-lg">
            {review.quote}
          </p>
        </blockquote>
        {collapsed && clamped && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-card" />
        )}
      </div>

      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          {initials(review.author)}
        </span>
        <span>
          {review.author && (
            <span className="block font-medium text-foreground">
              {review.author}
            </span>
          )}
          {review.role && (
            <span className="block text-sm text-muted-foreground">
              {review.role}
            </span>
          )}
        </span>
      </figcaption>

      {clamped && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {open ? "Vis mindre" : "Læs hele udtalelsen"}
        </button>
      )}
    </figure>
  );
}
