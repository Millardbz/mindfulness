import { cn } from "@/lib/utils";

/**
 * Stylised lotus motif used as the brand mark across the site
 * (cards, hero accents, section dividers). Inherits `currentColor`.
 */
export function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      {/* center petal */}
      <path
        d="M32 6c4.5 9 4.5 20 0 34-4.5-14-4.5-25 0-34Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* inner petals */}
      <path
        d="M32 40C23 33 16.5 24 14 12.5c9 2.5 15.5 11 18 27.5Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M32 40C41 33 47.5 24 50 12.5c-9 2.5-15.5 11-18 27.5Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* outer petals */}
      <path
        d="M32 42C21 38.5 11 33.5 5 25c11-2 23.5 4.5 27 17Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M32 42C43 38.5 53 33.5 59 25c-11-2-23.5 4.5-27 17Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}
