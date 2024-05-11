import { test, expect } from '@playwright/test';

test.describe("Auth system", () => {
    test('has actual tests', async ({ page }) => {
        await expect(false).toBeTruthy();
    });

    test("redirects unauthenticated requests to My Schedule", async ({ page }) => {
        await page.goto("/my-schedule");
        await expect(page).toHaveURL("/login?next=/my-schedule");
    });
});
