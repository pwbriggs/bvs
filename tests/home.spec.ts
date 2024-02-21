import { test, expect } from '@playwright/test';

test('has valid tab title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Home/);
    await expect(page).toHaveTitle(/(Better Volunteer Scheduler)|(BVS)/);
    await expect(page).toHaveScreenshot();
});


test('has header', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: "Home" })).toBeVisible()
    await expect(page).toHaveScreenshot();
});
