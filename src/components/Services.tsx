import { ArrowRight } from "lucide-react";
import { homepageContent } from "@/content/content";
import TextBlock from "./TextBlock";

const hrefs: Record<string, string> = {
  "KI Automatisierung": "/ki-automatisierung",
  "Lokale KI Modelle": "/ki-modelle-lokal",
  "Vibe Coding Agentur": "/vibe-coding",
  "KI Beratung": "/ki-beratung",
  "KI Rezeption": "/ki-rezeption",
};

const Services = () => {
  return (
    <section className="pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <TextBlock
          className="mb-12"
          title={homepageContent.services.title}
          text={homepageContent.services.subtitle}
        />

        <ul className="border-b border-border">
          {homepageContent.services.services.map((service) => {
            const href = hrefs[service.title];
            return (
              <li key={service.title} className="border-t border-border">
                <a
                  href={href}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 items-baseline py-8 px-2 -mx-2 hover:bg-card transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
                >
                  <h3 className="md:col-span-4 font-display text-2xl md:text-[28px] font-medium leading-snug underline decoration-2 decoration-transparent underline-offset-4 group-hover:decoration-primary transition-colors">
                    {service.title}
                  </h3>
                  <div className="md:col-span-7">
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <span className="mt-3 inline-block font-semibold underline underline-offset-4 decoration-2 decoration-primary">
                      Mehr erfahren →
                    </span>
                  </div>
                  <ArrowRight
                    className="hidden md:block md:col-span-1 justify-self-end w-6 h-6 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Services;
