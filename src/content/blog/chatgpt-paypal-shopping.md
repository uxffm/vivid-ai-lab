---
title: "So läuft das Einkaufen über ChatGPT mit PayPal"
description: "Erfahren Sie, wie ChatGPT Shopping mit PayPal funktioniert und was die Integration für Nutzer und Händler bedeutet."
author: "KI Agentur Frankfurt"
date: "2025-11-10"
category: "KI-Shopping"
readTime: "12 min Lesezeit"
image: "/paypal-chatgpt.png"
---

# So läuft das Einkaufen über ChatGPT mit PayPal

## Wie funktioniert das Einkaufen über ChatGPT?

Wenn du ChatGPT nach einem Produkt fragst („Zeig mir einen Keramik-Kaffeebecher"), schlägt es dir passende Angebote vor. Unterstützt ein Produkt „Instant Checkout", bekommst du einen „Kaufen"-Button direkt im Chat. Ein Beispiel ist ChatGPTs Anzeige für ein Keramik-Geschirr-Set von Etsy (mit Preis und „Buy"-Button). Klickst du darauf, bestätigt ChatGPT noch deine Lieferadresse und Zahlungsart, und der Kauf geht automatisch durch. Du verlässt die ChatGPT-App dafür nicht. Alles läuft in einem Fenster ab.

