import { test, expect } from '@playwright/test';

test('has valid tab title', async ({ page }) => {
    await page.goto('/events/');

    await expect(page).toHaveTitle(/All Events/);
    await expect(page).toHaveTitle(/(Better Volunteer Scheduler)|(BVS)/);
});


test('has header', async ({ page }) => {
    await page.goto('/events/');

    await expect(page.getByRole('heading', { name: "All Events" })).toBeVisible()
});
