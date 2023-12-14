import { test, expect, type Page, type Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState();
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");
	await page.click("#start-new-project");
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");

	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings Settings", exact: true })
		.click();
});

async function getTabButtons(page: Page): Promise<Locator[]> {
	const settingsContainer = page.locator("#setting-tabs-container");
	const tabContainer = settingsContainer.locator("> div").first();
	return tabContainer.locator("button").all();
}

test("two setting tabs exists", async ({ page }) => {
	const buttons = await getTabButtons(page);

	expect(buttons).toHaveLength(2);
});

test("color tab exists", async ({ page }) => {
	const buttons = await getTabButtons(page);

	await expect(buttons[0]).toHaveText("Color");
});

test("font tab exists", async ({ page }) => {
	const buttons = await getTabButtons(page);

	await expect(buttons[1]).toHaveText("Font");
});

test("starts on color tab", async ({ page }) => {
	const buttons = await getTabButtons(page);

	// Expect the active class to be applied to the color tab button and not the font tab
	await expect(buttons[0]).toHaveClass(/active/);
	await expect(buttons[1]).not.toHaveClass(/active/);
});

test("change to font tab", async ({ page }) => {
	const buttons = await getTabButtons(page);

	// Open font tab
	await buttons[1].click();

	// Expect the Reset Font button to be visible
	await expect(
		page
			.locator("#setting-tabs-container")
			.getByRole("button", { name: "Reset Font", exact: true }),
	).toBeVisible();

	// Expect the active class to be applied to the font tab button and not the color tab
	await expect(buttons[0]).not.toHaveClass(/active/);
	await expect(buttons[1]).toHaveClass(/active/);
});

test("change to color tab", async ({ page }) => {
	const buttons = await getTabButtons(page);

	// Change to font tab
	await buttons[1].click();

	// Change to color tab
	await buttons[0].click();

	// Expect the Reset Font button to be visible
	await expect(
		page
			.locator("#setting-tabs-container")
			.getByRole("button", { name: "Reset All Colors", exact: true }),
	).toBeVisible();

	// Expect the active class to be applied to the font tab button and not the color tab
	await expect(buttons[0]).toHaveClass(/active/);
	await expect(buttons[1]).not.toHaveClass(/active/);
});

test("returns to svg-view when closing through top navbar", async ({
	page,
}) => {
	await expect(page.locator(".canvas svg")).not.toBeVisible();

	// Click the setting button in the nav-bar again
	await page
		.getByRole("button", { name: "settings Settings", exact: true })
		.click();

	await expect(page.locator(".canvas svg")).toBeVisible();
});

test("returns to svg-view when closing through button", async ({ page }) => {
	await expect(page.locator(".canvas svg")).not.toBeVisible();

	// Click the close button in setting view
	await page
		.getByRole("button", { name: "Close Settings", exact: true })
		.click();

	await expect(page.locator(".canvas svg")).toBeVisible();
});

test("can reopen settings after closing", async ({ page }) => {
	await expect(page.locator(".canvas svg")).not.toBeVisible();

	// Click the close button in setting view
	await page
		.getByRole("button", { name: "Close Settings", exact: true })
		.click();

	await expect(page.locator(".canvas svg")).toBeVisible();

	// Click the open settings button to reopen
	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings Settings", exact: true })
		.click();

	// Check if the tab buttons are visible
	const buttons = await getTabButtons(page);
	expect(buttons).toHaveLength(2);
});
