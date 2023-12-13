import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("Navigating to Help, then About", async ({ page }) => {
	await page.getByRole("button", { name: "Help", exact: true }).click();

	await page.getByRole("button", { name: "error About" }).click();

	const aboutBox = await page
		.locator("dialog")
		.locator(".box")
		.locator("h1")
		.innerHTML();

	expect(aboutBox).toBe("Ecdar v. 0.1");

});
