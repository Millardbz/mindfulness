"use client";

import * as React from "react";
import { Check, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-base outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-sm";

export function NewsletterForm({
  layout = "stacked",
  onSuccess,
  className,
}: {
  /** "stacked" for narrow spots (popup), "inline" for wide bands. */
  layout?: "stacked" | "inline";
  /** Called once the signup succeeded (e.g. to close the popup). */
  onSuccess?: () => void;
  className?: string;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const id = React.useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/nyhedsbrev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-2xl bg-primary/10 p-5",
          className,
        )}
        role="status"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="font-serif text-base font-medium">
            Tak for din tilmelding!
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Tjek din indbakke for at bekræfte tilmeldingen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div
        className={cn(
          "flex flex-col gap-3",
          layout === "inline" && "sm:flex-row sm:items-end",
        )}
      >
        <div className={cn(layout === "inline" && "sm:flex-1")}>
          <label
            htmlFor={`${id}-name`}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Dit navn
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </div>
        <div className={cn(layout === "inline" && "sm:flex-1")}>
          <label
            htmlFor={`${id}-email`}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Din e-mail
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "sending"}
          className={cn(layout === "stacked" && "mt-1 w-full")}
        >
          {status === "sending" ? (
            "Tilmelder…"
          ) : (
            <>
              Tilmeld <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-destructive" role="alert">
          Tilmeldingen kunne ikke gennemføres. Prøv igen om lidt.
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Du kan altid afmelde dig igen med et enkelt klik.
      </p>
    </form>
  );
}
