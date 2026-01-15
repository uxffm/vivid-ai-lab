import { Button } from "@/components/ui/button";
import { homepageContent } from "@/content/content";

// Icon mapping für die Services
const getIcon = (iconName: string) => {
  const iconMap: { [key: string]: string } = {
    "🤖": "🤖",
    "⚡": "⚡",
    "🎨": "🎨",
    "🌐": "🌐",
    "🔒": "🔒"
  };
  return iconMap[iconName] || "🤖";
};

const Services = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {homepageContent.services.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {homepageContent.services.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {homepageContent.services.services.map((service, index) => {
            const isAutomation = service.title === "KI Automatisierung";
            const isVibeCoding = service.title === "Vibe Coding Agentur";
            const isBeratung = service.title === "KI Beratung";
            const isLokaleModelle = service.title === "Lokale KI Modelle";
            const href = isAutomation ? "/ki-automatisierung" : isVibeCoding ? "/vibe-coding" : isBeratung ? "/ki-beratung" : isLokaleModelle ? "/ki-modelle-lokal" : undefined;
            const Card = ({ children }: { children: React.ReactNode }) => (
              href ? (
                <a href={href} className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 smooth-transition block" style={{ animationDelay: `${index * 0.1}s` }}>
                  {children}
                </a>
              ) : (
                <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 smooth-transition" style={{ animationDelay: `${index * 0.1}s` }}>
                  {children}
                </div>
              )
            );

            return (
              <Card key={service.title}>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="text-4xl group-hover:scale-110 smooth-transition">
                      {getIcon(service.icon)}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient smooth-transition min-h-[4rem] flex items-start">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {href && (
                    <div className="flex justify-center">
                      <Button variant="ghost" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all">Mehr erfahren →</Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;