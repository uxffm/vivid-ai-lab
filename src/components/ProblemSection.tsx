import React from "react";
import TextBlock from "./TextBlock";
import { homepageContentEn } from "@/content/content";

const ProblemSection = ({ lang = "de" }: { lang?: "de" | "en" }) => {
  if (lang === "en") {
    const { title, paragraphs } = homepageContentEn.problems;
    return (
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <TextBlock title={title}>
            {paragraphs.map((t) => (
              <TextBlock.P key={t}><span dangerouslySetInnerHTML={{ __html: t }} /></TextBlock.P>
            ))}
          </TextBlock>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <TextBlock title="Kennen Sie diese Probleme?">
          <TextBlock.P>
            Kennen Sie langweilige, repetitive Aufgaben die niemand gerne macht, aber trotzdem
            erledigt werden müssen?
          </TextBlock.P>
          <TextBlock.P>
            Oder <b>teure Freelancer und externe Dienstleister</b> die Sie für jede kleine Aufgabe
            bezahlen müssen?
          </TextBlock.P>
          <TextBlock.P>
            Vielleicht verlieren Sie auch wertvolle Zeit mit manuellen Prozessen, die eigentlich
            automatisiert werden könnten?
          </TextBlock.P>
          <TextBlock.P>
            Das machen wir mit KI: Automatisieren Sie die langweiligen Aufgaben, sparen Sie Geld
            und gewinnen Sie wertvolle Zeit zurück.
          </TextBlock.P>
        </TextBlock>
      </div>
    </section>
  );
};

export default ProblemSection;
