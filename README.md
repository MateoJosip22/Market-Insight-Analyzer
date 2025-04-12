# 📊 Market Insight Analyzer

Ein technisches Projekt zur Datenanalyse mit NestJS und MongoDB  
**Erstellt von:** Mateo Josipović

## 🎯 Projektziel

Dieses Projekt demonstriert die Fähigkeit zur strukturierten Backend-Entwicklung mit **NestJS**, **TypeScript** und **MongoDB**. Es analysiert Produktdaten der öffentlichen [Fake Store API] durch geplante Erhebungen, speichert sie effizient, berechnet relevante KPIs und stellt diese über eine REST API bereit.

---

## 🛠️ Technologie-Stack

- **Framework:** NestJS (TypeScript)
- **Datenbank:** MongoDB (lokal)
- **API:** Fake Store API
- **Tools:** Cronjob, Axios, DTOs, Dependency Injection

---

## ⚙️ Installationsanleitung

# Repository klonen
git clone https://github.com/dein-benutzername/market-insight-analyzer.git
cd market-insight-analyzer

# Abhängigkeiten installieren
npm install

# MongoDB starten (lokal oder via Docker)
# docker run --name mongo -d -p 27017:27017 mongo

# Anwendung starten
npm run start:dev
```

---

## 🔄 Funktionale Anforderungen

### 🕒 Datenerhebung (Cronjob)
- Läuft jede Minute
- Holt Produktdaten von `https://fakestoreapi.com/products`
- Speichert nur neue Produkte in MongoDB
- Struktur pro Produkt:
  - ID
  - Titel
  - Preis
  - Beschreibung
  - Kategorie
  - Bild-URL
  - Rating: Rate + Count

### 📈 Datenanalyse (KPIs)
- Durchschnittlicher Preis pro Kategorie
- Bestbewertetes Produkt (rating.rate)
- Preisverteilung: Median & Standardabweichung
- Entwicklung der Produktanzahl pro Kategorie über Zeit
- Summe der drei teuersten Produkte als Beispiel-Warenkorbwert

---

## 🌐 Übersicht der API-Endpunkte

| Methode | Pfad                          | Beschreibung                                |
|--------|-------------------------------|---------------------------------------------|
| GET    | `/stats/categories`           | Durchschnittspreis pro Kategorie            |
| GET    | `/stats/best-rated`           | Produkt mit höchstem Rating                 |
| GET    | `/stats/price-distribution`   | Median & Standardabweichung der Preise      |
| GET    | `/stats/top3-total`           | Summe der teuersten drei Produkte           |

---

## 🧠 Projektstruktur

Projekt folgt der NestJS-Struktur:

```
src/
├── products/
│   ├── dto/
│   │   └── create-product.dto.ts
│   ├── interfaces/
│   │   └── product.interface.ts
│   ├── schemas/
│   │   └── product.schema.ts
│   ├── controllers/
│   │   └── products.controller.ts
│   ├── services/
│   │   └── products.service.ts
│   └── products.module.ts
```

---

## 🏗️ Architekturentscheidungen

- **Modulare Struktur:** Jeder Funktionsbereich (products, stats, scheduler) ist ein eigenständiges NestJS-Modul mit klarer Trennung von Controller, Service, DTOs und Schemas.
- **Dependency Injection:** Alle Services und Datenzugriffe folgen dem NestJS-Prinzip der Dependency Injection für bessere Testbarkeit und lose Kopplung.
- **Type Safety:** Vollständige Nutzung von TypeScript mit Interfaces und DTOs für sichere Typisierung und Validierung.
- **Skalierbarkeit:** Die Struktur erlaubt einfaches Hinzufügen weiterer Module (z. B. für Authentifizierung oder User Management).
- **Automatisierung mit Cronjob:** Produktdaten werden automatisiert in regelmäßigen Abständen abgerufen und analysiert.

---

## 🤝 Kontakt

Mateo Josipović  
📧 mateoj2201@gmail.com
