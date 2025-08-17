import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Calendar, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient-subtle" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Let's discuss how AI can revolutionize your operations. Get in touch with our experts 
              for a free consultation and discover your AI potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 smooth-transition group">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed answers to your questions
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 smooth-transition group">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">
                Instant support from our AI specialists
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 smooth-transition group">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
              <h3 className="font-semibold mb-2">Book a Call</h3>
              <p className="text-sm text-muted-foreground">
                Schedule a personalized consultation
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Button variant="hero" size="lg" className="text-lg px-12 py-6">
              Start Your AI Journey Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Free consultation • No obligation • Custom AI strategy included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;