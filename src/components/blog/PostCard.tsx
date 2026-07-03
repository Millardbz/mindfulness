import Link from "next/link";

import { BrandMark } from "@/components/brand/BrandMark";
import { SanityImage } from "@/components/ui/sanity-image";
import { formatDate, readingMinutes } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PostCard as PostCardType } from "@/sanity/types";

export function PostCard({
  post,
  className,
}: {
  post: PostCardType;
  className?: string;
}) {
  const category = post.categories?.[0]?.title;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
          {post.mainImage?.asset ? (
            <SanityImage
              image={post.mainImage}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="bg-aurora flex h-full items-center justify-center">
              <BrandMark className="h-12 w-12 opacity-40" />
            </div>
          )}
          {category && (
            <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {category}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
            {post.publishedAt && post.readingTime ? <span>·</span> : null}
            {post.readingTime ? (
              <span>{readingMinutes(post.readingTime)} min læsning</span>
            ) : null}
          </div>

          <h3 className="mt-3 font-serif text-xl font-medium leading-snug tracking-tight text-balance transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Læs mere
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
