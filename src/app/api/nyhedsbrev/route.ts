import { NextResponse } from "next/server";

import { subscribeToNewsletter } from "@/lib/newsletter";

const INVALID_MESSAGE = "Skriv venligst en gyldig e-mailadresse.";
const FAILED_MESSAGE =
  "Tilmeldingen kunne ikke gennemføres. Prøv igen om lidt.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const subscribed = await subscribeToNewsletter(name, email);
  if (!subscribed) {
    return NextResponse.json(
      { ok: false, error: FAILED_MESSAGE },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
