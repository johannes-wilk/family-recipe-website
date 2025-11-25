# 🚀 Setup Guide für Admin & Kommentare

Dieser Leitfaden erklärt, wie du die Netlify CMS Admin-Oberfläche und das Giscus-Kommentarsystem für deine Rezepte-Website einrichtest.

---

## 📋 Inhaltsverzeichnis

1. [Netlify CMS Admin-Bereich einrichten](#netlify-cms-admin-bereich-einrichten)
2. [Giscus Kommentarsystem konfigurieren](#giscus-kommentarsystem-konfigurieren)
3. [Testen und Fehlerbehebung](#testen-und-fehlerbehebung)
4. [Häufige Probleme](#häufige-probleme)

---

## 🔐 Netlify CMS Admin-Bereich einrichten

### Schritt 1: Netlify Identity aktivieren

1. **Gehe zu deinem Netlify Dashboard**
   - Öffne https://app.netlify.com
   - Wähle deine Website aus

2. **Identity aktivieren**
   - Gehe zu `Site Settings` → `Identity`
   - Klicke auf `Enable Identity`

3. **Registration Einstellungen**
   - Gehe zu `Settings` → `Identity` → `Registration preferences`
   - Wähle **"Invite only"** (nur auf Einladung)
   - Dies verhindert, dass jeder sich registrieren kann

4. **Git Gateway aktivieren**
   - Gehe zu `Settings` → `Identity` → `Services`
   - Klicke auf `Enable Git Gateway`
   - Dies ermöglicht dem CMS, direkt in dein GitHub Repository zu schreiben

### Schritt 2: Benutzer einladen

1. **Teammitglieder einladen**
   - Gehe zu `Identity` Tab in deinem Netlify Dashboard
   - Klicke auf `Invite users`
   - Gib die E-Mail-Adressen deiner Familienmitglieder ein:
     - Max
     - Hansi
     - Flori
     - Beni

2. **Einladung annehmen**
   - Jedes Familienmitglied erhält eine E-Mail
   - Sie müssen auf den Link klicken und ein Passwort setzen
   - Danach können sie sich unter `https://DEINE-WEBSITE.netlify.app/admin` anmelden

### Schritt 3: Admin-Zugang testen

1. **Admin-Seite öffnen**
   ```
   https://DEINE-WEBSITE.netlify.app/admin
   ```

2. **Anmelden**
   - Mit Netlify Identity Credentials
   - Email + Passwort die du gesetzt hast

3. **Erstes Rezept erstellen**
   - Klicke auf "New Rezepte"
   - Fülle alle Felder aus:
     - Titel
     - Beschreibung
     - Bild hochladen (wird in `public/images/recipes/` gespeichert)
     - Autor auswählen (Max, Hansi, Flori, Beni)
     - Cuisine, Schwierigkeit, Zeit, etc.
     - Zutaten (Enter nach jeder Zutat)
     - Zubereitungsschritte
   - Klicke `Publish`
   - Das Rezept wird automatisch zu GitHub committed

### Schritt 4: Wie das CMS funktioniert

**Backend-Konfiguration:**
```yaml
backend:
  name: git-gateway
  branch: main
```
- Nutzt Git Gateway für GitHub-Zugriff
- Commited direkt auf den `main` Branch

**Media Management:**
```yaml
media_folder: "public/images/recipes"
public_folder: "/images/recipes"
```
- Bilder werden in `public/images/recipes/` gespeichert
- Im Frontend unter `/images/recipes/` verfügbar

**Content-Struktur:**
```yaml
folder: "src/content/recipes"
```
- Neue Rezepte werden als Markdown-Dateien in `src/content/recipes/` erstellt
- Astro liest diese automatisch

---

## 💬 Giscus Kommentarsystem konfigurieren

### Schritt 1: GitHub Discussions aktivieren

1. **Gehe zu deinem GitHub Repository**
   ```
   https://github.com/johannes-wilk/family-recipe-website
   ```

2. **Discussions aktivieren**
   - Gehe zu `Settings`
   - Scrolle zu `Features`
   - Aktiviere ✅ **Discussions**

3. **Category für Kommentare erstellen** (optional aber empfohlen)
   - Gehe zum `Discussions` Tab
   - Klicke auf das Zahnrad-Symbol neben Categories
   - Erstelle eine neue Category: **"Rezept-Kommentare"**
   - Format: **Announcement** (damit nur du neue Threads erstellen kannst)

### Schritt 2: Giscus konfigurieren

1. **Besuche https://giscus.app**

2. **Repository eingeben**
   ```
   johannes-wilk/family-recipe-website
   ```

3. **Einstellungen wählen:**

   **Discussion Category:**
   - Wähle "Rezept-Kommentare" (oder "General" wenn du keine eigene Category erstellt hast)

   **Mapping:**
   - ✅ **pathname** (jede URL bekommt eigene Kommentare)

   **Weitere Optionen:**
   - ✅ Reactions aktivieren
   - ✅ Emit metadata deaktivieren
   - Platzierung: **bottom**
   - Theme: **light**
   - Sprache: **de** (Deutsch)

4. **Giscus generiert ein Script**
   Das sieht in etwa so aus:
   ```html
   <script src="https://giscus.app/client.js"
           data-repo="johannes-wilk/family-recipe-website"
           data-repo-id="R_kgDOxxxxxx"
           data-category="Rezept-Kommentare"
           data-category-id="DIC_kwDOxxxxxx"
           ...
   </script>
   ```

### Schritt 3: Giscus IDs in Website einfügen

1. **Kopiere die IDs** aus dem generierten Script:
   - `data-repo-id="R_kgDO..."`
   - `data-category-id="DIC_kwDO..."`

2. **Öffne die Datei:**
   ```
   src/pages/rezepte/[slug].astro
   ```

3. **Ersetze die leeren Werte** (Zeilen ~126-131):
   ```html
   <script 
     src="https://giscus.app/client.js"
     data-repo="johannes-wilk/family-recipe-website"
     data-repo-id="HIER_DEINE_REPO_ID_EINFÜGEN"
     data-category="Rezept-Kommentare"
     data-category-id="HIER_DEINE_CATEGORY_ID_EINFÜGEN"
     ...
   </script>
   ```

4. **Speichern und committen:**
   ```bash
   git add src/pages/rezepte/[slug].astro
   git commit -m "Configure Giscus comment system"
   git push
   ```

### Schritt 4: Kommentare testen

1. **Warte auf Netlify Deployment** (~2-3 Minuten)

2. **Öffne ein Rezept**
   ```
   https://DEINE-WEBSITE.netlify.app/rezepte/spaghetti-carbonara
   ```

3. **Scrolle zum Kommentarbereich**
   - Du solltest jetzt die Giscus-Kommentarbox sehen
   - Mit GitHub-Account kannst du kommentieren
   - Besucher können ohne Login lesen

---

## 🧪 Testen und Fehlerbehebung

### Admin-Bereich testen

**Lokales Testen (nicht möglich):**
- Netlify Identity funktioniert nur auf der deployed Website
- Lokales Testen von `/admin` zeigt nur die Login-Seite

**Auf Netlify testen:**
```bash
1. Code committen und pushen
2. Warten bis Netlify deployment fertig ist
3. https://DEINE-WEBSITE.netlify.app/admin öffnen
4. Mit Netlify Identity anmelden
5. Neues Rezept erstellen
```

### Kommentare testen

**Lokales Testen:**
```bash
npm run dev
# Öffne http://localhost:4321/rezepte/REZEPTNAME
# Kommentare werden geladen (wenn Giscus korrekt konfiguriert)
```

**Auf Netlify testen:**
```bash
# Nach deployment
https://DEINE-WEBSITE.netlify.app/rezepte/REZEPTNAME
# Teste ob Kommentare angezeigt werden
```

---

## ❓ Häufige Probleme

### Admin-Bereich

**Problem: "Unable to load entries"**
- ✅ Lösung: Git Gateway aktivieren in Netlify Settings → Identity → Services

**Problem: "Login failed"**
- ✅ Lösung: Netlify Identity korrekt aktiviert?
- ✅ Lösung: Benutzer eingeladen und Einladung akzeptiert?

**Problem: "Bilder werden nicht hochgeladen"**
- ✅ Lösung: Der Ordner `public/images/recipes/` muss existieren
- ✅ Lösung: Git Gateway muss aktiviert sein

**Problem: "Änderungen erscheinen nicht auf der Website"**
- ✅ Lösung: Warte auf Netlify Build (2-5 Minuten)
- ✅ Lösung: Check Build Log in Netlify Dashboard

### Kommentare

**Problem: "Kommentare werden nicht geladen"**
- ✅ Lösung: GitHub Discussions aktiviert?
- ✅ Lösung: Giscus IDs korrekt eingefügt?
- ✅ Lösung: Repository ist public?

**Problem: "giscus is not installed error"**
- ✅ Lösung: Gehe zu giscus.app
- ✅ Lösung: Installiere Giscus app auf deinem Repository
- ✅ Lösung: Link: https://github.com/apps/giscus

**Problem: "Keine Kommentar-Box sichtbar"**
- ✅ Lösung: JavaScript im Browser aktiviert?
- ✅ Lösung: Browser-Console auf Fehler prüfen (F12)

---

## 📚 Zusätzliche Ressourcen

- **Netlify CMS Dokumentation:** https://www.netlifycms.org/docs/
- **Netlify Identity Docs:** https://docs.netlify.com/visitor-access/identity/
- **Giscus Dokumentation:** https://giscus.app/
- **GitHub Discussions:** https://docs.github.com/en/discussions

---

## 🎯 Zusammenfassung

Nach erfolgreicher Einrichtung hast du:

✅ **Admin-Bereich** bei `/admin`
- Nur für eingeladene Benutzer zugänglich
- Rezepte erstellen, bearbeiten, löschen
- Bilder hochladen
- Automatische Git commits

✅ **Kommentar-System** auf jeder Rezeptseite
- Öffentlich lesbar
- Kommentieren mit GitHub-Account
- Spam-Schutz durch GitHub
- Automatische Benachrichtigungen

---

**Viel Erfolg mit deiner Familienküche! 🍳**
