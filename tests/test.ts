import { expect, test } from "@playwright/test";

test("page title is ecdar", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Ecdar/);
});
