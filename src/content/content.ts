export const homepageContent = {
  // Hero Section
  hero: {
    title: {
      line1: "Ihre KI Agentur",
      line2: "aus Frankfurt am Main."
    },
    subtitle: "KI nutzen, Zeit sparen und teure Prozesse automatisieren. Wir sind Ihre KI-Agentur aus Frankfurt am Main und revolutionieren Ihren digitalen Auftritt mit intelligenten Lösungen, die messbare Ergebnisse liefern. Ganz nah an der KI Entwicklung dran, nutzen wir die modernsten KI Methoden.",
    buttons: {
      primary: {
        text: "Direkt Kontaktieren",
        href: "#contact"
      },
      secondary: {
        text: "Anrufen",
        href: "tel:+491627519335"
      }
    },
    trust: {
      prefix: "Vertraut von Unternehmen aus",
      linkText: "Frankfurt und Umgebung",
      rating: "Bewertet mit 5/5 auf Google",
      // TODO: replace with the real Google Business Profile link
      href: "https://www.google.com/maps/search/?api=1&query=KI+Agentur+FAI+Frankfurt"
    }
  },

  // Navigation
  navigation: {
    logo: "KI Agentur FAI",
    menu: [
      { label: "Services", href: "#services" },
      { label: "Über uns", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Kontakt", href: "#contact" }
    ],
    cta: "Kostenlose Beratung"
  },

  // Services Section
  services: {
    title: "Unsere KI-Services",
    subtitle: "Wir bieten maßgeschneiderte KI-Lösungen für Ihr Unternehmen - von Chatbots über Prozessautomatisierung bis hin zu modernem Webdesign. Alle Lösungen sind kostengünstig, effizient und auf Ihre spezifischen Bedürfnisse zugeschnitten. Mit KI können Sie die langweiligen, repetitiven Aufgaben Ihres Unternehmens automatisieren, ohne auf teure Freelancer zurückgreifen zu müssen.",
    services: [
      {
        title: "KI Automatisierung",
        description: "Automatisierung aller Prozesse mit KI-Technologie - egal welche Abläufe Sie optimieren möchten. Reduzieren Sie manuelle Arbeit und steigern Sie die Effizienz Ihres Teams.",
        icon: "⚡"
      },
      {
        title: "Lokale KI Modelle",
        description: "Maximale Datenkontrolle und DSGVO-Konformität durch lokale KI-Modelle in Ihrer Infrastruktur. Unabhängig, kosteneffizient und vollständig unter Ihrer Kontrolle.",
        icon: "🔒"
      },
      {
        title: "Vibe Coding Agentur",
        description: "Smarte, KI‑gestützte Apps und Workflows – schnell, modular, kosteneffizient. Von MVP bis Rollout, mit klaren Sprints und sauberer Integration.",
        icon: "🎨"
      },
      {
        title: "KI Beratung",
        description: "Strategische KI-Beratung für nachhaltigen Unternehmenserfolg. Von der Potenzialanalyse über Strategie-Entwicklung bis zur Implementierung – praxisnah und messbar.",
        icon: "🤖"
      },
      {
        title: "KI Rezeption",
        description: "24/7 erreichbar, nie krank, immer freundlich. KI-gestützte Anrufannahme, automatische Terminbuchung und intelligente Kundenbetreuung für Ihr Unternehmen.",
        icon: "📞"
      }
    ]
  },

  // About Section
  about: {
    title: "Über uns",
    subtitle: "Ihre Experten für KI-Marketing in Frankfurt",
    description: "Wir sind ein Team aus SEO-Experten, Designern und Programmierern, die mit der KI ganz früh angefangen haben. Die KI-Technologie ändert sich täglich - nichts entwickelt sich so schnell wie die künstliche Intelligenz. Als KI-Agentur wissen wir genau, welche KI-Technologie für welche Aufgabe die richtige ist. Wir setzen alle diese Änderungen sofort für unsere Kunden um und bleiben immer am Puls der Zeit.",
    photo: {
      src: "/ki-automatisierung-frankfurt.webp",
      alt: "KI-Agentur Frankfurt: Mensch und Roboter vor der Frankfurter Skyline am Main"
    },
    stats: [
      { number: "20+", label: "Zufriedene Kunden" },
      { number: "95%", label: "Erfolgsrate" },
      { number: "24/7", label: "Support" }
    ]
  },

  // Blog Section
  blog: {
    title: "KI-Marketing Insights",
    subtitle: "Bleiben Sie auf dem neuesten Stand der KI-Marketing-Entwicklungen",
    cta: {
      title: "Bleiben Sie informiert",
      description: "Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten KI-Marketing-Insights direkt in Ihren Posteingang.",
      buttons: {
        primary: "Newsletter abonnieren",
        secondary: "Alle Artikel ansehen"
      }
    }
  },

  // Contact Section
  contact: {
    title: "Kontaktieren Sie uns",
    subtitle: "Lassen Sie uns gemeinsam Ihre KI-Strategie entwickeln",
    form: {
      name: "Name",
      email: "E-Mail",
      company: "Unternehmen",
      message: "Ihre Nachricht",
      submit: "Nachricht senden"
    },
    info: {
      address: "Frankfurt am Main, Deutschland",
      email: "info@ki-marketing-frankfurt.de",
      phone: "+49 69 123 456 78"
    }
  }
};

export const homepageContentEn = {
  hero: {
    title: { line1: "Your AI agency", line2: "from Frankfurt am Main." },
    subtitle: "Use AI, save time and automate expensive processes. We are your AI agency from Frankfurt am Main and transform your digital presence with intelligent solutions that deliver measurable results. Staying very close to AI development, we use the most modern AI methods.",
    buttons: {
      primary: { text: "Contact us directly", href: "#contact" },
      secondary: { text: "Call us", href: "tel:+491627519335" }
    },
    trust: {
      prefix: "Trusted by companies from",
      linkText: "Frankfurt and the surrounding area",
      rating: "Rated 5/5 on Google",
      href: "https://www.google.com/maps/search/?api=1&query=KI+Agentur+FAI+Frankfurt"
    }
  },
  services: {
    title: "Our AI services",
    subtitle: "We offer tailored AI solutions for your business, from chatbots and process automation to modern web design. All solutions are cost-effective, efficient and tailored to your specific needs. With AI you can automate the boring, repetitive tasks in your company without relying on expensive freelancers.",
    more: "Learn more →",
    services: [
      { title: "AI Automation", key: "KI Automatisierung", href: "/en/ai-automation-agency-frankfurt/", description: "Automate all processes with AI technology, whichever workflows you want to optimize. Reduce manual work and increase your team's efficiency." },
      { title: "Local AI Models", key: "Lokale KI Modelle", href: "/en/local-ai-models-for-business/", description: "Maximum data control and GDPR compliance through local AI models in your own infrastructure. Independent, cost-efficient and fully under your control." },
      { title: "Vibe Coding Agency", key: "Vibe Coding Agentur", href: "/en/vibe-coding-agency/", description: "Smart, AI-powered apps and workflows: fast, modular, cost-efficient. From MVP to rollout, with clear sprints and clean integration." },
      { title: "AI Consulting", key: "KI Beratung", href: "/en/ai-consulting-frankfurt/", description: "Strategic AI consulting for lasting business success. From potential analysis and strategy development to implementation: practical and measurable." },
      { title: "AI Receptionist", key: "KI Rezeption", href: "/en/ai-receptionist/", description: "Available 24/7, never sick, always friendly. AI-powered call answering, automatic appointment booking and intelligent customer service for your business." },
      { title: "GEO Agency (AI Visibility)", key: "GEO", href: "/en/geo-agency-frankfurt/", description: "Make your brand visible in ChatGPT, Gemini and Perplexity. We make sure AI assistants know your brand, describe it correctly and recommend it." },
      { title: "ChatGPT Ads Agency", key: "ChatGPT Ads", href: "/en/chatgpt-ads-agency-frankfurt/", description: "Place advertising directly in ChatGPT: from the first strategy to the ongoing optimization of your campaigns." }
    ]
  },
  problems: {
    title: "Do you know these problems?",
    paragraphs: [
      "Do you know boring, repetitive tasks that nobody likes doing but that still have to be done?",
      "Or <b>expensive freelancers and external service providers</b> that you have to pay for every small task?",
      "Maybe you are also losing valuable time on manual processes that could actually be automated?",
      "That is what we do with AI: automate the boring tasks, save money and win back valuable time."
    ]
  },
  about: {
    title: "About us",
    description: "We are a team of SEO experts, designers and programmers who started with AI very early. AI technology changes every day, nothing develops as fast as artificial intelligence. As an AI agency we know exactly which AI technology is right for which task. We implement all these changes immediately for our customers and always stay on top of things.",
    photo: { src: "/ki-automatisierung-frankfurt.webp", alt: "AI agency Frankfurt: human and robot in front of the Frankfurt skyline on the Main river" }
  },
  navigation: {
    menu: [
      { label: "Services", href: "/en/#services" },
      { label: "About us", href: "/en/#about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" }
    ],
    cta: "Free consultation"
  }
};
