import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLE_FILE = path.join(ROOT, 'src/content/blog/ki-aktuelle-entwicklungen.md');

const client = new Anthropic();

const SUBREDDITS = [
  'artificial', 'MachineLearning', 'AINews', 'OpenAI', 'LocalLLaMA',
  'singularity', 'ClaudeAI', 'Anthropic', 'ChatGPT'
];

async function fetchRedditPosts(subreddit) {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`,
      { headers: { 'User-Agent': 'frankfurt-ai-bot/1.0 (github.com/uxffm/vivid-ai-lab)' } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.children
      .filter(p => !p.data.stickied)
      .map(p => ({
        subreddit,
        title: p.data.title,
        score: p.data.score,
        numComments: p.data.num_comments,
        url: `https://reddit.com${p.data.permalink}`,
        id: p.data.id,
        selftext: p.data.selftext?.slice(0, 400) || '',
      }));
  } catch {
    return [];
  }
}

async function fetchComments(subreddit, postId) {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=10&sort=top`,
      { headers: { 'User-Agent': 'frankfurt-ai-bot/1.0 (github.com/uxffm/vivid-ai-lab)' } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data[1].data.children
      .filter(c => c.kind === 't1' && c.data.body?.length > 20)
      .slice(0, 5)
      .map(c => c.data.body?.slice(0, 300))
      .filter(Boolean);
  } catch {
    return [];
  }
}

// Fetch posts from all subreddits
console.log('Lade Reddit-Beiträge...');
const allPosts = [];
for (const sub of SUBREDDITS) {
  const posts = await fetchRedditPosts(sub);
  allPosts.push(...posts);
  console.log(`  r/${sub}: ${posts.length} Beiträge`);
  await new Promise(r => setTimeout(r, 600));
}

// Sort by score, deduplicate by title similarity, take top 20
const sorted = allPosts
  .sort((a, b) => b.score - a.score)
  .slice(0, 20);

// Fetch comments for top 5 most engaging posts
const top5 = sorted.slice(0, 5);
console.log('Lade Kommentare für Top-5-Beiträge...');
for (const post of top5) {
  post.comments = await fetchComments(post.subreddit, post.id);
  await new Promise(r => setTimeout(r, 600));
}

// Read existing article
const existingArticle = fs.readFileSync(ARTICLE_FILE, 'utf-8');

// Build Reddit summary for Claude
const redditSummary = sorted.map((p, i) => {
  const commentsStr = p.comments?.length
    ? `\nTop-Kommentare: ${p.comments.map(c => `"${c}"`).join(' | ')}`
    : '';
  return `${i + 1}. [r/${p.subreddit}] "${p.title}" (${p.score} upvotes, ${p.numComments} Kommentare)\nLink: ${p.url}${p.selftext ? `\nText: ${p.selftext}` : ''}${commentsStr}`;
}).join('\n\n');

const today = new Date().toISOString().split('T')[0];

console.log('Generiere Artikelupdate mit Claude...');

const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 8192,
  messages: [{
    role: 'user',
    content: `Du aktualisierst den deutschen KI-Nachrichtenartikel "KI-Aktuelle Entwicklungen" auf frankfurt-ai.de.

BESTEHENDER ARTIKEL:
${existingArticle}

HEUTIGE TOP-BEITRÄGE AUS DER KI-COMMUNITY AUF REDDIT:
${redditSummary}

AUFGABE:
1. Prüfe welche Reddit-Beiträge wirklich neu und noch nicht im Artikel behandelt sind
2. Füge für jedes genuinely neue, relevante Thema einen neuen ## Abschnitt hinzu (auf Deutsch, sachlich, 150-300 Wörter pro Abschnitt)
3. Neue Abschnitte kommen direkt nach dem Frontmatter (nach ---), also ganz oben im Artikel
4. Behalte alle bestehenden Abschnitte, die noch inhaltlich relevant und nicht veraltet sind
5. Kürze oder entferne Abschnitte, die durch neuere Entwicklungen überholt sind
6. Aktualisiere das Datum im Frontmatter auf: ${today}
7. Verlinke relevante Reddit-Beiträge als Quelle mit [Diskussion auf Reddit](URL)
8. Der Artikel wächst über Zeit — das ist gewollt

Gib NUR den vollständigen aktualisierten Markdown-Dateiinhalt aus. Kein erklärender Text, keine Code-Fences.`
  }],
});

let updatedContent = response.content[0].text.trim();
updatedContent = updatedContent.replace(/^```(?:markdown)?\n/, '').replace(/\n```$/, '');

fs.writeFileSync(ARTICLE_FILE, updatedContent);
console.log('Artikel aktualisiert.');

// Ping Google and Bing
await Promise.allSettled([
  fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent('https://frankfurt-ai.de/sitemap.xml')}`),
  fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent('https://frankfurt-ai.de/sitemap.xml')}`),
]);
console.log('Google und Bing gepingt.');
console.log(`\nFertig — /blog/ki-aktuelle-entwicklungen/ aktualisiert.`);
