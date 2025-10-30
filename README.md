# 🍳 Familienküche - Recipe Website

Eine moderne, mobile-freundliche Rezeptwebsite für die Familie, gehostet auf Netlify mit Astro, TailwindCSS und Netlify CMS.

## 📋 Features

- ✨ Modernes, minimalistisches Design mit Pastel-Farbpalette
- 📱 Vollständig responsive und mobile-first
- 🔍 Client-seitige Suche (Titel, Zutaten, Küche)
- 🏷️ Filter-Optionen (Cuisine, Schwierigkeit, Diät-Präferenzen)
- 👥 Contributor-spezifische Sektionen mit individuellen Farben
- 💬 Kommentar-System via Giscus (GitHub Discussions)
- 🔐 Passwortgeschützter Admin-Bereich für Rezept-Uploads
- 📝 Netlify CMS für einfaches Content-Management
- ⚡ Statische Site-Generierung mit Astro

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) - Static Site Generator
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **CMS:** [Netlify CMS](https://www.netlifycms.org/)
- **Kommentare:** [Giscus](https://giscus.app/)
- **Hosting:** [Netlify](https://www.netlify.com/)
- **Fonts:** Google Fonts (Playfair Display, Inter)

## 📁 Projektstruktur

```
recipe-website/
├── public/
│   ├── admin/                # Netlify CMS Admin Panel
│   │   ├── config.yml       # CMS Konfiguration
│   │   └── index.html       # Admin Interface
│   └── images/
│       └── recipes/         # Rezeptbilder
├── src/
│   ├── components/          # Wiederverwendbare Komponenten
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── RecipeCard.astro
│   │   └── SearchBar.astro
│   ├── content/
│   │   ├── config.ts        # Content Collection Schema
│   │   └── recipes/         # Rezept Markdown-Dateien
│   ├── layouts/
│   │   └── BaseLayout.astro # Basis Layout
│   ├── pages/
│   │   ├── index.astro      # Startseite
│   │   ├── rezepte/         # Rezeptseiten
│   │   ├── kochen.astro     # Köche-Übersicht
│   │   └── impressum.astro  # Impressum
│   ├── styles/
│   │   └── global.css       # Globale Styles
│   └── types.ts             # TypeScript Typen
├── astro.config.mjs         # Astro Konfiguration
├── tailwind.config.mjs      # TailwindCSS Konfiguration
├── netlify.toml             # Netlify Konfiguration
└── package.json             # Dependencies
```

## 🚀 Lokale Installation

### Voraussetzungen

- Node.js 18 oder höher
- npm oder yarn

### Installation

1. **Dependencies installieren:**
   ```bash
   cd recipe-website
   npm install
   ```

2. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```

3. **Website öffnen:**
   - Öffne [http://localhost:4321](http://localhost:4321) im Browser

## 📦 Build für Produktion

```bash
npm run build
```

Die statischen Dateien werden im `dist/` Ordner generiert.

### Vorschau des Production Builds

```bash
npm run preview
```

## 🌐 Deployment auf Netlify

### Methode 1: Automatisches Deployment via Git

1. **Repository auf GitHub erstellen**
   - Erstelle ein neues GitHub Repository
   - Pushe deinen Code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/USERNAME/REPO-NAME.git
     git push -u origin main
     ```

2. **Mit Netlify verbinden**
   - Gehe zu [netlify.com](https://www.netlify.com/) und melde dich an
   - Klicke auf "Add new site" → "Import an existing project"
   - Wähle GitHub und autorisiere Netlify
   - Wähle dein Repository aus
   - Build-Einstellungen werden automatisch erkannt (`netlify.toml`)
   - Klicke auf "Deploy site"

3. **Netlify Identity aktivieren**
   - Gehe zu Site Settings → Identity
   - Klicke auf "Enable Identity"
   - Gehe zu Settings → Registration preferences
   - Wähle "Invite only"
   - Gehe zu "Services" → "Git Gateway" und aktiviere es

4. **Admin-Benutzer einladen**
   - Gehe zu Identity → "Invite users"
   - Gib E-Mail-Adressen deiner Familienmitglieder ein
   - Sie erhalten Einladungs-E-Mails mit Zugangslinks

### Methode 2: Manuelles Deployment

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🔧 Konfiguration

### Contributor-Namen anpassen

Bearbeite `src/types.ts`:

```typescript
export const contributors: Contributor[] = [
  { name: 'Dein Name 1', color: 'pastel-green', bgColor: 'bg-pastel-green' },
  { name: 'Dein Name 2', color: 'terracotta', bgColor: 'bg-terracotta' },
  { name: 'Dein Name 3', color: 'mustard', bgColor: 'bg-mustard' },
  { name: 'Dein Name 4', color: 'dusty-blue', bgColor: 'bg-dusty-blue' }
];
```

Aktualisiere auch die Namen in `public/admin/config.yml`:

```yaml
- { label: "Autor", name: "author", widget: "select", options: ["Name1", "Name2", "Name3", "Name4"] }
```

### Giscus Kommentare einrichten

1. **GitHub Repository für Discussions vorbereiten**
   - Gehe zu deinem Repository Settings → General
   - Scrolle zu "Features" und aktiviere "Discussions"

2. **Giscus konfigurieren**
   - Besuche [giscus.app](https://giscus.app/)
   - Folge den Schritten zur Konfiguration
   - Kopiere die generierten Parameter

3. **Parameter in die Website einfügen**
   - Bearbeite `src/pages/rezepte/[slug].astro`
   - Ersetze die Platzhalter im Giscus-Script:
     ```html
     <script src="https://giscus.app/client.js"
       data-repo="DEIN_GITHUB_USERNAME/DEIN_REPO_NAME"
       data-repo-id="DEIN_REPO_ID"
       data-category="Rezept-Kommentare"
       data-category-id="DEINE_CATEGORY_ID"
       ...
     </script>
     ```

### Rezeptbilder hinzufügen

Bilder sollten in `public/images/recipes/` gespeichert werden:

1. Erstelle das Verzeichnis (falls nicht vorhanden)
2. Füge Bilder hinzu (z.B. `carbonara.jpg`, `thai-curry.jpg`)
3. Referenziere sie in Rezepten als `/images/recipes/DATEINAME.jpg`

**Empfohlene Bildgröße:** 1200x800px (Seitenverhältnis 3:2)

## 📝 Rezepte hinzufügen

### Via Netlify CMS (Empfohlen)

1. Navigiere zu `https://deine-website.netlify.app/admin`
2. Melde dich mit deinem Netlify Identity Account an
3. Klicke auf "New Rezepte"
4. Fülle alle Felder aus und lade ein Bild hoch
5. Klicke auf "Publish"
6. Die Website wird automatisch neu gebaut

### Manuell (für Entwickler)

Erstelle eine neue Markdown-Datei in `src/content/recipes/`:

```markdown
---
title: "Rezeptname"
description: "Kurze Beschreibung"
image: "/images/recipes/bild.jpg"
author: "Max"
cuisine: "Italienisch"
difficulty: "Einfach"
prepTime: 30
servings: 4
vegetarian: false
vegan: false
ingredients:
  - "Zutat 1"
  - "Zutat 2"
steps:
  - "Schritt 1"
  - "Schritt 2"
links:
  - text: "Hilfreicher Link"
    url: "https://example.com"
publishDate: 2024-01-15T10:00:00.000Z
---
```

## 🎨 Farben anpassen

Bearbeite `tailwind.config.mjs`:

```javascript
colors: {
  'pastel-green': '#B8E6B8',    // Deine Farbe hier
  'terracotta': '#E3A587',
  'mustard': '#F4D58D',
  'dusty-blue': '#A4C3D2',
  'soft-pink': '#F5C6CB',
}
```

## 🐛 Troubleshooting

### Build schlägt fehl
- Stelle sicher, dass alle Dependencies installiert sind: `npm install`
- Überprüfe die Node.js Version: `node --version` (sollte ≥18 sein)
- Lösche `node_modules` und installiere neu

### Bilder werden nicht angezeigt
- Überprüfe den Pfad (muss mit `/` beginnen)
- Stelle sicher, dass Bilder in `public/images/recipes/` liegen
- Nach lokalem Build: Bilder müssen vor dem Build vorhanden sein

### Netlify CMS funktioniert nicht
- Überprüfe, ob Netlify Identity aktiviert ist
- Stelle sicher, dass Git Gateway aktiviert ist
- Lösche Browser-Cache und versuche es erneut

### TypeScript-Fehler
- Dies ist normal während der Entwicklung ohne installierte Dependencies
- Installiere zuerst: `npm install`
- Fehler sollten nach Installation verschwinden

## 📄 Lizenz

Dieses Projekt ist für private, nicht-kommerzielle Nutzung gedacht.

## 🤝 Beitragen

Dies ist eine private Familienwebsite. Nur autorisierte Familienmitglieder können Rezepte hinzufügen.

## 📞 Support

Bei Fragen oder Problemen kontaktiere den Website-Administrator unter der im Impressum angegebenen E-Mail-Adresse.

---

**Erstellt mit ❤️ für die Familie**
