import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

type ContactProps = {
  heading?: string;
  paragraphs?: string[];
  note?: string;
  cta?: { text: string; href: string };
  formTitle?: string;
  placeholder?: string;
};

const Contact = ({
  heading = "Bereit, Ihre Prozesse zu transformieren?",
  paragraphs = [
    "Lassen Sie uns gemeinsam die Kraft der KI nutzen, um Ihr Unternehmen in Frankfurt und darüber hinaus zum Erfolg zu führen. Kontaktieren Sie uns für eine kostenlose Beratung.",
  ],
  note,
  cta,
  formTitle = "Senden Sie uns eine Nachricht",
  placeholder = "Erzählen Sie uns von Ihrem Projekt und wie wir Ihnen helfen können...",
}: ContactProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        window.location.href = "/thank-you";
      } else {
        alert("Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es erneut.");
      }
    } catch (error) {
      alert("Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = "block text-sm font-medium mb-2";
  return (
    <section id="contact" className="band-brand py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        <div className="lg:col-span-5">
          <h2 className="text-3xl md:text-4xl leading-tight mb-6">{heading}</h2>
          <div className="space-y-5 text-lg leading-relaxed text-foreground">
            {paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          {note && <p className="mt-5 text-foreground">{note}</p>}
          {cta && (
            <a
              href={cta.href}
              className="mt-8 inline-flex items-center rounded-md bg-primary px-7 py-4 text-lg font-semibold text-primary-foreground hover:brightness-95 transition"
            >
              {cta.text}
            </a>
          )}
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="lg:col-span-7 space-y-6"
        >
          <h3 id="contact-form" className="font-display text-2xl">{formTitle}</h3>
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Nicht ausfüllen: <input name="bot-field" />
            </label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={field} htmlFor="contact-name">Name</label>
              <Input id="contact-name" name="name" placeholder="Ihr Name" required />
            </div>
            <div>
              <label className={field} htmlFor="contact-email">E-Mail</label>
              <Input id="contact-email" type="email" name="email" placeholder="ihre.email@beispiel.de" required />
            </div>
          </div>

          <div>
            <label className={field} htmlFor="contact-message">Nachricht</label>
            <Textarea id="contact-message" name="message" placeholder={placeholder} rows={6} required />
          </div>

          <Button type="submit" className="px-8 py-6 text-lg font-semibold" disabled={isSubmitting}>
            <Send className="w-4 h-4 mr-2" aria-hidden="true" />
            {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
