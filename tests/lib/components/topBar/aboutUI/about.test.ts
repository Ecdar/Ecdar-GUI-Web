import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await page.goto("/");
	await page.click("#start-new-project");
});

test("Navigating to Help, then About", async ({ page }) => {
	await page.getByRole("button", { name: "Help", exact: true }).click();
	await page.getByRole("button", { name: "About", exact: true }).click();

	const aboutBox = await page
		.locator("dialog")
		.locator(".box")
		.locator("h1")
		.innerHTML();

	expect(aboutBox).toBe("Ecdar v. 0.1");
});
