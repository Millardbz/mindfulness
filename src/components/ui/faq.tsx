import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Faq } from "@/sanity/types";

/**
 * Accessible FAQ accordion built on native <details>/<summary>, so it works
 * without JavaScript and needs no extra dependencies.
 */
export function FaqList({
  items,
  className,
}: {
  items: Faq[];
  className?: string;
}) {
  const faqs = items.filter((f) => f?.question);
  if (!faqs.length) return null;

  return (
    <div
      className={cn(
        "divide-y divide-border/70 rounded-2xl border border-border/70 bg-card shadow-soft",
        className,
      )}
    >
      {faqs.map((faq, i) => (
        <details key={`${faq.question}-${i}`} className="group px-6 md:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-serif text-base font-medium text-foreground transition-colors hover:text-primary md:text-lg [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-180">
              <ChevronDown className="h-4 w-4" />
            </span>
          </summary>
          {faq.answer && (
            <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
              {faq.answer}
            </p>
          )}
        </details>
      ))}
    </div>
  );
}
