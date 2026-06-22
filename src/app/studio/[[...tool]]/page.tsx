import type { Metadata, Viewport } from "next";

import Studio from "./Studio";

/**
 * Embedded Sanity Studio, served at /studio.
 * The Studio config lives in the project-root `sanity.config.ts` and is loaded
 * via the "use client" boundary in ./Studio so Sanity never runs on the server.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  return <Studio />;
}
