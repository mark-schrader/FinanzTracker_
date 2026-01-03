import { test, expect } from '@playwright/test';

test('Export ist da', async ({ page }) => {
  await page.goto('http://localhost:3000/export');
  await expect(page.getByText('Export')).toBeVisible();
});