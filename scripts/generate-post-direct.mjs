import fs from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_DIR = 'src/content/blog';
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  console.error('ANTHROPIC_API_KEY environment variable is required');
  process.exit(1);
}

const yamlString = (value) => `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/\b(19|20)\d{2}\b/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')
    .split('-')
    .slice(0, 5)
    .join('-')
    .slice(0, 50);

const callClaude = async (prompt) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }
  const data = await response.json();
  return data.content[0].text;
};

const topic = {
  title: 'Anthropic launcht Claude Academy: Kostenloses KI-Lernportal für alle',
  source: 'r/Anthropic',
  url: 'https://www.anthropic.com/news',
  selftext: `Anthropic hat am 20. August 2026 Claude Academy gelauncht — eine kostenlose Lernplattform, die auf dem internen Onboarding-Framework basiert, mit dem Anthropic seine eigenen Mitarbeiter schult. Die Plattform enthält das sogenannte 4D AI Fluency Framework, Kurse, Tutorials, Badges und personalisierte Empfehlungen. Ziel ist es, KI-Kompetenz für alle zugänglich zu machen — nicht nur für Entwickler.`,
  relatedTitles: [
    '- Anthropic embeds invisible watermarks in all Claude outputs to comply with EU AI Act',
    '- Claude for Teachers: Anthropic joins OpenAI and Google in race for classroom AI',
    '- Anthropic Developer Platform adds Agent Skills and Files API',
  ],
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const existingFiles = await fs.readdir(OUTPUT_DIR);
  const existingSlugs = new Set(existingFiles.filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')));

  const candidateSlug = slugify(topic.title);
  if (existingSlugs.has(candidateSlug)) {
    console.log(`Post already exists: ${candidateSlug}`);
    return;
  }

  const prompt = `Du bist ein erfahrener KI-Experte und schreibst für das Blog von Frankfurt AI (frankfurt-ai.de), einer KI-Agentur aus Frankfurt am Main.

Schreibe einen ausführlichen, informativen Blogartikel auf Deutsch basierend auf diesem aktuell diskutierten Thema aus der KI-Community:

HAUPTTHEMA: "${topic.title}"
Quelle: ${topic.url} (${topic.source})
Kontext: ${topic.selftext}

Weitere aktuelle Themen der Community (zur Einordnung):
${topic.relatedTitles.join('\n')}

Anforderungen:
- Sprache: Deutsch, klar und professionell — immer die Sie-Form verwenden, niemals du/dich/dir/dein
- Länge: Mindestens 800 Wörter, gerne mehr
- Fokus: Geh tief auf das spezifische Thema ein — konkret und nützlich, nicht generisch
- Struktur: Mehrere H2-Abschnitte mit echtem Inhalt, keine Füllwörter
- Stil: Praktisch und verständlich — der Leser soll etwas mitnehmen
- Zielgruppe: Unternehmen und Interessierte, die KI besser verstehen und einsetzen wollen
- Externe Links: Maximal 2 externe Links direkt im Fließtext — nur zu offiziellen Quellen (anthropic.com, openai.com, offizielle Dokumentation). Format: [Linktext](https://...) direkt im Text.
- Keine internen Links zur eigenen Website.

Gib NUR den Markdown-Inhalt zurück (ab dem ersten einleitenden Absatz, kein Frontmatter, kein H1-Titel). Fang direkt mit dem Einleitungsabsatz an, dann die H2-Abschnitte.`;

  console.log('Generiere Artikel mit Claude...');
  const content = await callClaude(prompt);

  const slugPrompt = `Erstelle einen kurzen, prägnanten URL-Slug (auf Deutsch oder Englisch, maximal 4 Wörter, nur Kleinbuchstaben und Bindestriche) für einen Blogartikel über dieses KI-Thema: "${topic.title}". Nenne das konkrete Thema oder Produkt — keine generischen Wörter wie "ki", "tipps", "guide", "wie", "warum", "was". Keine Jahreszahl im Slug. So kurz wie möglich. Gib NUR den Slug zurück.`;
  const rawSlug = await callClaude(slugPrompt);
  const slug = slugify(rawSlug.trim().toLowerCase().replace(/['"]/g, ''));

  const metaPrompt = `Basierend auf diesem KI-Thema: "${topic.title}"

Gib mir im folgenden Format:
TITEL: [Prägnanter deutscher Blogtitel, max 70 Zeichen]
DESCRIPTION: [Teasertext, 1-2 Sätze, max 160 Zeichen]
CATEGORY: [Eine kurze Kategorie auf Deutsch, z.B. "KI-News", "Anthropic", "LLM", "KI-Tools"]
LESEZEIT: [Geschätzte Lesezeit, z.B. "7 min Lesezeit"]

Nur diese vier Zeilen, nichts anderes.`;
  const metaRaw = await callClaude(metaPrompt);
  const titleMatch = metaRaw.match(/TITEL:\s*(.+)/);
  const descMatch = metaRaw.match(/DESCRIPTION:\s*(.+)/);
  const categoryMatch = metaRaw.match(/CATEGORY:\s*(.+)/);
  const readTimeMatch = metaRaw.match(/LESEZEIT:\s*(.+)/);

  const title = titleMatch ? titleMatch[1].trim() : topic.title;
  const description = descMatch ? descMatch[1].trim() : '';
  const category = categoryMatch ? categoryMatch[1].trim() : 'KI-News';
  const readTime = readTimeMatch ? readTimeMatch[1].trim() : '8 min Lesezeit';

  const today = new Date().toISOString().slice(0, 10);

  const frontmatter = `---
title: ${yamlString(title)}
description: ${yamlString(description)}
author: "KI Agentur"
date: "${today}"
category: ${yamlString(category)}
readTime: ${yamlString(readTime)}
---

`;

  const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

  try {
    await fs.access(outputPath);
    console.log(`Post already exists: ${outputPath}`);
    return;
  } catch {
    // expected
  }

  await fs.writeFile(outputPath, frontmatter + content, 'utf8');
  console.log(`Erstellt: ${outputPath}`);
};

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
