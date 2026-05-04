---
title: "KI-Entwicklungen im Mai 2026"
date: "2026-05-04"
readTime: "10 min"
---

## Google Deep Research Max: Autonome Recherche mit Vorbehalten

Google hat Deep Research Max vorgestellt – einen autonomen Forschungsagenten, der eigenständig Berichte auf Expertenniveau verfasst. Die Ankündigung wurde in der Community mit gemischten Reaktionen aufgenommen.

Erste praktische Tests zeigen erhebliche Einschränkungen: Das System halluziniert Zitate und übersieht nuancierte Widersprüche in Quellen. User berichten, dass tiefere Branchenkenntnisse übersehen werden – typischerweise wird etwa die Hälfte des generierten Berichts manuell überarbeitet. Die Kosten sind ebenfalls Kritik-Punkt: 20 US-Dollar für einen brauchbaren Bericht ist für viele zu viel, wenn manuelle Nachbearbeitung nötig ist.

Fazit der Community: Gut für erste Drafts und Exploration, aber nicht für mission-critical Anwendungen geeignet. Claude und ChatGPT schneiden in vergleichbaren Tests deutlich besser ab.

## RobotEra L7: Tausende Humanoid-Roboter in Logistik-Zentren

RobotEra kündigte an, tausende L7 Humanoid-Roboter über 10+ Logistik-Zentren zu verteilen für Sortieraufgaben. Das Post erreichte über 950 Punkte und löste intensive Community-Debatte aus.

Kritische Stimmen hinterfragen die praktische Implementierung: Warum humanoid Roboter für Sortieraufgaben verwenden, wenn spezialisierte Conveyor-Belt-Systeme seit Jahrzehnten deutlich effizienter sind? Ein User zeigte sich frustriert: "Nur eine Förderanlage, die rausgeht – wo ist die Sortierung?"

Die Verteidiger argumentieren pragmatisch: Dies ist ein Proof-of-Concept, das Mobilität, Vision und grundlegende Funktionalität demonstriert. Fortschritt entsteht nicht durch 0-zu-100 Sprünge, sondern durch iterative 5%-Verbesserungen. Das Sub sei zu pessimistisch bei jeder neuen Demo.

## ECCV 2026: Debatte über Review-Qualität in der Computer Vision

Die Konferenz-Community diskutiert intensiv die Qualität von eingereichten Peer Reviews für ECCV 2026. Die Meta-Frage: Sind Reviews AI-generiert?

Mehrere Paper-Einreicher berichten von unprofessionellem Feedback: Ein Reviewer verwechselt Supervised und Self-Supervised Learning, ein anderer verstehen CLIP nicht richtig. Ein User fasst zusammen: "Reviewer 2 hat das Paper offensichtlich nicht gelesen. Einige Kommentare sind wirklich dumm zu beantworten."

Bemerkenswert: Die Review-Qualität scheint gegenüber CVPR 2026 gesunken zu sein. User spekulieren, dass LLM-generierte Reviews eine Rolle spielen könnten – ein Meta-Moment, in dem KI-Kritik über KI-Arbeiten selbst unter Verdacht gerät.

## ChatGPT-Bilder: "Normal on Surface, Terrifying on Closer Inspection"

Ein virales ChatGPT-Post forderte das Modell auf, Bilder zu generieren, die an der Oberfläche normal aussehen, aber erschreckend werden, wenn man sie genauer untersucht. Das Post erreichte über 3000 Punkte.

Die generierten Bilder waren verstörend-kreativ: Augen die leicht zu leuchten begannen, seltsame Markierungen an Wänden, geometrische Unmöglichkeiten. User repliziert die Prompts mit Variationen ("avoid clichés") und teilten ihre eigenen unheimlichen Kreationen.

Das Phänomen zeigt ChatGPTs Fähigkeit, stilistische Nuancen zu verstehen und subtile Horror-Elemente zu integrieren – eine überraschend konsistente Interpretation eines komplexen, mehrstufigen visuellen Briefs.

## Vibecoding: Die Kurve der Programmierer-Erleuchtung

Aus r/LocalLLaMA trendete ein Meme über die "Vibecoding Learning Curve" – eine Parody auf die Dunning-Kruger-Kurve, die verschiedene Phasen der KI-basierten Programmierung zeigt.

Die Community identifiziert sich mit den Phasen:
- Peak of Stupidity: "Bin ein Genie, das Modell schreibt meinen Code!"
- Valley of Despair: "Das Modell versteht nichts und ist nutzlos"
- Slope of Enlightenment: "OK, das Modell ist großartig, aber nur wenn ich selbst gut Code schreiben kann"

Kernaussage eines erfahrenen Vibecoder: "Das Modell ersetzt nicht das Verständnis dafür, was man eigentlich bauen will." Für Anfänger ist KI-gestützte Entwicklung eher verhängnisvoll, für erfahrene Programmierer ist es transformativ.

## Mistral Medium 3.5 128B: Die nächste Generation lokaler KI-Modelle

Mistral AI hat ein neues Flaggschiff-Modell vorgestellt: Mistral Medium 3.5 mit 128 Milliarden Parametern als dichtes (Dense) Modell mit 256k Context Window. Das Modell vereint Instruction-Following, Reasoning und Coding in einem einzigen Satz Gewichte und ersetzt seine Vorgänger Mistral Medium 3.1 und Magistral.

