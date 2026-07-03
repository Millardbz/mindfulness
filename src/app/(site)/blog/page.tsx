import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/brand/BrandMark";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/container";
import { SanityImage } from "@/components/ui/sanity-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate, readingMinutes } from "@/lib/format";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsQuery } from "@/sanity/lib/queries";
import type { PostCard as PostCardType } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Refleksioner om mindfulness og meditation – ord til ro i en travl hverdag.",
};

export default async function BlogPage() {
  const posts = await sanityFetch<PostCardType[]>({
    query: allPostsQuery,
    tags: ["post"],
    fallback: [],
  });

  const hasFeatured = posts.length >= 3;
  const featured = hasFeatured ? posts[0] : null;
  const rest = hasFeatured ? posts.slice(1) : posts;
  const featuredCategory = featured?.categories?.[0]?.title;

  return (
    <>
      {/* Page header */}
      <section className="bg-aurora relative overflow-hidden">
        <Container className="py-20 md:py-28">
          <SectionHeading
            as="h1"
            align="center"
            kicker="Blog"
            title="Ord til ro"
            intro="Refleksioner, øvelser og små pauser om mindfulness og meditation – tanker, der inviterer til nærvær i hverdagen."
          />
        </Container>
      </section>

      {posts.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            {featured && (
              <article className="group relative mb-12 overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft transition-all duration-300 hover:shadow-lift md:mb-16">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="grid gap-0 md:grid-cols-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50 md:aspect-auto">
                    {featured.mainImage?.asset ? (
                      <SanityImage
                        image={featured.mainImage}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        priority
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="bg-aurora flex h-full items-center justify-center">
                        <BrandMark className="h-16 w-16 opacity-40" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center p-8 md:p-12">
                    {featuredCategory && (
                      <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {featuredCategory}
                      </span>
                    )}
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      {featured.publishedAt && (
                        <time>{formatDate(featured.publishedAt)}</time>
                      )}
                      {featured.publishedAt && featured.readingTime ? (
                        <span>·</span>
                      ) : null}
                      {featured.readingTime ? (
                        <span>
                          {readingMinutes(featured.readingTime)} min læsning
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-3 font-serif text-2xl font-medium leading-snug tracking-tight text-balance transition-colors group-hover:text-primary md:text-3xl">
                      {featured.title}
                    </h2>

                    {featured.excerpt && (
                      <p className="mt-4 line-clamp-3 leading-relaxed text-muted-foreground text-pretty">
                        {featured.excerpt}
                      </p>
                    )}

                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
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
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <section className="pb-24 md:pb-32">
          <Container size="narrow">
            <div className="flex flex-col items-center text-center">
              <BrandMark className="h-12 w-12 opacity-50" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                Der er ingen indlæg endnu — kig forbi snart.
              </p>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
