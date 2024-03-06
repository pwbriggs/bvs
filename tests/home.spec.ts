import { test, expect } from '@playwright/test';

test('has construction message', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: "Under Construction" })).toBeVisible()
});
