import { Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { OfferingInfoBox } from "@/sanity/types";

export function OfferingInfoBoxes({ boxes }: { boxes: OfferingInfoBox[] }) {
  const visibleBoxes = boxes.filter((box) => box.intro || box.items?.length);
  if (!visibleBoxes.length) return null;

  return (
    <Container
      size={visibleBoxes.length > 2 ? "default" : "narrow"}
      className="mt-12"
    >
      <div
        className={cn(
          "grid gap-6",
          visibleBoxes.length > 1 && "sm:grid-cols-2",
          visibleBoxes.length > 2 && "lg:grid-cols-3",
        )}
      >
        {visibleBoxes.map((box, index) => (
          <section
            key={box._key}
            className={cn(
              "rounded-2xl border border-border/70 p-6",
              index % 2 === 0 ? "bg-secondary/30" : "bg-card shadow-soft",
            )}
          >
            {box.title && (
              <h2 className="font-serif text-lg font-medium">{box.title}</h2>
            )}
            {box.intro && (
              <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">
                {box.intro}
              </p>
            )}
            {!!box.items?.length && (
              <ul className="mt-3 space-y-3">
                {box.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Container>
  );
}
