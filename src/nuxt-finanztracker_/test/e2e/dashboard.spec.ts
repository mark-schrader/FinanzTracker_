import { test, expect } from '@playwright/test';

test('dashboard is accessible after login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('heading', { name: 'Aktueller Kontostand: 0,00 €' }).click();
});
