import { Brain, Zap, Target, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Custom ML models that learn from your data to predict, classify, and optimize your business processes.",
    features: ["Predictive Analytics", "Computer Vision", "Natural Language Processing"]
  },
  {
    icon: Cog,
    title: "AI Automation",
    description: "Streamline operations with intelligent automation that handles complex tasks and decision-making.",
    features: ["Process Automation", "Intelligent Workflows", "Decision Systems"]
  },
  {
    icon: Target,
    title: "AI Strategy",
    description: "Strategic consulting to identify AI opportunities and create roadmaps for successful implementation.",
    features: ["AI Readiness Assessment", "Implementation Planning", "ROI Optimization"]
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into your existing systems and workflows.",
    features: ["API Development", "System Integration", "Legacy Modernization"]
  }
];

const Services = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">AI Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer comprehensive AI solutions tailored to your business needs, 
            from strategy to implementation and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 smooth-transition hover:glow-effect"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="hero-gradient-subtle absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 smooth-transition" />
              
              <div className="relative z-10">
                <div className="mb-6">
                  <service.icon className="w-12 h-12 text-primary group-hover:scale-110 smooth-transition" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient smooth-transition">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="ghost" className="w-full justify-start p-0 h-auto text-primary hover:text-primary">
                  Learn More →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;