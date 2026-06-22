import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation webhook for Sanity.
 *
 * Configure a webhook in sanity.io/manage to POST here on document changes,
 * with a shared secret (sent as `?secret=` or the `x-revalidate-secret` header)
 * matching SANITY_REVALIDATE_SECRET. The document `_type` in the payload is
 * used to revalidate the matching cache tag; with no type, everything refreshes.
 */
const ALL_TAGS = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "offeringsPage",
  "contactPage",
  "post",
  "category",
  "author",
  "offering",
  "card",
];

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const provided =
    request.headers.get("x-revalidate-secret") ||
    new URL(request.url).searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json(
      { ok: false, message: "Invalid or missing secret." },
      { status: 401 },
    );
  }

  let type: string | undefined;
  try {
    const body = (await request.json()) as { _type?: string } | null;
    type = body?._type;
  } catch {
    /* empty / non-JSON body — fall through to revalidate all */
  }

  const tags = type && ALL_TAGS.includes(type) ? [type] : ALL_TAGS;
  for (const tag of tags) revalidateTag(tag, "max");

  return NextResponse.json({ ok: true, revalidated: tags });
}
