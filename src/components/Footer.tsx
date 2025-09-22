import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} KI Agentur Frankfurt. Alle Rechte vorbehalten.
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="/impressum" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Impressum
            </a>
            <a 
              href="/datenschutz" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
