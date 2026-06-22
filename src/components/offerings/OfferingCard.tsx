import Link from "next/link";
import { ArrowRight, Clock, MapPin, Tag } from "lucide-react";

import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { OfferingCard as OfferingCardType } from "@/sanity/types";

export function OfferingCard({
  offering,
  className,
}: {
  offering: OfferingCardType;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border/70 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon name={offering.icon} className="h-6 w-6" />
      </span>

      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight">
        {offering.slug ? (
          <Link
            href={`/forloeb/${offering.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
          >
            {offering.title}
          </Link>
        ) : (
          offering.title
        )}
      </h3>

      {offering.summary && (
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {offering.summary}
        </p>
      )}

      <dl className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {offering.duration && (
          <div className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {offering.duration}
          </div>
        )}
        {offering.format && (
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {offering.format}
          </div>
        )}
        {offering.price && (
          <div className="inline-flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" /> {offering.price}
          </div>
        )}
      </dl>

      {offering.slug && (
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Læs mere
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </article>
  );
}
