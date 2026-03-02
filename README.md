# 🔧 ReifenSetup

Produktionsreife Reifen-Tool-Website für DACH & Europa.  
**Next.js 14 App Router · TypeScript · Tailwind CSS · Vollständig clientseitig**

---

## ✨ Features

| Feature | Status |
|---|---|
| 4 Reifen-Tools (Reifenrechner, ET-Check, DOT-Decoder, Winterpflicht) | ✅ |
| Winterpflicht: 15 Länder mit Detailseiten | ✅ |
| Google AdSense – Feature-Flag, Consent-gesteuert | ✅ |
| EU Cookie-Consent Banner (Notwendig / Marketing) | ✅ |
| DSGVO-konforme Datenschutzseite | ✅ |
| Sitemap.xml, robots.txt (dynamisch) | ✅ |
| JSON-LD für alle Seiten | ✅ |
| Semantisches HTML, ARIA, Keyboard-Navigation | ✅ |
| Core Web Vitals optimiert (SSG, minimal JS) | ✅ |
| ads.txt Platzhalter | ✅ |
| iCal-Reminder-Generator (clientseitig) | ✅ |

---

## 🚀 Installation & Start

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Entwicklungsserver starten
npm run dev
# → http://localhost:3000

# 3. Produktions-Build
npm run build
npm run start
```

**Systemvoraussetzungen:** Node.js ≥ 18.17, npm ≥ 9

---

## 📦 Deployment

### Vercel (empfohlen – 0 Konfiguration)

```bash
npm i -g vercel
vercel --prod
```

Oder: GitHub-Repo verknüpfen → Vercel importiert das Projekt automatisch (App Router wird erkannt).

### Netlify

```bash
npm run build
# Upload des .next/standalone Ordners oder per netlify.toml:
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Statischer Export (optional, ohne SSG-Features)

```js
// next.config.js
const nextConfig = {
  output: 'export', // statt 'standalone'
};
```

---

## 💰 Google AdSense einrichten

### Schritt 1: Publisher-ID eintragen

Öffne `src/lib/config.ts`:

```ts
export const AD_CONFIG = {
  ENABLED: false, // ← NOCH DEAKTIVIERT
  PUBLISHER_ID: 'ca-pub-XXXXXXXXXXXXXXXX', // ← deine echte ID hier
  SLOTS: {
    TOP:    'XXXXXXXXXX', // ← Slot-ID für "nach Introtext"
    MID:    'XXXXXXXXXX', // ← Slot-ID für "zwischen Inhalt & FAQ"
    BOTTOM: 'XXXXXXXXXX', // ← Slot-ID für Footer-Bereich
  },
};
```

### Schritt 2: ads.txt aktualisieren

Öffne `public/ads.txt`:

```
google.com, pub-DEINEPUBLISHERID, DIRECT, f08c47fec0942fa0
```

### Schritt 3: Feature Flag aktivieren

Sobald dein AdSense-Konto genehmigt ist:

```ts
ENABLED: true,
```

### Wie Consent & Ad-Loading funktioniert

```
Nutzer besucht Seite
       ↓
ConsentBanner erscheint (keine Ads geladen)
       ↓
Nutzer wählt "Alle akzeptieren"
       ↓
localStorage['rs_consent_v1'] = { marketing: true }
       ↓
injectAdSense() → <script async src="pagead2...adsbygoogle.js">
       ↓
AdSlot-Komponenten pushen adsbygoogle[]
       ↓
Anzeigen erscheinen (nach ca. 1-2 Sek.)
```

Bei "Nur notwendige": AdSense-Script wird **nie** geladen. `<ins>` Tags werden nicht gerendert.

### Ad-Platzierungen (AdSense-konform)

| Position | Wo | Abstand zu Inputs |
|---|---|---|
| `top` | Nach Intro-Text, vor Tool-Content | ≥ 100px Abstand nach unten |
| `mid` | Zwischen Tool-Ergebnis und FAQ/Links | ≥ 100px Abstand |
| `bottom` | Footer-Bereich | Unterhalb Navigation/Links |

**Ads erscheinen NIE in der Nähe von:** Eingabefeldern, Buttons, Dropdowns, Navigation.

---

## 🔒 DSGVO / Consent

### Cookie-Kategorien

| Cookie | Zweck | Basis |
|---|---|---|
| `rs_consent_v1` (localStorage) | Consent-Einstellung speichern | Art. 6 Abs. 1 lit. c DSGVO |
| Google AdSense Cookies | Personalisierte Werbung | Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) |

### Consent-State zurücksetzen (für Tests)

```javascript
// In der Browser-Konsole:
localStorage.removeItem('rs_consent_v1');
location.reload();
```

---

## 📁 Projektstruktur

```
src/
├── app/
│   ├── layout.tsx               # Root Layout, Fonts, ConsentBanner
│   ├── page.tsx                 # Startseite
│   ├── sitemap.ts               # Dynamische Sitemap
│   ├── robots.ts                # robots.txt
│   ├── not-found.tsx            # 404 Seite
│   ├── tools/
│   │   ├── reifenrechner/       # Tool 1
│   │   ├── felgen-et-check/     # Tool 2
│   │   └── dot-decoder/         # Tool 3
│   ├── winterpflicht/
│   │   ├── page.tsx             # Übersicht (Tool 4)
│   │   ├── WinterpflichtClient.tsx
│   │   └── [country]/page.tsx  # Dynamische Länderseiten
│   ├── guide/reifen-basiswissen/
│   ├── impressum/
│   ├── datenschutz/
│   └── kontakt/
├── components/
│   ├── ads/AdSlot.tsx           # Consent-gesteuerte Ad-Komponente
│   ├── layout/Header.tsx
│   ├── layout/Footer.tsx
│   └── ui/ConsentBanner.tsx
├── data/
│   └── winterRegulations.ts     # Lokale Länder-Daten (kein API)
└── lib/
    └── config.ts                # Site-Konfiguration, AD_CONFIG
public/
├── ads.txt                      # Publisher-ID Platzhalter
└── favicon.ico                  # (selbst hinzufügen)
```

---

## 🎯 SEO-Checkliste

Vor Go-Live:
- [ ] `siteConfig.url` in `src/lib/config.ts` auf echte Domain setzen
- [ ] `[Vorname Nachname]` in Impressum und Datenschutz ersetzen
- [ ] `ads.txt` mit echter Publisher-ID befüllen
- [ ] Favicon hinzufügen (`public/favicon.ico`, `public/apple-touch-icon.png`)
- [ ] OpenGraph-Bild erstellen (`public/og-image.png`, 1200×630)
- [ ] Google Search Console verifizieren
- [ ] Core Web Vitals in PageSpeed Insights prüfen

---

## 🛠️ Technische Details

- **Framework:** Next.js 14 (App Router, React Server Components)
- **Rendering:** SSG (Static Site Generation) für alle Seiten außer Tool-Inputs
- **Styling:** Tailwind CSS (kein extra CSS-Framework)
- **Fonts:** Syne (Display) + DM Sans (Body) + DM Mono via Google Fonts
- **Keine externen State-Libraries** (nur React useState/useEffect)
- **Keine Tracking-Libraries** (kein GA, kein Hotjar, kein Sentry per Default)
- **Alle Berechnungen clientseitig** – kein Backend erforderlich
- **iCal-Generator:** Blob-Download, 100% clientseitig

---

## ⚠️ Haftungsausschluss

Die Berechnungen dienen der Orientierung. Kein Ersatz für Fachberatung.  
Angaben zur Winterreifenpflicht ohne Gewähr – Stand Januar 2025.
