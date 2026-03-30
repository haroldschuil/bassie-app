# Bassie 🐍 - Slangendagboek

Een Progressive Web App (PWA) voor Joost om zijn rode rattenslang Bassie bij te houden.

## Functies

- **Eten bijhouden** - registreer elke maaltijd
- **Vervelling bijhouden** - registreer elke vervelling
- **Voorspelling** - berekent op basis van Bassie's eigen data wanneer hij weer eet / vervelt
- **Meldingen** - waarschuwt als Bassie te lang niet gegeten heeft
- **Installeerbaar** - werkt als echte app op Joost's Android telefoon

## Op de telefoon installeren

1. Open de app-URL in **Chrome op Android**
2. Tik op de drie stippen rechtsboven
3. Kies **"Toevoegen aan startscherm"**
4. De app verschijnt als gewone app op het startscherm
5. Tik in de app op **"Meldingen inschakelen"** en geef toestemming

## Eigen data

De app is geladen met alle historische data van Bassie (mei 2025 - december 2026).
Nieuwe registraties worden opgeslagen op de telefoon van Joost (localStorage).

## Technische info

- Statische PWA - geen server nodig, draait volledig op GitHub Pages
- Data opgeslagen in de browser (localStorage) - blijft staan na afsluiten
- Service Worker zorgt voor offline werking en meldingen
- Meldingen werken via de browser (geen account of server nodig)

## Deployment

Push naar de `main` branch. GitHub Actions deployt automatisch naar GitHub Pages.

### Stappen voor Joost:

1. Ga naar: `https://[jouw-github-naam].github.io/bassie-app/`
2. Installeer als app (zie boven)
3. Schakel meldingen in

## Over rode rattenslangen (~2 jaar oud)

- **Voeding**: elke 7-14 dagen een muis (Bassie's eigen gemiddelde: ~13 dagen)
- **Vervelling**: elke 6-12 weken als volwassene
- **Tekenen van nakende vervelling**: doffe schubben, blauwe/troebele ogen, minder eetlust
- **Tijdens vervelling**: niet voeren, wel genoeg water
