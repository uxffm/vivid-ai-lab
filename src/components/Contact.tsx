import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
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

  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bereit, Ihre Prozesse zu <span className="text-gradient">transformieren</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lassen Sie uns gemeinsam die Kraft der KI nutzen, um Ihr Unternehmen in Frankfurt
            und darüber hinaus zum Erfolg zu führen. Kontaktieren Sie uns für eine kostenlose Beratung.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Nicht ausfüllen: <input name="bot-field" />
              </label>
            </p>
            <h3 className="text-2xl font-semibold mb-6 text-center">Senden Sie uns eine Nachricht</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input name="name" placeholder="Ihr Name" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">E-Mail</label>
              <Input type="email" name="email" placeholder="ihre.email@beispiel.de" required />
            </div>



            <div>
              <label className="block text-sm font-medium mb-2">Nachricht</label>
              <Textarea name="message" placeholder="Erzählen Sie uns von Ihrem Projekt und wie wir Ihnen helfen können..." rows={5} required />
            </div>

            <Button type="submit" className="w-full py-3" disabled={isSubmitting}>
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;