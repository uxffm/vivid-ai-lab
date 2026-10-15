import React from "react";
import { homepageContent } from "@/content/content";

const About = () => {
  const { title, description, photo } = homepageContent.about;
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-5">
          <h2 className="text-3xl md:text-4xl leading-tight mb-6">{title}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <img
          src={photo.src}
          alt={photo.alt}
          width="1200"
          height="800"
          loading="lazy"
          className="lg:col-span-7 w-full h-auto rounded-md"
        />
      </div>
    </section>
  );
};

export default About;
