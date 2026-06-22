"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SanityImage } from "@/components/ui/sanity-image";
import { cn } from "@/lib/utils";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type GalleryImage = SanityImageType & { caption?: string };

export function Gallery({ images }: { images?: GalleryImage[] }) {
  const valid = (images ?? []).filter((im) => im?.asset);
  const [index, setIndex] = useState(0);
  if (!valid.length) return null;

  const current = valid[Math.min(index, valid.length - 1)];
  const go = (dir: number) =>
    setIndex((i) => (i + dir + valid.length) % valid.length);

  return (
    <figure className="mt-8">
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/70 bg-secondary/40">
        <SanityImage
          image={current}
          fill
          sizes="(min-width: 768px) 720px, 100vw"
        />

        {valid.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Forrige billede"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-soft backdrop-blur transition hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Næste billede"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-soft backdrop-blur transition hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur">
              {index + 1} / {valid.length}
            </span>
          </>
        )}
      </div>

      {valid.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {valid.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Gå til billede ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-2 bg-primary/25",
              )}
            />
          ))}
        </div>
      )}

      {current.caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {current.caption}
        </figcaption>
      )}
    </figure>
  );
}
