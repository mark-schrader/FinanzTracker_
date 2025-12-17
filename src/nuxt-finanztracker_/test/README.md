# 🧪 Testing Guide – Finanztracker (Nuxt 3)

Diese Datei beschreibt **wie das Testsystem aufgebaut ist**,  
**welche Tests wo liegen**, **welche Tools verwendet werden**  
und **wie Tests lokal sowie in CI ausgeführt werden**.

Das Ziel dieses Setups ist:
- klare Trennung der Testarten
- schnelle Unit Tests
- saubere Prisma-Integrationstests
- CI-Tauglichkeit (GitHub Actions)
- kein Tool-Chaos

---

## 🧠 Überblick: Testarten & Tools

| Testart | Zweck | Tools |
|------|------|------|
| Frontend Unit Tests | Vue-Komponenten & UI-Logik | vitest, @vue/test-utils, happy-dom |
| Backend Unit Tests | Reine Logik ohne DB | vitest |
| Backend Integration Tests | Prisma + echte DB | vitest, prisma |
| E2E Tests | Echte User-Flows im Browser | Playwright / Selenium / Cypress (noch offen) |

---

## 📁 Ordnerstruktur (`test/`)

```
test/
├─ e2e/
│  └─ (E2E Tests – Browser, später)
│
├─ integration/
│  └─ backend/
│     └─ prisma.spec.ts
│
├─ unit/
│  ├─ backend/
│  │  └─ smoke.spec.ts
│  └─ frontend/
│     └─ smoke.spec.ts
│
├─ setup.frontend.ts
└─ setup.prisma.ts

```
---
## ▶️ Tests ausführen

- Alle Tests (Watch Mode)
    ```
    npm test
    ```
- Frontend Unit Tests
    ```
    npm run test:unit:frontend
    ```
- Backend Unit Tests
    ```
    npm run test:unit:backend
    ```
- Backend Integration Tests (Prisma)
    ```
    npm run test:integration:backend
    ```
    !!! Vorher sicherstellen, dass Migrationen existieren:
    ```
    npx prisma migrate deploy --schema prisma/schema.prisma
    ```
---
## 🤖 Tests in GitHub Actions

In CI werden ausgeführt:
- Frontend Unit Tests
- Backend Unit Tests
- Prisma Integration Tests mit SQLite

Vorteile:
- Pull Requests brechen bei Fehlern
- reproduzierbare Ergebnisse
- kein Zugriff auf echte Datenbanken

## 🚫 Was nicht in Unit Tests gehört
- echter Browser
- Playwright / Selenium / Cypress
- Nuxt Boot
- echte HTTP-Server
- echte Datenbanken (außer Integration Tests)

diese Dinge gehören in E2E Tests, nicht in Unit Tests.

## 🧠 Wichtige Merksätze
- Vitest ist der einzige Test-Runner
- @vue/test-utils = nur Frontend Unit Tests
- happy-dom = Fake-Browser
- Prisma = immer Integration Test
- E2E ≠ Unit Test

## ✅ Ziel dieses Setups
- schnelle Tests
- klare Struktur
- einfache Wartung
- saubere CI
- langfristig wartbar

Bei Unsicherheiten:

1. Testart bestimmen (Unit / Integration / E2E)
2. Ordner wählen
3. Tool laut Tabelle verwenden