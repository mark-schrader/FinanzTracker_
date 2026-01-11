import { test, expect } from '@playwright/test';

test.use({
  storageState: 'auth.json'
});

test('dashboard ist da', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/64');
  await expect(page.getByRole('heading', { name: 'Aktueller Kontostand: 0,00 €' })).toBeVisible();
});