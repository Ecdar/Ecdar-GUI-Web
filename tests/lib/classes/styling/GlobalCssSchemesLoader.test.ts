import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("loads dark theme", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "dark" });
	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(display-p3 0.0902 0.10196 0.13333)",
	);
});

test("loads light theme", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "light" });
	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(display-p3 0.95686 0.95686 0.95686)",
	);
});

test("prefers motion", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: null });
	await expect(page.locator("#global-dec")).toHaveCSS(
		"transition",
		"background-color 0.2s ease 0s",
	);
});

test("prefers reduced motion", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await expect(page.locator("#global-dec")).toHaveCSS(
		"transition",
		"none 0s ease 0s",
	);
});
