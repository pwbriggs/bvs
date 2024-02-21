import { test, expect } from '@playwright/test';

test('has valid tab title', async ({ page }) => {
    await page.goto('/settings/');

    await expect(page).toHaveTitle(/Settings/);
    await expect(page).toHaveTitle(/(Better Volunteer Scheduler)|(BVS)/);
    await expect(page).toHaveScreenshot();
});


test('has header', async ({ page }) => {
    await page.goto('/settings/');

    await expect(page.getByRole('heading', { name: "Settings" })).toBeVisible()
    await expect(page).toHaveScreenshot();
});
