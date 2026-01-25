# FinanzTracker – Test Guide & README

Diese Anleitung erklärt **verständlich und Schritt für Schritt**, wie Tests im Projekt **FinanzTracker** geschrieben, ausgeführt und erweitert werden können. Sie richtet sich ausdrücklich auch an neue Teammitglieder.

---

## Projektstruktur (relevant für Tests)
## Überblick: Testarten & Tools

| Testart | Zweck | Tools |
|------|------|------|
| Frontend Unit Tests | Vue-Komponenten & UI-Logik | vitest, @vue/test-utils, happy-dom |
| Backend Unit Tests | Reine Logik ohne DB | vitest |
| Backend Integration Tests | Prisma + echte DB | vitest, prisma |
| E2E Tests | Echte User-Flows im Browser | Playwright |

---

## Ordnerstruktur (`test/`)

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

### E2E Tests (Playwright)

- **Ort:** `test/e2e/`
- **Ziel:** Echte User-Workflows vom Frontend testen
- **Technik:**
  - Playwright für automatisierte Browser-Tests
  - Echte Anwendungsumgebung (Frontend + Backend)

**Vollständiges System wird getestet**

---

## Befehle zum Ausführen der Tests

- Alle Tests (Watch Mode)
    ```bash
    npm test
    ```

- Frontend Unit Tests
    ```bash
    npm run test:unit:frontend
    ```

- Backend Unit Tests
    ```bash
    npm run test:unit:backend
    ```

- Backend Integration Tests (Prisma)
    ```bash
    npm run test:integration:backend
    ```
    !!!Vorher sicherstellen, dass Migrationen existieren!!!
    ```bash
    npx prisma migrate deploy --schema prisma/schema.test.prisma
    ```

- E2E Tests
    ```bash
    npx playwright test
    ```

- E2E Test Report anzeigen
    ```bash
    npx playwright show-report
    ```

- E2E Tests im UI Mode (interaktiv)
    ```bash
    npx playwright test --ui
    ```

---

## Anleitung: Lokale Tests einrichten

1. Alle Module sauber neu laden
```bash
npm ci
```

2. Prisma Client generieren
```bash
npx prisma generate
```

3. Docker Container bauen
```bash
docker compose up -d
```

4. Test Prisma DB im Container laden
```bash
npx dotenv -e .env.test -- prisma db push --schema=prisma/schema.test.prisma
```

5. Tests starten
```bash
npm run test
```

6. (optional) Docker Container löschen
```bash
docker compose down -v
```

---

### GitHub Actions (CI)

- Postgres läuft als **Docker-Container**
- `DATABASE_URL` wird im Workflow gesetzt
- Prisma nutzt **schema.test.prisma**
- Test Schema ist 1 zu 1 wie Prod DB
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


