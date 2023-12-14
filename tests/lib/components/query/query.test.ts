import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState();
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");
	await page.click("#start-new-project");
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");
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

test("delete any query", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await expect(page.locator(".query")).toHaveCount(0);
	await page.click("#add-query");
	await expect(page.locator(".query")).toHaveCount(1);
	await page.click("#query-button-0");
	await page.getByRole("button", { name: "Delete" }).click();
	await expect(page.locator(".query")).toHaveCount(0);
});

test("delete all 10 queries", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

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

test("delete a specific query", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

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

test("can write in query field", async ({ page }) => {
	await page.click("#add-query");

	const queryInput = page.locator(`#query-0`).getByPlaceholder("Query");

	await expect(queryInput).toHaveValue("");
	for (const string of ["Query String", "Jesper", "Bastian", "Anton"]) {
		await queryInput.fill(string);
		await queryInput.press("Enter");
		await expect(queryInput).toHaveValue(string);
	}
});

test("can write in comment field", async ({ page }) => {
	await page.click("#add-query");

	const commentInput = page.locator(`#query-0`).getByPlaceholder("Comment");

	await expect(commentInput).toHaveValue("");
	for (const string of ["Comment String", "Anders"]) {
		await commentInput.fill(string);
		await commentInput.press("Enter");
		await expect(commentInput).toHaveValue(string);
	}
});

test("can change type to all options", async ({ page }) => {
	await page.click("#add-query");

	const combobox = page.locator("#query-0").getByRole("combobox").first();

	const typeOptions: Record<string, string> = {
		specification: "Spec",
		implementation: "Imp",
		consistency: "Con",
		reachability: "E<>",
		refinement: "<=",
		"local-consistensy": "LCon",
		"bisim-minim": "Bsim",
		"get-component": "Get",
	};

	await expect(combobox).toHaveValue("specification");
	for (const [key, value] of Object.entries(typeOptions)) {
		await combobox.selectOption(value);
		await expect(combobox).toHaveValue(key);
	}
});

test("can change backend to all options", async ({ page }) => {
	await page.click("#add-query");

	const combobox = page.locator("#query-0").getByRole("combobox").nth(1);

	const serverOptions = ["0", "1"];

	for (const server of serverOptions) {
		await combobox.selectOption(server);
		await expect(combobox).toHaveValue(server);
	}
});

test("can change isPeriodic", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await page.click("#add-query");

	const svgPath = page
		.locator("#query-menu-0")
		.locator("svg")
		.first()
		.locator("path");

	const firstPath = await svgPath.getAttribute("d");

	await page.click("#query-button-0");
	await page
		.locator("#query-menu-0")
		.getByRole("button", { name: "Run Periodically" })
		.click();

	const secondPath = await svgPath.getAttribute("d");

	expect(firstPath).not.toBe(secondPath);

	await page.click("#query-button-0");
	await page
		.locator("#query-menu-0")
		.getByRole("button", { name: "Run Periodically" })
		.click();

	const thirdPath = await svgPath.getAttribute("d");

	expect(firstPath).toBe(thirdPath);
});
