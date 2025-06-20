# 🇪🇺 EU-Gesetzes Navigator

Ein automatisch aktualisierter Navigator für EU-Verordnungen und deutsche Gesetze mit GitHub Actions Integration.

![EU-Gesetzes Navigator](https://img.shields.io/badge/EU--Gesetzes-Navigator-blue)
![Auto-Update](https://img.shields.io/badge/Auto--Update-täglich-green)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-orange)

## 🚀 Features

- **Automatische tägliche Updates** um 6:00 Uhr MEZ
- **EU-Verordnungen**: GDPR, AI Act, DSA, Geldwäscheverordnung
- **Deutsche Gesetze**: GwG, KWG, ZAG, AWG, StGB und mehr
- **Intelligente Suchfunktion** mit Highlighting
- **Responsive Design** für alle Geräte
- **Robuste Fallback-Strategie** mit informativen Weiterleitungen

## 📋 Schnellstart

### 1. Repository erstellen

```bash
# Repository clonen oder forken
git clone https://github.com/IHR-USERNAME/eu-gesetzes-navigator.git
cd eu-gesetzes-navigator

# Oder neues Repository erstellen
mkdir eu-gesetzes-navigator
cd eu-gesetzes-navigator
git init
```

### 2. Dateien hinzufügen

Kopieren Sie diese Dateien in Ihr Repository:

```
eu-gesetzes-navigator/
├── index.html                           # Haupt-Navigator (reparierte Version)
├── .github/workflows/update-laws.yml    # GitHub Actions Workflow
├── laws/                                # Wird automatisch erstellt
│   ├── last-update.json                # Metadaten (automatisch)
│   ├── eu-aml-2024.html                # EU-Gesetze (automatisch)
│   └── de-*.html                       # Deutsche Gesetze (automatisch)
└── README.md                           # Diese Anleitung
```

### 3. GitHub Pages aktivieren

1. Gehen Sie zu **Settings** → **Pages**
2. Wählen Sie **Source**: `Deploy from a branch`
3. Wählen Sie **Branch**: `main` und **Folder**: `/ (root)`
4. Klicken Sie **Save**

### 4. Konfiguration anpassen

**WICHTIG**: Bearbeiten Sie die `index.html` und ersetzen Sie:

```javascript
// Zeile ~185 in index.html
const GITHUB_CONFIG = {
    username: 'DEIN-GITHUB-USERNAME',      // ⚠️ HIER ANPASSEN
    repository: 'DEIN-REPOSITORY-NAME',    // ⚠️ HIER ANPASSEN
    branch: 'main'
};
```

**Mit Ihren echten Werten:**

```javascript
const GITHUB_CONFIG = {
    username: 'max-mustermann',            // Ihr GitHub Username
    repository: 'eu-gesetzes-navigator',   // Ihr Repository Name
    branch: 'main'
};
```

### 5. Ersten Workflow-Lauf starten

```bash
# Alle Dateien committen
git add .
git commit -m "🚀 Initial setup: EU-Gesetzes Navigator"
git push origin main

# Workflow manuell triggern
# GitHub → Actions → "EU & Deutsche Gesetze Auto-Update" → "Run workflow"
```

### 6. Zugriff auf Ihren Navigator

Nach erfolgreichem Setup ist Ihr Navigator verfügbar unter:
```
https://IHR-USERNAME.github.io/IHR-REPOSITORY-NAME/
```

## 🔧 Konfiguration im Detail

### Workflow-Konfiguration

Der GitHub Actions Workflow in `.github/workflows/update-laws.yml`:

- **Zeitplan**: Täglich um 6:00 Uhr MEZ (`cron: '0 4 * * *'`)
- **Manueller Trigger**: Über GitHub Actions Interface
- **Auto-Commit**: Pusht Updates automatisch

### Unterstützte Gesetze

#### 🇪🇺 EU-Verordnungen (sehr zuverlässig)
- **EU-Geldwäscheverordnung 2024** (CELEX:32024R1624)
- **GDPR** (CELEX:32016R0679)
- **AI Act** (CELEX:32024R1689)
- **Digital Services Act** (CELEX:32022R2065)

#### 🏛️ Deutsche Gesetze (best-effort)
- **Geldwäschegesetz (GwG)**
- **Kreditwesengesetz (KWG)**
- **Zahlungsdiensteaufsichtsgesetz (ZAG)**
- **Außenwirtschaftsgesetz (AWG)**
- **Außenwirtschaftsverordnung (AWV)**
- **Strafgesetzbuch (StGB)**
- **Versicherungsaufsichtsgesetz (VAG)**
- **Kapitalanlagegesetzbuch (KAGB)**
- **Wertpapierhandelsgesetz (WpHG)**
- **EU-Sanktions-Durchführungsgesetz**

### Datenquellen

1. **EUR-Lex** (EU-Verordnungen) - sehr zuverlässig
2. **Bundestag GitHub Repository** - offizielle deutsche Gesetze
3. **Open Legal Data API** - 57.000+ Gesetze
4. **OffeneGesetze.de** - Bundesgesetzblätter
5. **Intelligente Fallbacks** - informative Weiterleitungen

## 🛠️ Anpassungen

### Weitere Gesetze hinzufügen

1. **Workflow erweitern** (`.github/workflows/update-laws.yml`):
```yaml
# Neues Gesetz zur Liste hinzufügen
["de-neues-gesetz.html"]="https://raw.githubusercontent.com/bundestag/gesetze/main/..."
```

2. **Navigator konfigurieren** (`index.html`):
```javascript
// Zu AVAILABLE_LAWS hinzufügen
'de_neues_gesetz': {
    name: 'Neues Gesetz',
    shortName: 'NG',
    filename: 'de-neues-gesetz.html',
    type: 'german-law',
    category: 'category',
    color: '#COLOR'
}
```

3. **Dropdown-Menü erweitern**:
```html
<option value="de_neues_gesetz">Neues Gesetz (NG)</option>
```

### Styling anpassen

Badge-Farben ändern in `index.html`:
```css
.law-badge.custom {
    background: #YOUR-COLOR;
    color: white;
}
```

### Update-Zeitplan ändern

In `.github/workflows/update-laws.yml`:
```yaml
on:
  schedule:
    - cron: '0 8 * * *'  # 10:00 Uhr MEZ statt 6:00 Uhr
```

## 📊 Monitoring & Wartung

### Workflow-Status prüfen

1. **GitHub** → **Actions** tab
2. **"EU & Deutsche Gesetze Auto-Update"** Workflow auswählen
3. Letzten Lauf überprüfen

### Logs analysieren

Typische Log-Ausgaben:
```
✅ EU-GwVO: 1235324 Bytes
✅ GDPR: 864775 Bytes
📄 de-gwg-2017.html: 5234 Bytes (Informativer Fallback)
✅ de-kwg.html: 45612 Bytes (Echter Inhalt)
```

### Metadaten abrufen

Aktuelle Statistiken: `https://IHR-USERNAME.github.io/IHR-REPO/laws/last-update.json`

Beispiel-Response:
```json
{
  "last_update": "2024-12-20T04:00:00Z",
  "statistics": {
    "eu_laws": {
      "available": 4,
      "total": 4,
      "success_rate": "100%"
    },
    "german_laws": {
      "real_content": 6,
      "fallbacks": 4,
      "total": 10,
      "success_rate": "60%"
    }
  }
}
```

## 🔍 Troubleshooting

### Häufige Probleme

#### 1. Workflow schlägt fehl
```
❌ Fehler: "Process completed with exit code 1"
```
**Lösung**: 
- Prüfen Sie die Workflow-Permissions: `Settings` → `Actions` → `General` → `Workflow permissions` → `Read and write permissions`

#### 2. Gesetze laden nicht
```
❌ Fehler beim Laden von EU-Geldwäscheverordnung 2024: HTTP 404
```
**Lösungen**:
- GitHub-Konfiguration in `index.html` prüfen
- Repository-Name und Username korrekt?
- GitHub Pages aktiviert?

#### 3. Deutsche Gesetze zeigen nur Fallbacks
```
📄 Alle deutschen Gesetze: "Informativer Fallback"
```
**Normal**: Bot-Schutz verhindert automatischen Download. Nutzer werden zu offiziellen Quellen weitergeleitet.

#### 4. JavaScript-Fehler
```
❌ Uncaught ReferenceError: handleFallbackContent is not defined
```
**Lösung**: Verwenden Sie die reparierte `index.html` Version.

### Debug-Modus aktivieren

Fügen Sie in `index.html` hinzu:
```javascript
// Nach Zeile 170
console.log('Debug-Modus aktiviert');
window.DEBUG_MODE = true;
```

### Support erhalten

1. **GitHub Issues**: Erstellen Sie ein Issue in Ihrem Repository
2. **Logs prüfen**: GitHub Actions → Workflow → Details
3. **Browser-Konsole**: F12 → Console für JavaScript-Fehler

## 🚀 Erweiterte Features

### Geplante Verbesserungen

- **📱 PWA-Support**: Offline-Verfügbarkeit
- **🔍 Erweiterte Suche**: RegEx, Fuzzy-Search
- **📋 Export-Funktionen**: PDF, Word, Markdown
- **🔗 Deep-Links**: Direkte Artikel-URLs
- **📊 Analytics**: Nutzungsstatistiken
- **🌐 Multi-Language**: Englische Übersetzungen

### API-Zugriff

Programmatischer Zugriff auf Metadaten:
```javascript
fetch('https://IHR-USERNAME.github.io/IHR-REPO/laws/last-update.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Custom Domain

Für eine professionelle Domain:
1. **CNAME-Datei** erstellen: `echo "gesetze.ihredomain.de" > CNAME`
2. **DNS konfigurieren**: CNAME-Record auf `IHR-USERNAME.github.io`
3. **HTTPS aktivieren**: GitHub Pages → Settings

## 📄 Lizenz & Rechtliches

### Open Source
Dieses Projekt ist Open Source. Die Gesetze selbst sind öffentlich verfügbar.

### Haftungsausschluss
- **Keine Rechtsberatung**: Nur zur Information
- **Keine Gewähr**: Auf Aktualität oder Vollständigkeit
- **Offizielle Quellen**: Immer maßgeblich

### Urheberrecht
- **EU-Verordnungen**: Öffentlich zugänglich
- **Deutsche Gesetze**: Amtliche Werke (gemeinfrei)
- **Code**: MIT-Lizenz (oder nach Wahl)

## 🤝 Beitragen

Verbesserungen willkommen!

1. **Fork** erstellen
2. **Feature-Branch**: `git checkout -b feature/neue-funktion`
3. **Changes committen**: `git commit -m "✨ Neue Funktion"`
4. **Pull Request** erstellen

## 📞 Kontakt

- **Issues**: GitHub Issues verwenden
- **Diskussionen**: GitHub Discussions
- **Updates**: Watch/Star für Benachrichtigungen

---

**🎉 Vielen Dank, dass Sie den EU-Gesetzes Navigator verwenden!**

Made with ❤️ for legal transparency and accessibility.
