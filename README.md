# Startup Deal Metrics Tool

Ein professionelles Finanzkennzahlen-Tool für Startups, KMUs und Investment-Boutiquen. Das Tool ermöglicht eine schnelle Analyse von Unternehmenswerten durch branchenspezifische Multiplikatoren und progressive Wachstumsanpassungen.

## Hauptfunktionen

- **Deal-Metriken-Kalkulator**: Berechnung von Unternehmenswerten basierend auf:
  - Branchenspezifischen Multiplikatoren
  - Revenue und EBITDA Kennzahlen
  - Wachstumsraten mit progressiver Anpassung
- **KI-gestützte Analyse**: Integration von OpenAI für:
  - Automatische Generierung von Unternehmensbeschreibungen
  - Erstellung von Due-Diligence-Checklisten
- **Professionelles UI**: Responsive Design mit:
  - Übersichtlicher Navigation
  - Klarer Darstellung der Ergebnisse
  - Vorbereitung für zukünftige Module (Due Diligence, Termsheet-Prüfung)

## Installation

```bash
# Repository klonen
git clone [repository-url]
cd startup-deal-metrics-tool

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Der Server läuft standardmäßig auf Port 5000.

## Umgebungsvariablen

Das Projekt benötigt folgende Umgebungsvariable:

- `OPENAI_API_KEY`: API-Schlüssel für OpenAI (für die Generierung von Beschreibungen und Checklisten)

## Technische Details

### Bewertungslogik

Die Unternehmensbewertung basiert auf einem gewichteten Durchschnitt von:
1. EBITDA-basierter Bewertung
2. Umsatz-basierter Bewertung

Die Gewichtung wird automatisch basierend auf der EBITDA-Marge angepasst:
- Höhere EBITDA-Marge → Stärkere Gewichtung der EBITDA-Bewertung
- Typische Gewichtung: 60-80% EBITDA / 20-40% Umsatz

### Wachstumsanpassung

Das Tool verwendet eine progressive Skalierung für Wachstumsraten:
- Negativwachstum: 70% Einfluss
- 0-50% Wachstum: 60% Einfluss
- 50-100% Wachstum: Abnehmender Einfluss
- >100% Wachstum: Minimaler zusätzlicher Einfluss

### Branchenmultiplikatoren

Das Tool enthält vordefinierte Multiplikatoren für verschiedene Branchen:
- SaaS/Software: EBITDA 5x / Umsatz 4x
- E-Commerce: EBITDA 3x / Umsatz 1.5x
- Fintech: EBITDA 5x / Umsatz 3x
- Und weitere Branchen...

## Projektstruktur

```
├── client/                 # Frontend-Code
│   ├── src/
│   │   ├── components/    # React-Komponenten
│   │   ├── lib/          # Shared Utilities & Schemas
│   │   └── pages/        # Seiten-Komponenten
├── server/                # Backend-Code
│   ├── config/           # Konfigurationsdateien
│   ├── services/         # Business Logic & Services
│   └── routes.ts         # API-Routen
```

## Tech Stack

- Frontend: React mit TypeScript
- UI: Shadcn/UI + Tailwind CSS
- Backend: Express.js
- API Integration: OpenAI GPT-3.5
- Validierung: Zod
- State Management: TanStack Query

## Zukünftige Features

- Ausführliche Due-Diligence-Checklisten
- Termsheet-Prüfung und -Analyse
- Erweiterte Bewertungstools
- Branchenspezifische Insights

## Lizenz

[MIT License](LICENSE)
