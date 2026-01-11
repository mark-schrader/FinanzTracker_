import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Index redirect zum dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/dashboard/);
});
