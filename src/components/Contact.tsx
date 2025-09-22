import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): string | null => {
    if (!firstName.trim()) return "Bitte Vornamen eingeben.";
    if (!lastName.trim()) return "Bitte Nachnamen eingeben.";
    if (!email.trim()) return "Bitte E-Mail eingeben.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Bitte eine gültige E-Mail-Adresse eingeben.";
    if (!message.trim()) return "Bitte eine Nachricht eingeben.";
    return null;
  };

  const netlifyMode = (import.meta.env.PUBLIC_USE_NETLIFY_FORMS as string | undefined) === 'true';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (netlifyMode) {
      // Let Netlify capture the submission via HTML form post
      (event.target as HTMLFormElement).submit();
      return;
    }

    // If no Netlify, try PHP endpoint on Hostinger
    if (!import.meta.env.PUBLIC_FORMSPREE_ID) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`/contact.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, company, message, page: typeof window !== "undefined" ? window.location.href : undefined }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.ok === false) {
          throw new Error(data.error || `HTTP ${response.status}`);
        }
        toast.success("Danke! Wir melden uns in Kürze.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompany("");
        setMessage("");
      } catch (err) {
        toast.error("Senden fehlgeschlagen. Bitte später erneut versuchen.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const formspreeId = import.meta.env.PUBLIC_FORMSPREE_ID as string | undefined;
    if (!formspreeId) {
      toast.error("Formular nicht konfiguriert. Setzen Sie PUBLIC_FORMSPREE_ID oder PUBLIC_USE_NETLIFY_FORMS=true.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          company,
          message,
          page: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submit failed: ${response.status}`);
      }

      toast.success("Danke! Wir melden uns in Kürze.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (error) {
      toast.error("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bereit, Ihr Marketing zu <span className="text-gradient">transformieren</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lassen Sie uns gemeinsam die Kraft der KI nutzen, um Ihr Unternehmen in Frankfurt 
            und darüber hinaus zum Erfolg zu führen. Kontaktieren Sie uns für eine kostenlose Beratung.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            name={netlifyMode ? "contact" : undefined}
            method={netlifyMode ? "POST" : undefined}
            {...(netlifyMode ? ({ 'data-netlify': 'true' } as any) : {})}
            netlify-honeypot={netlifyMode ? "bot-field" : undefined}
            action={netlifyMode ? "/thank-you" : undefined}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {netlifyMode && (
              <>
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="form-source" value="website" />
                <p className="hidden">
                  <label>
                    Nicht ausfüllen: <input name="bot-field" />
                  </label>
                </p>
              </>
            )}
            <h3 className="text-2xl font-semibold mb-6 text-center">Senden Sie uns eine Nachricht</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vorname</label>
                <Input
                  name="firstName"
                  placeholder="Ihr Vorname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nachname</label>
                <Input
                  name="lastName"
                  placeholder="Ihr Nachname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">E-Mail</label>
              <Input
                type="email"
                name="email"
                placeholder="ihre.email@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unternehmen</label>
              <Input
                name="company"
                placeholder="Ihr Unternehmen"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nachricht</label>
              <Textarea
                name="message"
                placeholder="Erzählen Sie uns von Ihrem Projekt und wie wir Ihnen helfen können..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
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