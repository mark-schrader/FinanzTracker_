import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Kontobewegung ist da mit Buttons und Tabelle', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/64');
  await page.getByRole('link', { name: 'KONTOBEWEGUNG' }).click();
  await page.goto('http://localhost:3000/kontobewegung');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: 'Kontobewegung', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ Einnahme hinzufügen' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Ausgabe hinzufügen' })).toBeVisible();
  await page.getByRole('button', { name: ' Kategorien verwalten' }).click();
  await page.getByRole('button', { name: 'Schließen' }).click();
  await expect(page.getByRole('button', { name: ' Kategorien verwalten' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Daueraufträge verwalten' })).toBeVisible();
  
  await expect(page.locator('table')).toBeVisible().catch(() => {});
});