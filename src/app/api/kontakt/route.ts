import { NextResponse } from "next/server";

const INVALID_MESSAGE = "Udfyld venligst alle felter korrekt.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const subject = asTrimmedString(data.subject);
  const message = asTrimmedString(data.message);

  if (!name || !email || !message || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: INVALID_MESSAGE },
      { status: 400 },
    );
  }

  const payload: ContactPayload = { name, email, subject, message };
  const mailSubject = subject
    ? `Ny henvendelse: ${subject}`
    : `Ny henvendelse fra ${name}`;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (apiKey && toEmail) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      const fromEmail =
        process.env.CONTACT_FROM_EMAIL ||
        "Circle of Mindfulness <onboarding@resend.dev>";

      const text = [
        `Navn: ${payload.name}`,
        `E-mail: ${payload.email}`,
        payload.subject ? `Emne: ${payload.subject}` : null,
        "",
        payload.message,
      ]
        .filter((line) => line !== null)
        .join("\n");

      const html = `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: #2c2a26;">
          <h2 style="margin: 0 0 16px;">${escapeHtml(mailSubject)}</h2>
          <p style="margin: 0 0 4px;"><strong>Navn:</strong> ${escapeHtml(payload.name)}</p>
          <p style="margin: 0 0 4px;"><strong>E-mail:</strong> ${escapeHtml(payload.email)}</p>
          ${
            payload.subject
              ? `<p style="margin: 0 0 4px;"><strong>Emne:</strong> ${escapeHtml(payload.subject)}</p>`
              : ""
          }
          <p style="margin: 16px 0 0; white-space: pre-line;">${escapeHtml(payload.message)}</p>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: payload.email,
        subject: mailSubject,
        text,
        html,
      });

      if (error) {
        console.error("[api/kontakt] Resend error:", error);
        return NextResponse.json(
          { ok: false, error: "Beskeden kunne ikke sendes. Prøv igen senere." },
          { status: 500 },
        );
      }

      return NextResponse.json({ ok: true, delivered: true });
    } catch (error) {
      console.error("[api/kontakt] send failed:", error);
      return NextResponse.json(
        { ok: false, error: "Beskeden kunne ikke sendes. Prøv igen senere." },
        { status: 500 },
      );
    }
  }

  // No email provider configured — log the submission so the form still
  // "works" in development without delivering anything.
  console.info("[api/kontakt] submission (not delivered):", payload);
  return NextResponse.json({ ok: true, delivered: false });
}
