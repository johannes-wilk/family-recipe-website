# 🔐 GitHub OAuth Setup für Netlify CMS

Diese Anleitung erklärt, wie du GitHub OAuth für das Netlify CMS einrichtest. Dies ist die moderne, empfohlene Methode (Netlify Identity ist veraltet).

---

## 📋 Überblick

**Was wird eingerichtet:**
- GitHub OAuth App für Authentifizierung
- Netlify CMS mit GitHub Backend
- Direkte GitHub-Repository-Integration
- Keine externe Authentifizierung nötig

**Vorteile:**
- ✅ Moderne, wartbare Lösung
- ✅ Direkte GitHub-Integration
- ✅ Keine deprecated Features
- ✅ Einfacher für Entwickler
- ✅ Bessere Kontrolle über Berechtigungen

---

## 🚀 Schritt 1: GitHub OAuth App erstellen

### 1.1 OAuth App in GitHub erstellen

1. **Gehe zu GitHub OAuth Apps:**
   ```
   https://github.com/settings/developers
   ```

2. **Klicke auf "New OAuth App"**

3. **Fülle das Formular aus:**
   ```
   Application name: Family Recipe Website CMS
   Homepage URL: https://DEINE-NETLIFY-SITE.netlify.app
   Application description: Admin interface for family recipe website
   Authorization callback URL: https://api.netlify.com/auth/done
   ```
   
   ⚠️ **WICHTIG:** Die Callback URL muss exakt sein:
   ```
   https://api.netlify.com/auth/done
   ```

4. **Klicke "Register application"**

### 1.2 Client Credentials notieren

Nach der Erstellung siehst du:

1. **Client ID**
   - Beispiel: `Iv1.a1b2c3d4e5f6g7h8`
   - Diese ist öffentlich
   - ✅ Notiere sie

2. **Generate a new client secret**
   - Klicke den Button
   - ⚠️ **WICHTIG:** Der Secret wird nur EINMAL angezeigt!
   - Beispiel: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`
   - ✅ Notiere ihn sofort

---

## 🌐 Schritt 2: OAuth in Netlify konfigurieren

### 2.1 Über Netlify UI (Empfohlen)

1. **Gehe zu deinem Netlify Dashboard:**
   ```
   https://app.netlify.com
   ```

2. **Wähle deine Site aus**

3. **Gehe zu Site Settings → Access control → OAuth**

4. **Authentication providers → Install provider**

5. **Wähle "GitHub"**

6. **Füge deine Credentials ein:**
   ```
   Client ID: [Deine Client ID von GitHub]
   Client Secret: [Dein Client Secret von GitHub]
   ```

7. **Klicke "Install"**

### 2.2 Über Netlify CLI (Alternative)

Wenn du die Netlify CLI verwendest:

```bash
# Installiere Netlify CLI (falls nicht vorhanden)
npm install -g netlify-cli

# Login
netlify login

# Link zu deiner Site
netlify link

# Setze OAuth Environment Variables
netlify env:set GITHUB_OAUTH_CLIENT_ID "Iv1.xxxxx"
netlify env:set GITHUB_OAUTH_CLIENT_SECRET "xxxxxx"
```

---

## 🔧 Schritt 3: Netlify CMS Konfiguration prüfen

Die Konfiguration ist bereits korrekt eingestellt in `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: johannes-wilk/family-recipe-website
  branch: master
```

**Erklärung:**
- `name: github` - Nutzt GitHub OAuth Backend
- `repo: johannes-wilk/family-recipe-website` - Dein Repository
- `branch: master` - Der Branch für Commits

---

## 📁 Schritt 4: OAuth Callback Route prüfen

Die Callback-Seite existiert bereits unter:
```
public/admin/callback.html
```

Diese Seite:
- Wird von GitHub nach erfolgreicher Authentifizierung aufgerufen
- Verarbeitet den OAuth-Token
- Leitet zum CMS Dashboard weiter

---

## 🧪 Schritt 5: Testen

### 5.1 Lokal testen (mit npx)

Für lokale Entwicklung kannst du einen Proxy verwenden:

```bash
# Terminal 1: Starte deine Astro Dev Site
npm run dev

