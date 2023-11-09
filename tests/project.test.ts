import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("Starts only with Global Declaration", async ({ page }) => {
	await expect(page.locator(".global-dec")).toHaveCount(1);
	await expect(page.locator(".project-item")).toHaveCount(0);
});

// test("Add a component", async ({ page }) => {
// 	await expect(page.locator(".component")).toHaveCount(0);
// 	await page.click("#add-component");
// 	await expect(page.locator(".component")).toHaveCount(1);
// });
