import {
  PortableText as PT,
  type PortableTextComponents,
} from "@portabletext/react";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";

import { Gallery } from "@/components/portable-text/Gallery";
import { SanityImage } from "@/components/ui/sanity-image";
import { cn } from "@/lib/utils";
import type { SanityImage as SanityImageType } from "@/sanity/types";

function youtubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/,
  );
  return m?.[1] ?? null;
}

const calloutTone: Record<string, string> = {
  sage: "border-primary/20 bg-primary/[0.07]",
  clay: "border-accent/30 bg-accent/15",
  neutral: "border-border bg-secondary/50",
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 leading-relaxed text-foreground/90 first:mt-0 text-pretty">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-serif text-2xl font-medium tracking-tight md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 font-serif text-xl font-medium tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-7 font-serif text-lg font-medium tracking-tight">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-7 border-l-2 border-primary/40 pl-5 font-serif text-xl italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-foreground/90 marker:text-primary/60">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-foreground/90 marker:text-primary/70">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    highlight: ({ children }) => (
      <mark className="rounded bg-accent/30 px-1 py-0.5 text-foreground">
        {children}
      </mark>
    ),
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link
            href={href}
            className="font-medium text-primary underline underline-offset-4 break-words hover:text-primary/80"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline underline-offset-4 break-words hover:text-primary/80"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImageType & { caption?: string };
      if (!image?.asset) return null;
      return (
        <figure className="mt-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/70">
            <SanityImage
              image={image}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
            />
          </div>
          {image.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {image.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    gallery: ({ value }) => {
      const v = value as { images?: (SanityImageType & { caption?: string })[] };
      return <Gallery images={v.images} />;
    },
    callout: ({ value }) => {
      const v = value as { tone?: string; title?: string; text?: string };
      return (
        <div
          className={cn(
            "mt-8 rounded-2xl border p-6",
            calloutTone[v.tone ?? "sage"] ?? calloutTone.sage,
          )}
        >
          {v.title && (
            <p className="font-serif text-lg font-medium">{v.title}</p>
          )}
          {v.text && (
            <p
              className={cn(
                "leading-relaxed text-foreground/90 text-pretty",
                v.title && "mt-2",
              )}
            >
              {v.text}
            </p>
          )}
        </div>
      );
    },
    youtube: ({ value }) => {
      const id = youtubeId((value as { url?: string }).url);
      if (!id) return null;
      return (
        <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border/70">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title="YouTube-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      );
    },
  },
};

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="text-[1.0625rem] [overflow-wrap:anywhere]">
      <PT value={value} components={components} />
    </div>
  );
}
