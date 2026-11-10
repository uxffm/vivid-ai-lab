import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { homepageContent } from "@/content/content";

const navItems = homepageContent.navigation.menu;

type NavProps = { lang?: "de" | "en"; altHref?: string };

const LangSwitch = ({ lang, altHref, className = "" }: { lang: "de" | "en"; altHref?: string; className?: string }) => {
  if (!altHref) return null;
  const base = "px-3 py-1 text-sm font-semibold rounded-full transition-colors";
  const cur = `${base} bg-white text-[#2a3cbf]`;
  const other = `${base} text-white hover:bg-white/20`;
  return (
    <div
      className={`inline-flex items-center gap-1 p-0.5 rounded-full border border-white/60 ${className}`}
      role="group"
      aria-label={lang === "en" ? "Language" : "Sprache"}
    >
      {lang === "de" ? (
        <span className={cur} lang="de" aria-current="true">DE</span>
      ) : (
        <a href={altHref} hrefLang="de" lang="de" className={other}>DE</a>
      )}
      {lang === "en" ? (
        <span className={cur} lang="en" aria-current="true">EN</span>
      ) : (
        <a href={altHref} hrefLang="en" lang="en" className={other}>EN</a>
      )}
    </div>
  );
};

const Navigation = ({ lang = "de", altHref }: NavProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    // Check if we're on the homepage
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    
    if (href === '#contact' && !isHomepage) {
      // On other pages, scroll to contact section if it exists
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (isHomepage) {
      // On homepage, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to homepage with hash
      window.location.href = `/${href}`;
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  if (lang === "en") {
    const services = [
      { label: "AI Consulting", href: "/en/ai-consulting-frankfurt/" },
      { label: "AI Automation", href: "/en/ai-automation-agency-frankfurt/" },
      { label: "Local AI Models", href: "/en/local-ai-models-for-business/" },
      { label: "Vibe Coding Agency", href: "/en/vibe-coding-agency/" },
      { label: "AI Receptionist", href: "/en/ai-receptionist/" },
      { label: "ChatGPT Ads Agency", href: "/en/chatgpt-ads-agency-frankfurt/" },
      { label: "GEO Agency (AI Visibility)", href: "/en/geo-agency-frankfurt/" },
    ];
    const goContact = (e: React.MouseEvent) => {
      const el = document.querySelector("#contact");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    };
    const link = "text-muted-foreground hover:text-foreground transition-colors font-medium";
    return (
      <nav className="band-brand fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <a href="/en/" className="flex items-center space-x-2 text-left" aria-label="Frankfurt AI – Home">
              <div className="w-10 h-10 border-2 border-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KI</span>
              </div>
              <span className="text-xl font-bold">{homepageContent.navigation.logo}</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <div
                className="relative"
                onMouseEnter={() => setIsServicesHovered(true)}
                onMouseLeave={() => setIsServicesHovered(false)}
              >
                <a href="/en/#services" className={link}>Services</a>
                {isServicesHovered && (
                  <div className="absolute top-full left-0 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
                    {services.map((i) => (
                      <a key={i.href} href={i.href} className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        {i.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="/en/#about" className={link}>About us</a>
              <a href="/blog" hrefLang="de" className={link}>Blog (DE)</a>
              <a href="/en/#contact" onClick={goContact} className={link}>Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-5">
              <LangSwitch lang="en" altHref={altHref} />
              <a href="/en/#contact" onClick={goContact} className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                Free consultation
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden py-6 border-t border-border bg-background/95 backdrop-blur-md">
              <div className="flex flex-col space-y-3">
                <a href="/en/#services" className={`${link} py-2`}>Services</a>
                {services.map((i) => (
                  <a key={i.href} href={i.href} className="pl-4 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    → {i.label}
                  </a>
                ))}
                <a href="/en/#about" className={`${link} py-2`}>About us</a>
                <a href="/blog" hrefLang="de" className={`${link} py-2`}>Blog (DE)</a>
                <a href="/en/#contact" onClick={goContact} className={`${link} py-2`}>Contact</a>
                <LangSwitch lang="en" altHref={altHref} className="self-start" />
                <a href="/en/#contact" onClick={goContact} className="inline-flex justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
                  Free consultation
                </a>
              </div>
              <div className="h-8"></div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className="band-brand fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 text-left"
            aria-label="Zur Startseite"
          >
            <div className="w-10 h-10 border-2 border-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KI</span>
            </div>
            <span className="text-xl font-bold">{homepageContent.navigation.logo}</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.label === "Services") {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsServicesHovered(true)}
                    onMouseLeave={() => setIsServicesHovered(false)}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                      {item.label}
                    </button>
                    {isServicesHovered && (
                      <div className="absolute top-full left-0 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                        <a
                          href="/ki-beratung"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          KI Beratung
                        </a>
                        <a
                          href="/ki-automatisierung"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          KI Automatisierung
                        </a>
                        <a
                          href="/ki-automatisierung-hanau"
                          className="block px-4 py-3 pl-7 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          → Hanau
                        </a>
                        <a
                          href="/ki-automatisierung-wiesbaden"
                          className="block px-4 py-3 pl-7 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          → Wiesbaden
                        </a>
                        <a
                          href="/automatisierung-agentur-marburg"
                          className="block px-4 py-3 pl-7 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          → Marburg
                        </a>
                        <a
                          href="/ki-modelle-lokal"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          Lokale KI Modelle
                        </a>
                        <a
                          href="/vibe-coding"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          Vibe Coding Agentur
                        </a>
                        <a
                          href="/ki-rezeption"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          KI Rezeption
                        </a>
                        <a
                          href="/chatgpt-ads-agentur"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          ChatGPT Ads Agentur
                        </a>
                        <a
                          href="/geo-agentur-frankfurt"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          GEO Agentur (KI-Sichtbarkeit)
                        </a>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-5">
            <LangSwitch lang="de" altHref={altHref} />
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-0"
            >
              {homepageContent.navigation.cta}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <LangSwitch lang="de" altHref={altHref} className="py-2" />
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0"
              >
                {homepageContent.navigation.cta}
              </Button>
            </div>
            {/* Extra spacing below CTA button */}
            <div className="h-8"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;