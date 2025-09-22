import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, Rocket, Zap, Sparkles } from "lucide-react";
import { homepageContent } from "@/content/content";



const About = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 hero-gradient-subtle rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 hero-gradient-subtle rounded-full blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {homepageContent.about.title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {homepageContent.about.description}
              </p>
            </div>
            

          </div>
          
          {/* Team Photo */}
          <div className="relative">
            <div className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-border">
              {/* Hier dein echtes Team-Foto einfügen */}
              <img 
                src={homepageContent.about.photo.src} 
                alt={homepageContent.about.photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Orbit-Icons um das Foto */}
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse" style={{ animationDelay: '1s' }}>
              <Rocket className="w-6 h-6" />
            </div>
            <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse" style={{ animationDelay: '2s' }}>
              <Zap className="w-5 h-5" />
            </div>
            <div className="absolute top-1/4 -left-8 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse" style={{ animationDelay: '3s' }}>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;