![ChatGPT zeigt Produktdetails im Chat mit Kauf-Button („Buy") für Instant Checkout (hier ein Frühstücks-Set).](/paypal-chatgpt-2.png)

ChatGPT zeigt Produktdetails im Chat mit Kauf-Button („Buy") für Instant Checkout (hier ein Frühstücks-Set).

## Wie PayPal technisch eingebunden wird

ChatGPT nutzt ein offenes System namens „Agentic Commerce Protocol" (ACP), das von OpenAI und Stripe gemeinsam entwickelt wurde. Dieses Protokoll verbindet ChatGPT mit Shops und Bezahldiensten. PayPal schließt sich diesem Standard an – nicht über Stripe, sondern direkt. Technisch heißt das: Wenn du demnächst im Chat mit PayPal bezahlen willst, greift ChatGPT auf PayPals eigene ACP-Schnittstelle zu. PayPal hat einen eigenen ACP-Server, der Millionen Händler anbinden kann, ohne dass jeder einzeln etwas programmieren muss.

Wenn du einen Kauf bestätigst und „PayPal" auswählst, wird die Zahlungsabwicklung über PayPal laufen (inklusive deiner gespeicherten Karten, Bankkonto oder PayPal-Guthaben). OpenAI nennt das eine „delegated payments API" – ChatGPT fragt PayPal im Hintergrund an und PayPal verarbeitet dann die Zahlung, so wie du es sonst aus Online-Shops kennst. Mit anderen Worten: ChatGPT gibt nur Auftrag und Betrag weiter; die Bezahlung läuft über PayPal selbst ab, nicht über Stripe oder OpenAI. Die Informationen werden per sicheren Token übermittelt, sodass Karte oder Konto nicht im Klartext herumgereicht werden.

## Beteiligte Plattformen und Zusammenarbeit

Bisher arbeiten OpenAI, Etsy, Shopify und Stripe eng zusammen. Etsy war der erste Marktplatz: US-Chats können seit Herbst 2025 Produkte von Etsy-Sellern direkt kaufen. Shopify folgt: Millionen Shops auf Shopify – von großen Marken bis zu kleinen Läden – werden ebenfalls über ChatGPT erreichbar sein. Shopify stellt dafür Produktdaten (Bilder, Preise, Lagerbestand) in Echtzeit bereit, so dass ChatGPT passende Artikel präsentieren kann. Wenn Käufer klicken, fließen die Bestellungen direkt ins Shopify-Admin-Panel; der Händler bleibt Verkäufer und behält Kontakt zum Kunden, während Shopify und ChatGPT nur die Abwicklung erleichtern.

Stripe ist der technische Partner für Zahlungen: Ursprünglich erfolgt die Bezahlung über Stripe (und Apples/Google Pay, etc.). Händler, die Stripe nutzen, können laut OpenAI mit einer einzigen Codezeile „ChatGPT-Zahlungen" aktivieren. Auch Händler mit anderen Anbietern können mitmachen – sie können Stripes neuen Shared-Payment-Token verwenden oder das ACP-Delegated-Payments-Verfahren einbinden. Das heißt: Egal welchen Zahlungsdienst ein Shop jetzt schon hat, er kann über ACP an ChatGPT andocken.

Vertraglich zahlen die Händler eine kleine Gebühr pro über ChatGPT abgeschlossenen Kauf an OpenAI. Kunden zahlen nichts extra – der Service ist für Käufer kostenlos. Hinter den Kulissen gibt es sicher Verträge und Regeln: Beispielsweise haben Etsy und Shopify öffentlich erklärt, dass ihre Händler Teil des ChatGPT-Netzwerks werden können. Genauere Einzelheiten der Verträge kennen wir nicht, aber klar ist: Die Händler bleiben bei ihren gewohnten Partnern (Etsy oder Shopify) registriert, und OpenAI verlangt nur eine Provision auf den Chat-Verkauf.

## Pilotprojekte in Europa und Deutschland

Bisher gab es nur offizielle Angebote in den USA. Seit Herbst 2025 können US-Nutzer via ChatGPT in Chat von US-Etsy-Stores einkaufen, bald mit Shopify-Shops. OpenAI plant aber, das System auf weitere Länder auszuweiten. Tatsächlich wurde „ChatGPT Shopping" (also die Produktsuche in ChatGPT) im Frühjahr 2025 auch in Deutschland gestartet. Dort können Nutzer bereits Produktvorschläge (zum Beispiel von Amazon oder MediaMarkt) direkt im Chat sehen und vergleichen.

Ein echter Testkauf per ChatGPT ist in Europa aber noch nicht möglich. Das Instant-Checkout-System läuft bislang nur mit US-Anbietern und Zahlungen in US-Dollar. OpenAI hat angekündigt, bald weitere Regionen zu öffnen, wahrscheinlich erst nach weiteren Tests. Konkrete Pilotprojekte in Deutschland sind noch nicht bekannt – nur das Produkt-Suchfeature (ohne Checkout) wurde hierzulande eingeführt.

## Voraussetzungen für Händler

Möchtest du als Händler über ChatGPT verkaufen, brauchst du in erster Linie:

### Geeignete Zahlungsanbieter
Dein Shop muss eine unterstützte Zahlungsart anbieten. Aktuell sind das Kredit-/Debitkarten, Apple Pay, Google Pay oder Stripe Link. PayPal wird erst 2026 dazukommen. Viele Händler auf Etsy oder Shopify bieten diese Optionen schon an. Wenn du PayPal-Käufer anlocken willst, reicht es, dass du PayPal schon nutzt – OpenAI holt sich dann diese Shops über PayPals Netz einfach mit dazu.

### Technische Integration
Du musst dein Sortiment (einen Produkt-Feed) bereitstellen und das ACP-Protokoll implementieren, damit ChatGPT deine Artikel findet und Bestellungen weiterleiten kann. Das bedeutet: Deinen Shop verknüpfen – etwa mit einer kurzen Code-Änderung in Stripe oder über OpenAI-Tools. Aber: Bist du schon bei Shopify oder Etsy, brauchst du fast nichts zu tun: Diese Plattformen sind automatisch angeschlossen. Die Händler müssen nur angeben, dass sie mitmachen wollen.

### Zulassung und Gebühren
Du bewirbst dich beim ChatGPT-Programm (es gibt ein Online-Formular). Nach Prüfung bekommst du grünes Licht. Ab dann können Kunden dein Sortiment im Chat sehen. Für jeden Kauf über ChatGPT zahlst du eine kleine Gebühr an OpenAI. Üblich sind auch normale Zahlungsgebühren (an Stripe, PayPal etc.), genau wie in einem regulären Onlineshop. Angeblich beeinflusst das den Endpreis für Kunden nicht – der Käufer zahlt denselben Preis wie im Shop.

## Datenschutz und Datenweitergabe beim Bezahlen

Wenn du über ChatGPT einkaufst, bleibt deine Privatsphäre gewahrt. OpenAI sagt, nur die nötigsten Daten werden geteilt. Damit du bezahlen kannst, muss der Shop lediglich wissen, wohin geliefert werden soll. Deine Zahlungsdetails (Kreditkartennummer, PayPal-Login etc.) werden nicht an den Händler oder an OpenAI weitergegeben – sie gehen direkt an die Zahlungspartner (Stripe oder PayPal). Die Zahlungen laufen sicher mit verschlüsselten Token ab.

Konkret: Wenn du per ChatGPT bezahlst, erhält der Händler die Bestelldaten wie Artikel, Versandadresse und deine E-Mail (für den Beleg), so wie er es auch sonst von sich aus bekommen würde. ChatGPT hält sich dabei nur an das, was zur Abwicklung nötig ist. OpenAI betont: „Users stay in control — they explicitly confirm each step." Du bestätigst jeden Kauf selbst. Die Zahlung läuft „direkt an den Anbieter, nicht über OpenAI" ab – OpenAI speichert also keine Kreditkartennummern.

Bei PayPal-Zahlungen gilt Ähnliches: Dein ChatGPT-Account kann sich mit deinem PayPal-Konto verknüpfen (oder du meldest dich bei PayPal ein), und dann wird wie gewohnt über PayPal abgerechnet. PayPal bietet dabei seine üblichen Datenschutz- und Käuferschutzfunktionen. ChatGPT teilt nur die minimale Information – etwa, dass du bezahlt hast und wo geliefert wird. Solltest du in der EU unterwegs sein, gelten zusätzlich die üblichen Regeln (z.B. DSGVO): OpenAI darf etwa nicht ohne Erlaubnis deine Kaufdaten für Werbung nutzen. OpenAI selbst teilt oder verkauft deine Zahlungsdaten nicht an andere – der Datenschutz wird also ähnlich gehandhabt wie bei normalen Online-Einkäufen.

Zahlungsmethoden in ChatGPT: Käufer können z.B. Kreditkarte, Apple Pay, Google Pay oder Stripe Link verwenden. (PayPal kommt 2026.)

## Was ändert sich mit der PayPal-Integration für Nutzer?

Mit der PayPal-Integration ab 2026 wird ChatGPT ein noch vertrauterer Ort zum Shoppen. Für dich als Nutzer bedeutet das vor allem: Du kannst an der Kasse nun dein gewohntes PayPal-Wallet verwenden – inklusive aller Zahlungsquellen (Bank, Guthaben, verknüpfte Karten). Das macht es einfacher und sicherer, wenn du gerne mit PayPal zahlst. Anstatt Kreditkarteninfos einzugeben, wählst du im Chat einfach „PayPal". Möglicherweise musst du dich einmalig bei PayPal anmelden, danach geht der Checkout mit „einem Klick" und mit den üblichen Käuferschutz-Regeln.

Auch sehen sich Nutzer vermutlich mehr Angebote an: Über PayPals Netzwerk werden Millionen zusätzlicher Shops und Produkte in ChatGPT buchbar. Das heißt, ChatGPT kann dir Produkte aus noch mehr Läden anzeigen, die du mit deinem PayPal-Konto bezahlen kannst. Die Schritte bleiben kinderleicht: ChatGPT zeigt wieder die Vorschläge, du klickst auf kaufen und wählst PayPal. Danach laufen Sendungsverfolgung oder Rückgabeabwicklung im Hintergrund über PayPal und den Händler wie gewohnt ab. Insgesamt wird der Einkaufsprozess bequemer und vertrauter für alle PayPal-Nutzer – alle gewohnten PayPal-Services wie Käuferschutz und Sendungsverfolgung stehen im Chat zur Verfügung.

## Zusammenfassung

ChatGPT integriert PayPal direkt ins Einkaufen. Statt aktuell nur Karten oder Apple/Google Pay nutzen zu können, haben künftige Nutzer im Chat eine „Bezahlen mit PayPal"-Option. Das macht den Kauf im Chat persönlicher und bringt zusätzliche Sicherheit – ohne, dass die technische Abwicklung komplizierter wird.

---

*Quellen: OpenAI und Partner haben Presseinfos und Entwicklerdokumente veröffentlicht auf [openai.com](https://openai.com), [etsy.com](https://etsy.com), [shopify.com](https://shopify.com), [techcrunch.com](https://techcrunch.com), [computerbase.de](https://computerbase.de). Alle Aussagen stammen aus diesen offiziellen Ankündigungen.*
