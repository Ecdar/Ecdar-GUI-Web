import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState();
	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings input composite" })
		.click();
});

test("No changes, does not say there has been changes", async ({ page }) => {
	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).not.toBeVisible();
});

test("Creating and deleting engine does not count as change", async ({
	page,
}) => {
	await page.locator("#add-button").click();
	await page.locator(".delete-button").last().click();
	await page
		.locator("#engine-ui-outer")
		.getByRole("dialog")
		.getByRole("button")
		.first()
		.click();

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).not.toBeVisible();
});

test("Empty placeholder does not count as change", async ({ page }) => {
	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).not.toBeVisible();
});

//--------- Test input changes -----------------

test("Unsaved, name will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved, address will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[1].fill("1.1.1.1");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved, start port will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[2].fill("1");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved, end port will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[3].fill("2");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved, marked use bundle", async ({ page }) => {
	await page.locator("#local-button").getByRole("button").click();

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved, unmarked use bundle, and added ip", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");
	await page.locator("#local-button").getByRole("button").click();
	await inputs[2].fill("1");
	await inputs[3].fill("2");

	await page.locator("#save-button").click();
	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings input composite" })
		.click();

	await page.locator("#local-button").getByRole("button").click();
	await inputs[1].fill("1.1.1.1");
	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});
