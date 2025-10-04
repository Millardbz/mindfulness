"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const [form, setForm] = useState({ email: "", subject: "", message: "", honey: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      setForm({ email: "", subject: "", message: "", honey: "" });
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
      {/* honeypot (hidden from humans) */}
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        value={form.honey}
        onChange={(e)=>setForm({ ...form, honey: e.target.value })}
        className="hidden"
        aria-hidden="true"
      />

      <label className="grid gap-1">
        <span className="text-sm text-muted-foreground">Din e-mail</span>
        <input
          type="email"
          required
          placeholder="din@email.dk"
          value={form.email}
          onChange={(e)=>setForm({ ...form, email: e.target.value })}
          className="rounded-lg border bg-card px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-muted-foreground">Emne</span>
        <input
          type="text"
          required
          placeholder="Hvad drejer det sig om?"
          value={form.subject}
          onChange={(e)=>setForm({ ...form, subject: e.target.value })}
          className="rounded-lg border bg-card px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-muted-foreground">Besked</span>
        <textarea
          required
          rows={6}
          placeholder="Skriv din besked her…"
          value={form.message}
          onChange={(e)=>setForm({ ...form, message: e.target.value })}
          className="rounded-lg border bg-card px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <button
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-primary-foreground hover:opacity-95 disabled:opacity-60"
      >
        {status === "sending" ? "Sender…" : "Send besked"}
      </button>

      <p role="status" className="text-sm">
        {status === "ok" && <span className="text-green-700">Tak! Din besked er sendt.</span>}
        {status === "err" && <span className="text-red-700">Noget gik galt. Prøv igen.</span>}
      </p>
    </form>
  );
}
