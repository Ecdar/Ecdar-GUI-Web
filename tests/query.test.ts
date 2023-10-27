import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("starts with no queries", async ({ page }) => {
	await expect(page.locator(".query")).toHaveCount(0);
});

test("add a query", async ({ page }) => {
	await expect(page.locator(".query")).toHaveCount(0);
	await page.click("#add-query");
	await expect(page.locator(".query")).toHaveCount(1);
});

test("add 10 queries", async ({ page }) => {
	await expect(page.locator(".query")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.click("#add-query");
	}

	await expect(page.locator(".query")).toHaveCount(10);
});

test("delete any query", async ({ page }) => {
	await expect(page.locator(".query")).toHaveCount(0);
	await page.click("#add-query");
	await expect(page.locator(".query")).toHaveCount(1);
	await page.click("#query-button-0");
	await page.getByRole("button", { name: "Delete" }).click();
	await expect(page.locator(".query")).toHaveCount(0);
});

test("delete all 10 queries", async ({ page }) => {
	await expect(page.locator(".query")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.click("#add-query");
	}

	await expect(page.locator(".query")).toHaveCount(10);

	for (let i = 0; i < 10; i++) {
		await page.click("#query-button-0");
		await page
			.locator("#query-menu-0")
			.getByRole("button", { name: "Delete" })
			.click();
	}

	await expect(page.locator(".query")).toHaveCount(0);
});

test("delete a specific query", async ({ page }) => {
	await expect(page.locator(".query")).toHaveCount(0);

	for (let i = 0; i < 3; i++) {
		await page.click("#add-query");

		const queryInput = page
			.locator(`#query-${i}`)
			.getByPlaceholder("Query");

		await expect(queryInput).toHaveValue("");
		await queryInput.fill(`Playwright ${i}`);
		await queryInput.press("Enter");
		await expect(queryInput).toHaveValue(`Playwright ${i}`);
	}

	await expect(page.locator(".query")).toHaveCount(3);

	await page.click("#query-button-1");
	await page
		.locator("#query-menu-1")
		.getByRole("button", { name: "Delete" })
		.click();

	const queries = page.locator(".query");

	await expect(queries).toHaveCount(2);

	await expect(queries.nth(0).getByPlaceholder("Query")).toHaveValue(
		"Playwright 0",
	);
	await expect(queries.nth(1).getByPlaceholder("Query")).toHaveValue(
		"Playwright 2",
	);
});

test("can change select menu option", async ({ page }) => {
	await page.click("#add-query");
	// 	await page
	// 		.locator("#query-menu-1")
	// 		.getByRole("button", { name: "" })
	// 		.click();
});
