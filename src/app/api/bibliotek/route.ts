import { NextResponse } from "next/server";

import { subscribeToNewsletter } from "@/lib/newsletter";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";

const INVALID_MESSAGE = "Skriv venligst en gyldig e-mailadresse.";
const NOT_FOUND_MESSAGE = "Videoen findes ikke længere.";
const NOT_READY_MESSAGE = "Videoen er på vej – kig forbi igen snart.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Unlocks a library video: validates the visitor's email, signs them up for
 * the newsletter (best effort) and returns the video link, which is never
 * exposed in the page itself.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: INVALID_MESSAGE },
      { status: 400 },
    );
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const name = asTrimmedString(data.name);
  const email = asTrimmedString(data.email);
  const slug = asTrimmedString(data.slug);

  if (!slug || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: INVALID_MESSAGE },
      { status: 400 },
    );
  }

  if (!isSanityConfigured) {
    return NextResponse.json(
      { ok: false, error: NOT_READY_MESSAGE },
      { status: 503 },
    );
  }

  let item: { title?: string; url?: string } | null = null;
  try {
    item = await client.fetch(
      `*[_type == "libraryItem" && slug.current == $slug][0]{ title, "url": videoUrl }`,
      { slug },
    );
  } catch (error) {
    console.error("[api/bibliotek] Sanity-opslag fejlede:", error);
    return NextResponse.json(
      { ok: false, error: NOT_READY_MESSAGE },
      { status: 502 },
    );
  }

  if (!item) {
    return NextResponse.json(
      { ok: false, error: NOT_FOUND_MESSAGE },
      { status: 404 },
    );
  }
  if (!item.url) {
    return NextResponse.json(
      { ok: false, error: NOT_READY_MESSAGE },
      { status: 404 },
    );
  }

  // Best effort: the video is delivered even if the signup endpoint is down.
  const subscribed = await subscribeToNewsletter(name, email);
  if (!subscribed) {
    console.warn(
      `[api/bibliotek] nyhedsbrevs-tilmelding fejlede for ${email} — videoen udleveres alligevel`,
    );
  }

  return NextResponse.json({ ok: true, url: item.url });
}
