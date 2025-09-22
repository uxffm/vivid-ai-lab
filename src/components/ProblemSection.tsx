import React from "react";

const ProblemSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Kennen Sie diese Probleme?
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Kennen Sie <strong className="text-foreground">langweilige, repetitive Aufgaben </strong> die niemand gerne macht, 
          aber trotzdem erledigt werden müssen? Oder <strong className="text-foreground">teure Freelancer und externe Dienstleister </strong> 
          die Sie für jede kleine Aufgabe bezahlen müssen? Vielleicht verlieren Sie auch <strong className="text-foreground">wertvolle Zeit </strong> 
          mit manuellen Prozessen, die eigentlich automatisiert werden könnten? <strong className="text-foreground">Das machen wir mit KI: </strong> 
          Automatisieren Sie die langweiligen Aufgaben, sparen Sie Geld und gewinnen Sie wertvolle Zeit zurück.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
