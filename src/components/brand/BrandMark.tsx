import Image from "next/image";

import icon from "../../app/icon.png";
import { cn } from "@/lib/utils";

/**
 * Brand mark — the ensō circle from the site's favicon, used across cards,
 * hero accents and section dividers. Rendered as an image so it keeps its
 * own brand colors; soften it with `opacity-*` utilities where needed.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src={icon}
      alt=""
      aria-hidden
      className={cn("h-8 w-8 rounded-full", className)}
    />
  );
}
