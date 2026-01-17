# FinanzTracker – Test Guide & README

Diese Anleitung erklärt **verständlich und Schritt für Schritt**, wie Tests im Projekt **FinanzTracker** geschrieben, ausgeführt und erweitert werden können. Sie richtet sich ausdrücklich auch an neue Teammitglieder.

---

## Projektstruktur (relevant für Tests)
## 🧠 Überblick: Testarten & Tools

| Testart | Zweck | Tools |
|------|------|------|
| Frontend Unit Tests | Vue-Komponenten & UI-Logik | vitest, @vue/test-utils, happy-dom |
| Backend Unit Tests | Reine Logik ohne DB | vitest |
| Backend Integration Tests | Prisma + echte DB | vitest, prisma |
| E2E Tests | Echte User-Flows im Browser | Playwright |

---

## 📁 Ordnerstruktur (`test/`)

```
src/nuxt-finanztracker_
│
├─ prisma/
│  ├─ schema.prisma            # Produktives Schema
│  ├─ schema.test.prisma       # Test-Schema (Postgres)
│  └─ migrations/              # Prisma Migrations
│
├─ test/
│  ├─ setup.prisma.ts          # Gemeinsames DB-Test-Setup
│  ├─ setup.frontend.ts        # Frontend Test-Setup
│  │
│  ├─ unit/
│  │  ├─ frontend/             # Vue-Komponenten Unit-Tests
│  │  └─ backend/              # Service-Unit-Tests
│  │
│  └─ integration/
│     └─ backend/              # Prisma + DB Integrationstests
│
├─ vitest.config.ts
├─ docker-compose.yml          # Test-Postgres
└─ package.json
```

---

## Testarten im Projekt

### Frontend Unit Tests

- **Ort:** `test/unit/frontend`
- **Ziel:** Vue-Komponenten isoliert testen
- **Technik:**
  - `@vue/test-utils`
  - gemockte Stores & Services

**Kein echter Server / keine Datenbank**

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
- E2E-Tests
    ```
    npx playwright test
    ```
    HTML Test Report
    ```
    npx playwright show-report
    ```
    Test in UI Mode
    ```
    npx playwright test --ui
    ```
---

### Backend Unit Tests

- **Ort:** `test/unit/backend`
- **Ziel:** Services / Business-Logik testen
- **Technik:**
  - Prisma gemockt oder In-Memory

**Keine echte Datenbank**

---

### Backend Integration Tests (wichtig)

- **Ort:** `test/integration/backend`
- **Ziel:**
  - Prisma + echte PostgreSQL-Datenbank
  - echte Constraints, Relationen, Deletes

**Hier wird wirklich in die DB geschrieben**

---

## Test-Datenbank (Postgres)

### Lokal

Die Testdatenbank läuft über Docker:

```bash
docker compose up -d
docker compose -f docker-compose.yml up -d
```

Die Verbindung erfolgt über:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/finanztracker_test
```

---

### GitHub Actions (CI)

- Postgres läuft als **Service-Container**
- `DATABASE_URL` wird im Workflow gesetzt
- Prisma nutzt **schema.test.prisma**

---

## Prisma Setup für Tests (wichtig!)

### schema.test.prisma

- identisch zum normalen Schema
- wird **nur für Tests** verwendet
- Migrationen werden **explizit angewendet**


### Migration für Tests ausführen (lokal)

```bash
npx dotenv -e .env.test -- prisma migrate dev \
  --schema=prisma/schema.test.prisma \
  --name test_init
```

---

## Gemeinsames Test-Setup (setup.prisma.ts)

Jeder Integrationstest bekommt automatisch:

- eine **saubere Prisma-Verbindung**
- einen **eindeutigen Test-User pro Worker**

### Warum?

Vitest führt Tests **parallel** aus. Ohne Isolation entstehen Fehler wie:

- `Unique constraint failed (email)`
- kaputte Testdaten

---

### Aktuelles Setup (vereinfacht erklärt)

```ts
const WORKER_ID = process.env.VITEST_WORKER_ID ?? '0'

const TEST_USER_EMAIL = `test-${WORKER_ID}@local`
```

Jeder Worker bekommt **seinen eigenen User**

---

## Wie schreibe ich einen Integrationstest?

### Beispiel: Kategorie anlegen

```ts
import { describe, it, expect } from 'vitest'
import { prisma, TEST_USER_ID } from '../../setup.prisma'

describe('Integration: Kategorie erstellen', () => {
  it('legt eine Kategorie für den Testuser an', async () => {
    const category = await prisma.categories.create({
      data: {
        name: 'TEST_KATEGORIE',
        user_id: TEST_USER_ID,
        color: '#ff0000',
      },
    })

    expect(category.name).toBe('TEST_KATEGORIE')
  })
})
```

### Wichtige Regeln

**IMMER** `TEST_USER_ID` verwenden  
**NIEMALS** feste User-IDs

---

## Tests ausführen

### Alle Tests

```bash
npm run test
```

### Nur Integrationstests

```bash
npm run test:integration:backend
```

---

## Häufige Fehler & Lösungen

### `column does not exist`
Migrationen fehlen

```bash
npx prisma migrate deploy --schema=prisma/schema.test.prisma
```

---

### `Unique constraint failed (email)`
Kein Worker-sicherer Test-User

**setup.prisma.ts verwenden**

---

### Tests schlagen nur in GitHub Actions fehl

Prüfen:
- `DATABASE_URL` korrekt?
- `schema.test.prisma` verwendet?
- Migrationen angewendet?

---

## Zusammenfassung (TL;DR)

- **Unit Tests**: schnell, isoliert, ohne DB
- **Integration Tests**: echte DB, Prisma, Docker
- **setup.prisma.ts**: Pflicht für Integrationstests
- **schema.test.prisma**: verhindert Prod-Schäden
- **Keine festen IDs oder Emails** verwenden

---

Wenn du dich an diese Regeln hältst, laufen Tests **lokal UND in CI stabil**.

Happy Testing

