import { useState, useEffect } from 'react';

export default function ExitNewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('exitPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    if (!email) return;

    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'Exit Popup'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);

        // Close popup after 2 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-card border border-border rounded-2xl max-w-md w-full mx-4 p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Schließen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2 text-foreground">
          Nie wieder wichtige KI News verpassen
        </h2>

        {/* Description */}
        <p className="text-center text-muted-foreground mb-6">
          Erhalten Sie die neuesten Insights zu KI-Marketing, Automatisierung und innovativen Tools direkt in Ihr Postfach.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Ihre E-Mail-Adresse"
              required
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 rounded border-input bg-background text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span>
              Ich stimme der <a href="/datenschutz" className="text-blue-500 hover:underline">Datenschutzerklärung</a> zu und möchte den Newsletter erhalten.*
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Wird gesendet...' : 'Jetzt kostenlos anmelden'}
          </button>

          {/* Success Message */}
          {showSuccess && (
            <p className="text-sm text-center text-green-500 font-medium">
              Vielen Dank! Sie erhalten bald unseren Newsletter.
            </p>
          )}

          {/* Error Message */}
          {showError && (
            <p className="text-sm text-center text-red-500">
              Fehler beim Anmelden. Bitte versuchen Sie es später erneut.
            </p>
          )}
        </form>

        {/* Privacy Note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Wir respektieren Ihre Privatsphäre. Jederzeit abmeldbar.
        </p>
      </div>
    </div>
  );
}
