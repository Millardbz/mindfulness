"use client";

import * as React from "react";
import { Check, Clock, ExternalLink, Lock, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { youtubeId } from "@/lib/youtube";

const STORAGE_KEY = "com-bibliotek";
/** The newsletter popup's storage key — a gate signup counts as subscribed. */
const NEWSLETTER_KEY = "com-nyhedsbrev";

type Stored = { name?: string; email?: string };

function readStored(): Stored {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Stored;
  } catch {
    return {};
  }
}

function writeStored(value: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    // Suppress the newsletter popup for visitors who signed up here.
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify({ subscribed: true }));
  } catch {
    /* private mode etc. — they simply type their email again next time */
  }
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-base outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-sm";

type Status = "locked" | "unlocking" | "error" | "unlocked";

export function VideoGate({
  slug,
  hasVideo,
  gateTitle,
  gateText,
}: {
  slug: string;
  hasVideo: boolean;
  gateTitle: string;
  gateText?: string;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("locked");
  const [url, setUrl] = React.useState<string | null>(null);
  const id = React.useId();

  const unlock = React.useCallback(
    async (payload: Stored, silent: boolean) => {
      setStatus("unlocking");
      try {
        const response = await fetch("/api/bibliotek", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, ...payload }),
        });
        const data = (await response.json()) as { url?: string };
        if (!response.ok || !data.url) {
          setStatus(silent ? "locked" : "error");
          return;
        }
        writeStored(payload);
        setUrl(data.url);
        setStatus("unlocked");
      } catch {
        setStatus(silent ? "locked" : "error");
      }
    },
    [slug],
  );

  // Returning visitors who already left their email get the video directly.
  // (Scheduled as a task so no state is set synchronously in the effect.)
  React.useEffect(() => {
    if (!hasVideo) return;
    const stored = readStored();
    if (!stored.email) return;
    const timer = setTimeout(() => void unlock(stored, true), 0);
    return () => clearTimeout(timer);
  }, [hasVideo, unlock]);

  if (!hasVideo) {
    return (
      <div className="rounded-3xl border border-border/70 bg-secondary/40 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Clock className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-serif text-xl font-medium">
          Videoen er på vej
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
          Denne video er ikke klar endnu. Kig forbi igen snart – eller tilmeld
          dig nyhedsbrevet, så hører du om det først.
        </p>
      </div>
    );
  }

  if (status === "unlocked" && url) {
    const embedId = youtubeId(url);
    return (
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        {embedId ? (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${embedId}`}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : null}
        <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-4 w-4" />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Videoen er låst op til dig. God fornøjelse – og husk at trække
              vejret.
            </p>
          </div>
          <Button asChild variant={embedId ? "outline" : "default"}>
            <a href={url} target="_blank" rel="noreferrer">
              {embedId ? "Åbn på YouTube" : "Åbn videoen"}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-soft md:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-serif text-xl font-medium tracking-tight">
            {gateTitle}
          </h2>
          {gateText && (
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              {gateText}
            </p>
          )}
        </div>
      </div>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          void unlock({ name, email }, false);
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="sm:flex-1">
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
          <div className="sm:flex-1">
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
          <Button type="submit" disabled={status === "unlocking"}>
            {status === "unlocking" ? (
              "Låser op…"
            ) : (
              <>
                Se videoen <Play className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {status === "error" && (
          <p className="mt-3 text-sm text-destructive" role="alert">
            Videoen kunne ikke låses op. Tjek din e-mail, og prøv igen.
          </p>
        )}

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Du tilmeldes samtidig nyhedsbrevet og kan altid afmelde dig igen med
          et enkelt klik.
        </p>
      </form>
    </div>
  );
}
