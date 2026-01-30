import { test, expect } from '@playwright/test';

test.use({
  storageState: 'auth.json'
});

test('Challenge ist geladen', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.getByRole('link', { name: 'CHALLENGE' }).click();
    await expect(page.getByRole('heading', { name: 'Spar-Challenge' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Neue Challenges +' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Spare Geld ' })).toBeVisible();
});

//Modale können nicht geöffnet werden
// test('Challenge: open and close new challenge modal', async ({ page }) => {
//   await page.goto('http://localhost:3000/dashboard/64');
//   await page.getByRole('link', { name: 'CHALLENGE' }).click();

//   await expect(page.getByRole('heading', { name: 'Spar-Challenge' })).toBeVisible();

//   await expect(page.getByRole('button', { name: 'Neue Challenges +' })).toBeVisible();
//   await page.getByRole('button', { name: 'Neue Challenges +' }).click();
//   await page.getByRole('button', { name: 'Abbrechen' }).click();

//   await expect(page.getByRole('button', { name: 'Neue Challenges +' })).toBeVisible();
// });
