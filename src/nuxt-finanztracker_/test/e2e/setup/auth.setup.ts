import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
   await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'WILLKOMMEN IN PLEITEGEIER!' })).toBeVisible();
  await expect(page.getByText('© 2026 Budget Buddy ·')).toBeVisible();
  await page.getByRole('button', { name: 'Anmelden' }).click();
  await page.getByRole('textbox', { name: 'Email eingeben' }).click();
  await page.getByRole('textbox', { name: 'Email eingeben' }).fill('TestE2E@test.de');
  await page.getByRole('textbox', { name: 'Passwort eingeben' }).click();
  await page.getByRole('textbox', { name: 'Passwort eingeben' }).fill('TestTestE2E');
  await page.locator('form').getByRole('button', { name: 'Anmelden' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Session speichern
  await page.context().storageState({ path: 'auth.json' });
});