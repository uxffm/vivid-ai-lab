import fs from 'node:fs/promises';
import path from 'node:path';

const SUBREDDITS = ['Anthropic'];
const POSTS_PER_SUBREDDIT = 30;
const OUTPUT_DIR = 'src/content/blog';
const SITE_URL = 'https://frankfurt-ai.de';
const isDryRun = process.env.DRY_RUN === '1';
const redditClientId = process.env.REDDIT_CLIENT_ID;
const redditClientSecret = process.env.REDDIT_CLIENT_SECRET;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  console.error('ANTHROPIC_API_KEY environment variable is required');
  process.exit(1);
}

const sanitizeText = (value = '') =>
  value.replace(/\r?\n/g, ' ').replace(/"/g, '\\"').replace(/\s+/g, ' ').trim();

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

const yamlString = (value) => `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const computeScore = (post) => {
  const ageHours = (Date.now() - post.createdUtc * 1000) / (1000 * 60 * 60);
  let freshnessBonus = 0;
  if (ageHours < 6) freshnessBonus = 500;
  else if (ageHours < 24) freshnessBonus = 200;
  else if (ageHours < 48) freshnessBonus = 100;
  return post.score + post.numComments * 3 + freshnessBonus;
};


const getRedditAccessToken = async () => {
  if (!redditClientId || !redditClientSecret) return undefined;
  const auth = Buffer.from(`${redditClientId}:${redditClientSecret}`).toString('base64');
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'frankfurt-ai.de daily AI content bot',
    },
    body: 'grant_type=client_credentials',
  });
  if (!response.ok) throw new Error(`Reddit auth failed ${response.status}`);
  const json = await response.json();
  return json.access_token;
};

const fetchRedditPosts = async (subreddit, accessToken) => {
  try {
    const url = accessToken
      ? `https://oauth.reddit.com/r/${subreddit}/hot?limit=${POSTS_PER_SUBREDDIT}`
      : `https://www.reddit.com/r/${subreddit}/hot.json?limit=${POSTS_PER_SUBREDDIT}`;
    const headers = {
      'User-Agent': 'frankfurt-ai.de daily AI content bot',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    return (data?.data?.children ?? [])
      .filter((p) => p.data?.title && !p.data.stickied && !p.data.over_18)
      .map((p) => ({
        subreddit,
        title: sanitizeText(p.data.title),
        url: `https://www.reddit.com${p.data.permalink}`,
        score: p.data.score ?? 0,
        numComments: p.data.num_comments ?? 0,
        selftext: sanitizeText((p.data.selftext ?? '').slice(0, 500)),
        createdUtc: p.data.created_utc ?? 0,
      }));
  } catch (err) {
    throw new Error(`r/${subreddit} nicht erreichbar: ${err.message}`);
  }
};

const getExistingSlugs = async () => {
  try {
    const files = await fs.readdir(OUTPUT_DIR);
    return new Set(files.filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', '')));
  } catch {
    return new Set();
  }
};

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

const generatePost = async (topPost, relatedPosts) => {
  const relatedTitles = relatedPosts
    .slice(1, 4)
    .map((p) => `- ${p.title}`)
    .join('\n');
  const source = topPost.subreddit ? `r/${topPost.subreddit}` : topPost.source;

  const prompt = `Du bist ein erfahrener KI-Experte und schreibst für das Blog von Frankfurt AI (frankfurt-ai.de), einer KI-Agentur aus Frankfurt am Main.

Schreibe einen ausführlichen, informativen Blogartikel auf Deutsch basierend auf diesem aktuell diskutierten Thema aus der KI-Community:

HAUPTTHEMA: "${topPost.title}"
Quelle: ${topPost.url} (${source})
${topPost.selftext ? `Kontext: ${topPost.selftext}` : ''}

Weitere aktuelle Themen der Community (zur Einordnung):
${relatedTitles}

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

  const content = await callClaude(prompt);

  const slugPrompt = `Erstelle einen kurzen, prägnanten URL-Slug (auf Deutsch oder Englisch, maximal 4 Wörter, nur Kleinbuchstaben und Bindestriche) für einen Blogartikel über dieses KI-Thema: "${topPost.title}". Nenne das konkrete Thema oder Produkt — keine generischen Wörter wie "ki", "tipps", "guide", "wie", "warum", "was". Keine Jahreszahl im Slug. So kurz wie möglich. Gib NUR den Slug zurück.`;
  const rawSlug = await callClaude(slugPrompt);
  const slug = slugify(rawSlug.trim().toLowerCase().replace(/['"]/g, ''));

  const metaPrompt = `Basierend auf diesem KI-Thema: "${topPost.title}"

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

  const title = titleMatch ? titleMatch[1].trim() : topPost.title;
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

  return { slug, content: frontmatter + content };
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  console.log('Lade Reddit-Beiträge...');
  let accessToken;
  try {
    accessToken = await getRedditAccessToken();
    if (accessToken) console.log('Reddit OAuth-Token erhalten.');
  } catch (err) {
    console.warn(`Reddit OAuth fehlgeschlagen: ${err.message}`);
  }

  const allPosts = [];
  for (const sub of SUBREDDITS) {
    const posts = await fetchRedditPosts(sub, accessToken);
    console.log(`  r/${sub}: ${posts.length} Beiträge`);
    allPosts.push(...posts);
    await new Promise((r) => setTimeout(r, 600));
  }

  if (allPosts.length < 3) {
    throw new Error(`Zu wenig Beiträge gefunden: ${allPosts.length}`);
  }

  const scored = allPosts
    .map((p) => ({ ...p, computedScore: computeScore(p) }))
    .sort((a, b) => b.computedScore - a.computedScore);

  console.log(`Top-Thema: "${scored[0]?.title}" (Score: ${Math.round(scored[0]?.computedScore)})`);

  const existingSlugs = await getExistingSlugs();
  console.log(`Bereits ${existingSlugs.size} Posts vorhanden.`);

  let selectedPost = null;
  let selectedIndex = 0;
  for (let i = 0; i < Math.min(5, scored.length); i++) {
    const candidateSlug = slugify(scored[i].title);
    if (!existingSlugs.has(candidateSlug)) {
      selectedPost = scored[i];
      selectedIndex = i;
      break;
    }
    console.log(`Post ${i + 1} ("${scored[i].title}") übersprungen — Slug existiert bereits.`);
  }

  if (!selectedPost) {
    console.log('Alle Top-5-Posts bereits abgedeckt. Kein neuer Post heute.');
    return;
  }

  console.log(`Schreibe über: "${selectedPost.title}" (Rang ${selectedIndex + 1})`);
  console.log('Generiere Artikel mit Claude...');

  const { slug, content } = await generatePost(selectedPost, scored);
  const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

  if (isDryRun) {
    console.log('\n--- DRY RUN ---\n');
    console.log(content.slice(0, 3000));
    console.log(`\nWürde erstellen: ${outputPath}`);
    return;
  }

  try {
    await fs.access(outputPath);
    console.log(`Post existiert bereits: ${outputPath}`);
    return;
  } catch {
    // erwartet
  }

  await fs.writeFile(outputPath, content, 'utf8');
  console.log(`Erstellt: ${outputPath}`);
};

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