# Terminal 2: Starte Netlify CMS Proxy
npx netlify-cms-proxy-server
```

Dann in `public/admin/config.yml` (NUR für lokales Testen):
```yaml
# Temporär für lokales Testen hinzufügen:
local_backend: true
```

**Nach dem Testen:** Entferne `local_backend: true` wieder!

### 5.2 Auf Netlify testen (Production)

1. **Code committen und pushen:**
   ```bash
   git add .
   git commit -m "Setup GitHub OAuth for CMS"
   git push
   ```

2. **Warte auf Netlify Deployment** (~2-3 Minuten)

3. **Öffne Admin-Seite:**
   ```
   https://DEINE-SITE.netlify.app/admin
   ```

4. **Klicke "Login with GitHub"**

5. **GitHub Authorization:**
   - Du wirst zu GitHub weitergeleitet
   - GitHub fragt: "Authorize Family Recipe Website CMS?"
   - Klicke "Authorize"

6. **Zurück zum CMS:**
   - Du wirst automatisch zurück geleitet
   - Das CMS Dashboard öffnet sich
   - Du kannst jetzt Rezepte erstellen!

---

## 👥 Schritt 6: Teammitglieder hinzufügen

### 6.1 Repository Collaborators (Empfohlen für kleine Teams)

1. **Gehe zu GitHub Repository Settings:**
   ```
   https://github.com/johannes-wilk/family-recipe-website/settings/access
   ```

2. **Klicke "Add people"**

3. **Füge GitHub-Usernames hinzu:**
   - Max's GitHub Username
   - Hansi's GitHub Username
   - Flori's GitHub Username
   - Beni's GitHub Username

4. **Setze Berechtigung:**
   - **Write** - Kann Rezepte erstellen/bearbeiten
   - **Admin** - Volle Kontrolle (nur du)

### 6.2 GitHub Organization (Optional für größere Teams)

Wenn du eine GitHub Organization hast:

1. **Erstelle ein Team** (z.B. "Recipe Contributors")
2. **Füge Mitglieder zum Team hinzu**
3. **Gebe dem Team Write-Zugriff auf das Repo**

---

## 🔒 Berechtigungen verstehen

### Was Teammitglieder können:

**Mit CMS:**
- ✅ Rezepte erstellen
- ✅ Eigene Rezepte bearbeiten
- ✅ Alle Rezepte ansehen
- ✅ Bilder hochladen

**Direkt auf GitHub (wenn Collaborator):**
- ✅ Code ansehen
- ✅ Commits in der History sehen
- ✅ Pull Requests erstellen (optional)

### Was sie NICHT können (als Write Collaborator):

- ❌ Repository-Einstellungen ändern
- ❌ Andere Benutzer hinzufügen/entfernen
- ❌ Branch-Schutz ändern
- ❌ Repository löschen

---

## ❓ Häufige Probleme & Lösungen

### Problem: "Error: Failed to load config.yml"

**Lösung:**
- Prüfe ob `public/admin/config.yml` existiert
- Prüfe YAML-Syntax (keine Tabs, nur Spaces!)
- Prüfe Repository-Name ist korrekt

### Problem: "Error: Not Found"

**Lösung:**
- GitHub OAuth App korrekt erstellt?
- Callback URL ist `https://api.netlify.com/auth/done`?
- Client ID/Secret in Netlify eingetragen?

### Problem: "Authentication failed"

**Lösung:**
- Client Secret korrekt kopiert?
- OAuth App ist "Active" in GitHub?
- Netlify Environment Variables gesetzt?

### Problem: "Cannot push to repository"

**Lösung:**
- Bist du im Repository als Collaborator?
- Hast du Write-Berechtigung?
- Repository ist nicht archived/readonly?

### Problem: "Images not uploading"

**Lösung:**
- Ordner `public/images/recipes/` existiert?
- media_folder Konfiguration korrekt?
- Genug Speicherplatz im Repository?

---

## 🔄 Workflow nach Setup

### Für dich (Repository Owner):

1. **Rezept erstellen:**
   - Gehe zu `/admin`
   - Login mit GitHub
   - "New Rezepte" klicken
   - Formular ausfüllen
   - "Publish" klicken

2. **Was passiert:**
   - CMS commited zu GitHub
   - Netlify erkennt neuen Commit
   - Netlify baut Site neu (2-3 Min)
   - Rezept erscheint auf Website

### Für Familienmitglieder:

1. **GitHub Account benötigt**
   - Falls noch nicht vorhanden → bei GitHub registrieren
   - Du fügst sie als Collaborator hinzu

2. **Erstes Login:**
   - Gehe zu `DEINE-SITE.netlify.app/admin`
   - Klicke "Login with GitHub"
   - Authorize die App
   - Dashboard öffnet sich

3. **Rezept erstellen:**
   - Gleicher Workflow wie du
   - "New Rezepte" → Formular → Publish

---

## 🎯 Zusammenfassung

Nach erfolgreicher Einrichtung:

✅ **GitHub OAuth App** erstellt
✅ **Netlify OAuth** konfiguriert (Client ID + Secret)
✅ **CMS Backend** auf GitHub umgestellt
✅ **Callback Route** `/admin/callback` vorhanden
✅ **Netlify Identity** komplett entfernt
✅ **Team kann auf CMS zugreifen** (über GitHub)

---

## 📚 Weitere Ressourcen

- **Netlify CMS Docs:** https://www.netlifycms.org/docs/authentication-backends/
- **GitHub OAuth Apps:** https://docs.github.com/en/developers/apps/building-oauth-apps
- **Netlify OAuth:** https://docs.netlify.com/visitor-access/oauth-provider-tokens/

---

## 🆘 Support

Bei Problemen:

1. **Prüfe Netlify Build Log:**
   - Dashboard → Deploys → Letzter Deploy → Build Log

2. **Prüfe Browser Console:**
   - F12 → Console Tab
   - Fehlermeldungen notieren

3. **Prüfe GitHub OAuth App:**
   - https://github.com/settings/developers
   - Status: Active?
   - Callback URL korrekt?

4. **Prüfe Repository Berechtigungen:**
   - Settings → Collaborators
   - Alle Teammitglieder vorhanden?

---

**Viel Erfolg mit GitHub OAuth! 🎉**

Das ist die moderne, empfohlene Methode für Netlify CMS.
