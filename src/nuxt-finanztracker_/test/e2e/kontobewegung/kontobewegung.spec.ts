import { test, expect } from '@playwright/test';

test('Kontobewegung ist da', async ({ page }) => {
  await page.goto('http://localhost:3000/kontobewegung');
  await expect(page.getByText('Kontobewegung')).toBeVisible();
});