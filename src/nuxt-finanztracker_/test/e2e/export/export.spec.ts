import { test, expect } from '@playwright/test';

test.use({
  storageState: 'auth.json'
});

test('Export ist geladen', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('link', { name: 'EXPORT' }).click();
  await expect(page.getByRole('heading', { name: 'Export', exact: true })).toBeVisible();
});