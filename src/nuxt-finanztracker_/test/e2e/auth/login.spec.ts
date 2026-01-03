import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('banner').getByRole('button').click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('TestE2E@test.de');
  await page.getByRole('textbox', { name: 'Enter Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('TestTestE2E');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.context().storageState({ path: 'auth.json' });
});