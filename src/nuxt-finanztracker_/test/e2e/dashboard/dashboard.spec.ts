import { test, expect } from '@playwright/test';

test('Dashboard ist da', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  await expect(page.getByText('Dashboard')).toBeVisible();
});