In der Community wird das Modell als "Chonker" diskutiert – ein dichtes 128B-Modell ist ungewöhnlich und könnte Inferenz-Herausforderungen mit sich bringen. Dennoch zeigen erste Tests Interesse: User berichten von 3-8 Tokens pro Sekunde Generierungsgeschwindigkeit bei Q4-Quantisierung, was für ein solch großes Modell überraschend praktikabel ist. Die Diskussion konzentriert sich auf die Dichte-vs.-Größe-Trade-offs und ob dies eine neue Kategorie im Local-LLM-Markt etabliert.

## Claude Opus 4.7: Debatte um möglichen Model Collapse

Die Anthropic-Community zeigt sich besorgt über wahrgenommene Qualitätseinbußen in Claude Opus 4.7. Einige User berichten von gedächtnislosen Reaktionen und Inkohärenz, besonders bei Code-Aufgaben. Während Anthropic-Befürworter argumentieren, dass viele immer noch erfolgreich mit Sonnet 4.6 arbeiten, deuten andere auf strukturelle Probleme hin.

Interessante Hypothese: Das Modell könnte unter Kosten-Optimierungsdruck entwickelt worden sein, wobei Attention-Mathematik durch lineare Approximationen ersetzt wurde – bekannt aus Open-Source-Modellen. Das Problem wird verschärft durch Anthropic's "adaptive effort"-Mechanismus: Das Modell versucht intelligent, seinen Aufwand zu dosieren, könnte aber zu Ecken sparen neigen. Ein User fasst es als "Enshitification" zusammen – das ehemalig so gewissenhafte Modell erbringt jetzt "gerade eben noch akzeptable" Leistung, um Kosten zu sparen.

Fachleute weisen auch auf den Kontext-Overhead hin: Anthropic habe zu viele Features auf einmal in Claude Code integriert, was das Modell überfordert und Kontext-Raum verschluckt.

## Die "Goblin-Phase" von ChatGPT: KI als weird alien mind

ChatGPT entwickelte eine merkwürdige Obsession mit Goblins und Gremlins – ein Phänomen, das tausende User beobachtet und dokumentiert haben. Das Modell beschreibt regelmäßig Szenarien aus der Perspektive von Goblinen oder bezieht sich wiederholt auf sie, selbst wenn die Anfrage überhaupt nichts damit zu tun hat.

Die Community reagiert mit humorvoller Faszination. Ein User stellte fest: "Normal program does something weird: we must debug this" vs. "AI does something weird: please don't do that, k thx bye." Ein anderer vermisst bereits die Goblin-Phase und sammelte Screenshots von Dutzenden Goblin-Referenzen in seinen ChatGPT-Chats. Das Phänomen unterstreicht, wie fremd und nicht vollständig vorhersehbar KI-Verhaltensweisen noch immer sind – wie echte "alien minds" in unserem Ökosystem.

## Technische Diskussion: Warum Reasoning nicht in Vector Space stattfindet

Eine heiße akademische Debatte spaltet die MachineLearning-Community: Warum machen LLMs ihre Reasoning nicht direkt im Latent-Space statt in natürlicher Sprache?

Die Antworten offenbaren tiefe technische Realitäten:

- **Latentes Reasoning existiert schon:** Tatsächlich findet viel Berechnung bereits im Vector-Space statt; Text-Reasoning ist nur die sichtbare Spur, nicht der Kern-Mechanismus
- **Debuggability-Problem:** Hidden Vector-Space-Reasoning ist undurchschaubar. Wenn etwas kaputt geht, können Sie nicht sehen warum. Text-Basiertes Reasoning ist nachverfolgbar
- **Auto-regressive Architektur:** LLMs sind auto-regressiv (token-für-token). Diffusion-LLMs könnten besser für direkte Vector-Space-Reasoning geeignet sein
- **Training-Challenge:** Post-Training erfolgt auf Reasoning-Traces (Text). Wie trainiert man auf abstrakte Vector-Spaces?
- **Bewährter Weg:** Chain-of-Thought-Prompting funktioniert empirisch besser als alte "direkt die Antwort generieren"-Ansätze

Forschung zu Looped-LLMs und RNN-ähnlichen Architekturen zeigt, dass diese Frage noch nicht gelöst ist – aber aktiv erforscht wird.

## Weitere Entwicklungen in Kürze

- **IBM schafft 750 neue AI- und Quantum-Jobs** in seinem Chicago-Hub und signalisiert weitere Investitionen in KI-Infrastruktur
- **Unitree präsentiert Fußball-spielenden Roboter** – ein Football-spielender Robot für futuristische, cyberpunk-style Matches
- **Sicherheits- und Existenzrisiko-Debatte:** Geoffrey Hinton und Max Tegmark diskutieren mit Bernie Sanders über AI-Extinction-Risks; Tegmark warnt vor noch höheren Wahrscheinlichkeiten als Hinton's 10-20%-Schätzung
- **Claude Word Add-In** begeistert User mit neuer Utility für Microsoft Word Integration