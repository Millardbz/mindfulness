import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PortableText } from "@/components/portable-text/PortableText";
import { SanityImage } from "@/components/ui/sanity-image";
import { formatDate, readingMinutes } from "@/lib/format";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug?: string }[]>({
    query: postSlugsQuery,
    fallback: [],
  });

  return slugs
    .filter((item): item is { slug: string } => Boolean(item.slug))
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
    fallback: null,
  });

  if (!post) {
    return { title: "Indlæg ikke fundet" };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
    fallback: null,
  });

  if (!post) notFound();

  const author = post.author;

  return (
    <article className="py-16 md:py-24">
      <Container size="narrow">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span> Tilbage til bloggen
        </Link>

        <header className="mt-8">
          {post.categories?.length ? (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {category.title}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight text-balance break-words sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {author?.name && (
              <span className="flex items-center gap-2">
                {author.image?.asset && (
                  <SanityImage
                    image={author.image}
                    width={36}
                    height={36}
                    sizes="36px"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-foreground">
                  {author.name}
                </span>
              </span>
            )}
            {author?.name && post.publishedAt ? <span>·</span> : null}
            {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
            {post.publishedAt && post.readingTime ? <span>·</span> : null}
            {post.readingTime ? (
              <span>{readingMinutes(post.readingTime)} min læsning</span>
            ) : null}
          </div>
        </header>

        {post.mainImage?.asset && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border/70 bg-secondary/50">
            <SanityImage
              image={post.mainImage}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </div>
        )}

        <div className="mt-10">
          <PortableText value={post.body} />
        </div>

        {author?.bio && (
          <aside className="mt-14 rounded-2xl bg-secondary/40 p-6">
            <div className="flex items-start gap-4">
              {author.image?.asset && (
                <SanityImage
                  image={author.image}
                  width={56}
                  height={56}
                  sizes="56px"
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
              )}
              <div>
                {author.name && (
                  <p className="font-serif text-lg font-medium">
                    {author.name}
                  </p>
                )}
                {author.role && (
                  <p className="text-sm text-muted-foreground">{author.role}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-foreground/90 text-pretty">
                  {author.bio}
                </p>
              </div>
            </div>
          </aside>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/blog">← Tilbage til bloggen</Link>
          </Button>
          <Button asChild>
            <Link href="/kort">Træk et kort</Link>
          </Button>
        </div>
      </Container>
    </article>
  );
}
