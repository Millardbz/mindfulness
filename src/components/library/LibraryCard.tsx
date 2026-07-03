import Link from "next/link";
import { Clock, Play } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { SanityImage } from "@/components/ui/sanity-image";
import type { LibraryItemCard } from "@/sanity/types";

export function LibraryCard({ item }: { item: LibraryItemCard }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-video overflow-hidden bg-secondary/50">
        {item.thumbnail?.asset ? (
          <SanityImage
            image={item.thumbnail}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-aurora flex h-full items-center justify-center">
            <BrandMark className="h-14 w-14 opacity-50" />
          </div>
        )}

        {/* play badge */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 text-primary shadow-lift backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-6 w-6" />
          </span>
        </span>

        {item.duration && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            {item.duration}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-medium tracking-tight">
          {item.slug ? (
            <Link
              href={`/bibliotek/${item.slug}`}
              className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
            >
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        {item.summary && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Se videoen gratis
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </article>
  );
}
