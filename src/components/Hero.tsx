import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/ai-hero-image.jpg";
import { homepageContent } from "@/content/content";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Hintergrundbild mit KI-Marketing Visualisierung - abstrakte digitale Netzwerke und Datenströme in blau-violetten Tönen"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* AI Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          {/* Grid Pattern */}
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
          
          {/* Floating Dots Pattern */}
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 50% 10%, rgba(147, 51, 234, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 10% 60%, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 90% 40%, rgba(147, 51, 234, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px, 300px 300px, 150px 150px, 250px 250px, 180px 180px'
          }} />
          
          {/* Circuit Pattern */}
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 40%, rgba(59, 130, 246, 0.1) 60%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(147, 51, 234, 0.1) 40%, rgba(147, 51, 234, 0.1) 60%, transparent 60%)
            `,
            backgroundSize: '100px 100px'
          }} />
          
          {/* Animated Data Stream */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full animate-data-stream" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)
              `,
              backgroundSize: '200% 100%'
            }} />
          </div>
        </div>
      </div>
      

      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {homepageContent.hero.title.line1}
              <span className="text-gradient block">
                {homepageContent.hero.title.line2}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {homepageContent.hero.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <a href={homepageContent.hero.buttons.primary.href}>{homepageContent.hero.buttons.primary.text}<ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-6" asChild>
              <a href="#contact">{homepageContent.hero.buttons.secondary.text}</a>
            </Button>
          </div>
          
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              {homepageContent.hero.trust}
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;