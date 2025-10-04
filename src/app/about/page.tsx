export const metadata = { title: "Om – Sonja Circle" };

export default function AboutPage() {
  return (
    <section className="py-10 md:py-16 space-y-6">
      <h1 className="text-3xl md:text-5xl font-semibold">Om Sonja Circle</h1>
      <p className="text-muted-foreground md:text-lg">
        Her kan du skrive om din tilgang til mindfulness/meditation, din
        erfaring, og hvad klienter kan forvente. Hold afsnit korte og
        læsbare.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground md:text-lg">
        <li>Sessioner for private og virksomheder</li>
        <li>Workshops og forløb</li>
        <li>1:1 og gruppeforløb</li>
      </ul>
      <a
        href="/contact"
        className="inline-block rounded-lg bg-primary text-primary-foreground px-5 py-2.5 hover:opacity-90"
      >
        Kontakt mig
      </a>
    </section>
  );
}
