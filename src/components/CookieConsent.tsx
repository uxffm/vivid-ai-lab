import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "accepted") {
      // Enable Google Analytics if consent was given
      enableGoogleAnalytics();
    }
  }, []);

  const enableGoogleAnalytics = () => {
    // Enable Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    enableGoogleAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    // Disable Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Cookie-Einstellungen</h3>
            <p className="text-sm text-muted-foreground">
              Wir verwenden Cookies und ähnliche Technologien, um die Nutzung unserer Website zu analysieren und Ihre Erfahrung zu verbessern.
              Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß unserer{" "}
              <a href="/datenschutz" className="underline hover:text-foreground">
                Datenschutzerklärung
              </a>{" "}
              zu. Sie können Ihre Einwilligung jederzeit widerrufen.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Nur notwendige
            </Button>
            <Button
              onClick={handleAccept}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
