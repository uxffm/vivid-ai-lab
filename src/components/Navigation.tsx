import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { homepageContent } from "@/content/content";

const navItems = homepageContent.navigation.menu;

const Navigation = () => {
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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen
        ? 'bg-background/95 backdrop-blur-md border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 text-left"
            aria-label="Zur Startseite"
          >
            <div className="w-10 h-10 border-2 border-blue-600 rounded-lg flex items-center justify-center">
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
                          href="/ki-automatisierung"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          KI Automatisierung
                        </a>
                        <a
                          href="/vibe-coding"
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          Vibe Coding Agentur
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
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
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
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
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