import { test, expect, type Page, type Locator } from "@playwright/test";

test.beforeEach(async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await page.goto("/");
	await page.waitForLoadState();
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");
	await page.click("#start-new-project");
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");

	await page.getByRole("button", { name: "Options", exact: true }).click();
	await page.getByRole("button", { name: "Settings", exact: true }).click();
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
