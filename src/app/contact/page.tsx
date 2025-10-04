import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Kontakt – Sonja Circle" };

export default function ContactPage() {
  return (
    <section className="py-10 md:py-16 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold">Kontakt</h1>
        <p className="text-muted-foreground md:text-lg">
          Send en mail via formularen eller ring – jeg vender tilbage hurtigst muligt.
        </p>
      </div>

      <ContactForm />

      <div className="grid gap-2 md:text-lg">
        <a href="mailto:info@sonjacircle.dk" className="underline">info@sonjacircle.dk</a>
        <a href="tel:+45XXXXXXXX" className="underline">+45 XX XX XX XX</a>
      </div>

      <p className="text-sm text-muted-foreground">
        Du kan også trække et meditationskort her:{" "}
        <a href="/cards" className="underline">/cards</a>
      </p>
    </section>
  );
}
