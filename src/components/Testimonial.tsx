"use client";

import { useState } from "react";
import { Quote } from "lucide-react";

type Props = {
  fullText: string;
  author: string;
  subline?: string; // e.g. "Forløb: 6 uger · 1:1"
};

export default function Testimonial({ fullText, author, subline }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-6 md:p-10 shadow-sm">
      {/* Decorative quote mark */}
      <div className="pointer-events-none absolute -top-10 -left-6 text-7xl md:text-9xl opacity-10">
        <Quote />
      </div>

      {/* Text wrapper with collapse */}
      <div className="relative">
        <blockquote
          className={`transition-[max-height] duration-300 overflow-hidden ${
            open ? "max-h-[2000px]" : "max-h-48 md:max-h-56"
          }`}
        >
          <p className="whitespace-pre-line text-lg md:text-2xl leading-relaxed">
            {fullText}
          </p>
        </blockquote>

        {/* Fade when collapsed */}
        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-20 bg-gradient-to-b from-transparent to-card" />
        )}
      </div>

      {/* Meta */}
      <footer className="mt-4 flex items-center gap-3 text-sm md:text-base text-muted-foreground">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-muted" />
        <div>
          <div className="font-medium text-foreground">{author}</div>
          {subline && <div>{subline}</div>}
        </div>
      </footer>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground hover:opacity-95"
      >
        {open ? "Vis mindre" : "Læs hele udtalelsen"}
      </button>
    </div>
  );
}
