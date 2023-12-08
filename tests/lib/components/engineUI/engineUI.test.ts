import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState();
	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings input composite" })
		.click();
});

test("Starts with one seperate engine", async ({ page }) => {
	await expect(page.locator("form")).toHaveCount(2);
});

test("Can add a new engine", async ({ page }) => {
	await page.locator("#add-button").click();
	await expect(page.locator("form")).toHaveCount(3);
});

test("Can remove an engine", async ({ page }) => {
	await page.locator("#add-button").click();
	await page.locator(".delete-button").first().click();
	await page.locator(".inner-delete-dialog>button").first().click();
	await expect(page.locator("form")).toHaveCount(2);
});

test("Can cancel deletion of an engine", async ({ page }) => {
	await page.locator("#add-button").click();
	await page.locator(".delete-button").first().click();
	const buttons = await page.locator(".inner-delete-dialog>button").all();

	await buttons[1].click();
	await expect(page.locator("form")).toHaveCount(3);
});

test("Can not remove the last engine", async ({ page }) => {
	await page.locator(".delete-button").first().click();
	await page.locator(".inner-delete-dialog>button").first().click();
	await expect(page.locator("form")).toHaveCount(2);
});

test("Can save engine changes", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");
	await inputs[1].fill("1.1.1.1");
	await inputs[2].fill("1");
	await inputs[3].fill("2");

	await page.locator("#save-button").click();
	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings input composite" })
		.click();

	await expect(inputs[0]).toHaveValue("test");
	await expect(inputs[1]).toHaveValue("1.1.1.1");
	await expect(inputs[2]).toHaveValue("1");
	await expect(inputs[3]).toHaveValue("2");
});

test("Can save engine with useBundle changes", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");
	await page.locator("#local-button").click();
	await inputs[2].fill("1");
	await inputs[3].fill("2");

	await page.locator("#save-button").click();
	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings input composite" })
		.click();

	await expect(inputs[0]).toHaveValue("test");
	await expect(inputs[1]).toHaveValue("");
	await expect(inputs[2]).toHaveValue("1");
	await expect(inputs[3]).toHaveValue("2");
});

test("Invalid engine name will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("");
	await inputs[1].fill("1.1.1.1");
	await inputs[2].fill("1");
	await inputs[3].fill("2");

	await page.locator("#save-button").click();
	await expect(
		page.getByText(
			"The information could not be processed. Check the input and try again.",
		),
	).toBeVisible();
});

test("Invalid engine address will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");
	await inputs[1].fill("invalid");
	await inputs[2].fill("1");
	await inputs[3].fill("2");

	await page.locator("#save-button").click();
	await expect(
		page.getByText(
			"The information could not be processed. Check the input and try again.",
		),
	).toBeVisible();
});

test("Invalid engine start port will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");
	await inputs[1].fill("1.1.1.1");
	await inputs[2].fill("-1");
	await inputs[3].fill("2");

	await page.locator("#save-button").click();
	await expect(
		page.getByText(
			"The information could not be processed. Check the input and try again.",
		),
	).toBeVisible();
});

test("Invalid engine end port will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");
	await inputs[1].fill("1.1.1.1");
	await inputs[2].fill("1");
	await inputs[3].fill("70000");

	await page.locator("#save-button").click();
	await expect(
		page.getByText(
			"The information could not be processed. Check the input and try again.",
		),
	).toBeVisible();
});

test("Invalid engine start port larger than end port will not save", async ({
	page,
}) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");
	await inputs[1].fill("1.1.1.1");
	await inputs[2].fill("2");
	await inputs[3].fill("1");

	await page.locator("#save-button").click();
	await expect(
		page.getByText(
			"The information could not be processed. Check the input and try again.",
		),
	).toBeVisible();
});

test("Unsaved name will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[0].fill("test");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved address will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[1].fill("1.1.1.1");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved start port will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[2].fill("1");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Unsaved end port will not save", async ({ page }) => {
	const inputs = await page.locator("input").all();
	await inputs[3].fill("2");

	await page.locator("#close-button").click();
	await expect(
		page.getByText(
			"You have unsaved changes. Are you sure you wish to close the Engine tab? Your changes may not be saved.",
		),
	).toBeVisible();
});

test("Can add and delete 10 engines", async ({ page }) => {
	for (let i = 0; i < 10; i++) {
		await page.locator("#add-button").click();
	}

	await expect(page.locator("form")).toHaveCount(12);

	for (let i = 0; i < 10; i++) {
		await page.locator(".delete-button").first().click();
		await page.getByRole("button", { name: "done" }).click();
	}

	await expect(page.locator("form")).toHaveCount(2);
});
