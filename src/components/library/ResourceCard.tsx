import Link from "next/link";

import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";
import type { LibraryResourceCard } from "@/sanity/types";

/**
 * An overview "box" on the Gratis Materialer page — styled like the blog
 * cards (aurora-coloured top with a label pill, then title, text and a
 * "Se mere →" link). Links internally or externally depending on `external`.
 */
export function ResourceCard({
  resource,
  className,
}: {
  resource: LibraryResourceCard;
  className?: string;
}) {
  const href = resource.href ?? "#";
  const external = resource.external === true;

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
        <div className="bg-aurora flex h-full items-center justify-center">
          <BrandMark className="h-12 w-12 opacity-40" />
        </div>
        {resource.label && (
          <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {resource.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-medium leading-snug tracking-tight text-balance transition-colors group-hover:text-primary">
          {resource.title}
        </h3>

        {resource.description && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
        )}

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Se mere
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </>
  );

  const cardClass = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cardClass}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClass}>
      {inner}
    </Link>
  );
}
