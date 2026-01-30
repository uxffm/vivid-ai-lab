# Google Sheets Newsletter Integration - Setup Anleitung

## Schritt 1: Google Sheet erstellen

1. Gehen Sie zu https://sheets.google.com
2. Erstellen Sie ein neues Sheet
3. Benennen Sie es z.B. "Newsletter Anmeldungen"
4. In Zeile 1 erstellen Sie folgende Spalten:
   - A1: `Timestamp`
   - B1: `Email`
   - C1: `Quelle`

## Schritt 2: Apps Script erstellen

1. In Ihrem Google Sheet: **Erweiterungen** → **Apps Script**
2. Löschen Sie den vorhandenen Code
3. Fügen Sie folgenden Code ein:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Neue Zeile hinzufügen
    sheet.appendRow([
      new Date(),
      data.email,
      data.source || 'Unknown'
    ]);

    // CORS Headers für Astro
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return doPost(e);
}
```

4. Klicken Sie auf **Speichern** (Disketten-Symbol)

## Schritt 3: Apps Script deployen

1. Klicken Sie auf **Bereitstellen** → **Neue Bereitstellung**
2. Klicken Sie auf das Zahnrad-Symbol → **Web-App** auswählen
3. Einstellungen:
   - **Beschreibung**: Newsletter Integration
   - **Ausführen als**: Ich
   - **Zugriff**: Jeder
4. Klicken Sie auf **Bereitstellen**
5. **Kopieren Sie die Web-App-URL** (wichtig!)

## Schritt 4: URL in der Website einfügen

Die kopierte URL müssen Sie in die Umgebungsvariable einfügen:

1. Erstellen Sie eine `.env` Datei im Projektroot (falls noch nicht vorhanden)
2. Fügen Sie hinzu:
   ```
   [PUBLIC_GOOGLE_SHEETS_URL=ihre-apps-script-url-hier](https://script.google.com/macros/s/AKfycbyqr4_LZGvdO53W7tpz3rHk0zGhiH3_txlPPyiIkYRPVvB2uaaxerGrUUGZfIESgrMl/exec)
   ```

**WICHTIG:** Die URL sieht ungefähr so aus:
```
https://script.google.com/macros/s/AKfycby.../exec
```

## Fertig!

Jetzt werden alle Newsletter-Anmeldungen automatisch in Ihrem Google Sheet gespeichert.

### Testen

Nach dem Setup können Sie testen:
1. Starten Sie die Website neu (`npm run dev`)
2. Geben Sie eine Test-E-Mail ein
3. Prüfen Sie Ihr Google Sheet - dort sollte die E-Mail erscheinen
