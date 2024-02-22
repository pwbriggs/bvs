import { test, expect } from '@playwright/test';

test('has valid tab title', async ({ page }) => {
    await page.goto('/my-schedule/');

    await expect(page).toHaveTitle(/Your Schedule/);
    await expect(page).toHaveTitle(/(Better Volunteer Scheduler)|(BVS)/);
});


test('has header', async ({ page }) => {
    await page.goto('/my-schedule/');

    await expect(page.getByRole('heading', { name: "My Schedule" })).toBeVisible()
});
