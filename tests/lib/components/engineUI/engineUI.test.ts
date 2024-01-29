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
	await expect(page.locator(".engines>div")).toHaveCount(1);
});

test("Can add a new engine", async ({ page }) => {
	await page.locator("#add-button").click();
	await expect(page.locator(".engines>div")).toHaveCount(2);
});

test("Can remove an engine", async ({ page }) => {
	await page.locator("#button-box").getByRole("button").nth(1).click();
	await page
		.locator("#engine-ui-outer div")
		.filter({ hasText: "Engines Are you sure you wish" })
		.getByRole("button")
		.nth(2)
		.click();
	await page
		.locator("#engine-ui-outer")
		.getByRole("dialog")
		.getByRole("button")
		.first()
		.click();
	await expect(page.locator(".engines>div")).toHaveCount(1);
});

test("Can cancel deletion of an engine", async ({ page }) => {
	await page.locator("#button-box").getByRole("button").nth(1).click();
	await page
		.locator("#engine-ui-outer div")
		.filter({ hasText: "Engines Are you sure you wish" })
		.getByRole("button")
		.nth(2)
		.click();
	await page
		.locator("#engine-ui-outer")
		.getByRole("dialog")
		.getByRole("button")
		.nth(1)
		.click();
	await expect(page.locator(".engines>div")).toHaveCount(2);
});

test("Can not remove the last engine", async ({ page }) => {
	await page.locator(".delete-button").first().click();
	await page
		.locator("#engine-ui-outer")
		.getByRole("dialog")
		.getByRole("button")
		.nth(1)
		.click();
	await expect(page.locator(".engines>div")).toHaveCount(1);
});

test("Can save engine changes", async ({ page }) => {
	const inputs = await page.locator("#engine-ui-outer input").all();
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
	const inputs = await page.locator("#engine-ui-outer input").all();
	await inputs[0].fill("test");
	await page.locator("#local-button").getByRole("button").click();
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
	const inputs = await page.locator("#engine-ui-outer input").all();
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
	const inputs = await page.locator("#engine-ui-outer input").all();
	await inputs[0].fill("test");
	await inputs[1].fill("5.5.5.5.5");
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
	const inputs = await page.locator("#engine-ui-outer input").all();
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
	const inputs = await page.locator("#engine-ui-outer input").all();
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
	const inputs = await page.locator("#engine-ui-outer input").all();
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

test("Can add and delete 10 engines", async ({ page }) => {
	for (let i = 0; i < 10; i++) {
		await page.locator("#add-button").click();
	}

	await expect(page.locator(".engines>div")).toHaveCount(11);

	for (let i = 0; i < 10; i++) {
		await page.locator(".delete-button").first().click();
		await page
			.locator("#engine-ui-outer")
			.getByRole("dialog")
			.getByRole("button")
			.first()
			.click();
	}

	await expect(page.locator(".engines>div")).toHaveCount(1);
});
