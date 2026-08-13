import { Play } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { youtubeId } from "@/lib/youtube";
import type { LibraryVideoLink } from "@/sanity/types";

/**
 * A public "Gratis Materialer" card that links straight to a YouTube video
 * (KIP TV). Uses the YouTube thumbnail when the URL is a valid video link,
 * with a BrandMark fallback otherwise.
 */
export function MaterialCard({ video }: { video: LibraryVideoLink }) {
  const id = youtubeId(video.youtubeUrl);
  const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;

  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-video overflow-hidden bg-secondary/50">
        {thumb ? (
          // Plain <img>: YouTube thumbnails aren't Sanity assets, so they
          // don't go through next/image (which is limited to cdn.sanity.io).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-medium tracking-tight transition-colors group-hover:text-primary">
          {video.title}
        </h3>
        {video.description && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {video.description}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Se på YouTube
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </a>
  );
}
