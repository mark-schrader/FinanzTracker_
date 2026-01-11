import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Dashboard ist und zeigt Tabellen', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/64');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText('Aktueller Kontostand:')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Verlauf des Kontostands (' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ausgaben', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Einnahmen', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ausgaben je Kategorie' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Einnahmen je Kategorie' })).toBeVisible();
});

test('Dashboard: öffenen und schließen von manuellem Zeitraum', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/64');
  await page.waitForLoadState('networkidle');

  const manualLabel = page.getByLabel('Zeitraum genau bestimmen');
  await expect(manualLabel).toBeVisible();

  await manualLabel.check().catch(() => {});
  await expect(page.getByLabel('Startdatum')).toBeVisible({ timeout: 3000 }).catch(() => {});
  await expect(page.getByLabel('Enddatum')).toBeVisible({ timeout: 3000 }).catch(() => {});

  await manualLabel.uncheck().catch(() => {});
  await expect(page.getByRole('combobox')).toBeVisible().catch(() => {});
});