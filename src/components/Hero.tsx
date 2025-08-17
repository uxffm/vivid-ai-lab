import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/ai-hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float">
        <Sparkles className="w-6 h-6 text-primary" />
      </div>
      <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-4 h-4 bg-primary rounded-full animate-glow" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              The Future of
              <span className="text-gradient block">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We build cutting-edge AI solutions that transform businesses and unlock unlimited potential. 
              From machine learning to automation, we're your partners in the AI revolution.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Start Your AI Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-6">
              View Our Work
            </Button>
          </div>
          
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              Trusted by 500+ companies worldwide
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;