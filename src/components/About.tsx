import { Button } from "@/components/ui/button";
import { Users, Award, Lightbulb, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "AI Projects" },
  { icon: Lightbulb, value: "99%", label: "Success Rate" },
  { icon: TrendingUp, value: "5x", label: "Average ROI" }
];

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
                Leading the <span className="text-gradient">AI Revolution</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We're a team of AI experts, data scientists, and engineers passionate about 
                creating intelligent solutions that drive real business value. Our mission is 
                to make advanced AI accessible to companies of all sizes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From startups to Fortune 500 companies, we've helped organizations transform 
                their operations with cutting-edge artificial intelligence and machine learning technologies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
                Meet Our Team
              </Button>
              <Button variant="glass" size="lg">
                Our Process
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 smooth-transition group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="hero-gradient-subtle absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 smooth-transition" />
                
                <div className="relative z-10">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;