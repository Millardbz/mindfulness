import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  className,
  as: As = "h2",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
          {kicker}
        </span>
      )}
      <As
        className={cn(
          "mt-3 text-3xl font-medium tracking-tight text-balance md:text-4xl",
          As === "h1" && "text-4xl md:text-5xl",
        )}
      >
        {title}
      </As>
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          {intro}
        </p>
      )}
    </div>
  );
}
