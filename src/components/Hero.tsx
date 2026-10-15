import { ArrowRight } from "lucide-react";
import { homepageContent } from "@/content/content";
import Skyline from "@/components/Skyline";

const Hero = () => {
  const { title, subtitle, buttons, trust } = homepageContent.hero;
  return (
    <section id="hero" className="band-brand relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-28 md:pt-32 pb-48 md:pb-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
          {title.line1}
          <span className="text-gradient block">{title.line2}</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl text-foreground/90">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={buttons.primary.href}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 text-lg font-semibold text-primary-foreground hover:brightness-95 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {buttons.primary.text}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href={buttons.secondary.href}
            className="inline-flex items-center rounded-md border-2 border-input px-7 py-[14px] text-lg font-semibold hover:bg-foreground/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {buttons.secondary.text}
          </a>
        </div>
        <p className="mt-6 text-sm text-foreground">
          {trust.prefix}{" "}
          <a href={trust.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-highlight underline decoration-2 underline-offset-4 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {trust.linkText}
          </a>
          <span aria-hidden="true"> · </span>
          <a href={trust.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-highlight underline decoration-2 underline-offset-4 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {trust.rating}
          </a>
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#2a3cbf]" aria-hidden="true" />
      <Skyline className="absolute bottom-0 right-0 w-[min(820px,100vw)] h-auto fill-[#2a3cbf]" />
    </section>
  );
};

export default Hero;
