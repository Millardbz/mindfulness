import { NextResponse } from "next/server";

const INVALID_MESSAGE = "Skriv venligst en gyldig e-mailadresse.";
const FAILED_MESSAGE =
  "Tilmeldingen kunne ikke gennemføres. Prøv igen om lidt.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The newsletter opt-in endpoint (Lumant), carried over from the old
 * website's signup form. Override via env if the list ever changes.
 */
const OPTIN_URL =
  process.env.NEWSLETTER_OPTIN_URL ||
  "https://e.lumant.dk/api/v1/optin/list_qAKd_lLnad/subscribe";

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

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

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: INVALID_MESSAGE },
      { status: 400 },
    );
  }

  // Forward as a classic form post, exactly like the old website's <form>.
  const params = new URLSearchParams({ name, email, submit: "" });

  try {
    const response = await fetch(OPTIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `[api/nyhedsbrev] opt-in endpoint svarede ${response.status}`,
      );
      return NextResponse.json(
        { ok: false, error: FAILED_MESSAGE },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/nyhedsbrev] opt-in request fejlede:", error);
    return NextResponse.json(
      { ok: false, error: FAILED_MESSAGE },
      { status: 502 },
    );
  }
}
