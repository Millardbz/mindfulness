"use client";

import * as React from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-sm";

const labelClass = "block text-sm font-medium text-foreground";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-secondary/50 p-8 text-center">
        <h3 className="font-serif text-xl font-medium">Tak for din besked</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
          Jeg har modtaget din henvendelse og vender tilbage til dig hurtigst
          muligt. Pas godt på dig selv i mellemtiden.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Skriv en ny besked
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className={labelClass}>
          Navn
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className={labelClass}>
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className={labelClass}>
          Emne <span className="text-muted-foreground">(valgfrit)</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClass}>
          Besked
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          Noget gik galt, og din besked blev ikke sendt. Prøv venligst igen, eller
          skriv direkte til mig på e-mail.
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="mt-1">
        {status === "sending" ? (
          "Sender …"
        ) : (
          <>
            Send besked <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
