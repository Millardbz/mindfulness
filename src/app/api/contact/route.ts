import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, subject, message, honey } = await req.json();

    // simple validation
    if (honey) return NextResponse.json({ ok: true }); // bot caught
    if (!email || !subject || !message) {
      return NextResponse.json({ error: "Mangler felter" }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "onboarding@resend.dev",
      to: process.env.CONTACT_TO ?? "info@sonjacircle.dk",
      replyTo: email,
      subject: `[Kontaktformular] ${subject}`,
      text: `Fra: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Serverfejl" }, { status: 500 });
  }
}
