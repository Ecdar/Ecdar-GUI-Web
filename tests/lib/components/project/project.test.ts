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

test("Starts only with Global Declaration", async ({ page }) => {
	await expect(page.locator("#global-dec")).toHaveCount(1);
	await expect(page.locator(".project-item")).toHaveCount(0);
});

test("Add a component", async ({ page }) => {
	await expect(page.locator(".project-item.component")).toHaveCount(0);
	await page.click("#add-component");
	await expect(page.locator(".project-item.component")).toHaveCount(1);
});

test("Add a system", async ({ page }) => {
	await expect(page.locator(".project-item.system")).toHaveCount(0);
	await page.click("#add-system");
	await expect(page.locator(".project-item.system")).toHaveCount(1);
});

test("Add 10 components", async ({ page }) => {
	await expect(page.locator(".project-item.component")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.click("#add-component");
		await page.waitForLoadState();
	}

	await expect(page.locator(".project-item.component")).toHaveCount(10);
});

test("Add 10 systems", async ({ page }) => {
	await expect(page.locator(".project-item.system")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.click("#add-system");
	}

	await expect(page.locator(".project-item.system")).toHaveCount(10);
});

test("Add 5 systems and 5 components", async ({ page }) => {
	await expect(page.locator(".project-item")).toHaveCount(0);

	for (let i = 0; i < 5; i++) {
		await page.click("#add-component");
		await page.click("#add-system");
	}

	await expect(page.locator(".project-item.component")).toHaveCount(5);
	await expect(page.locator(".project-item.system")).toHaveCount(5);
});

test("Delete a component", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await expect(page.locator(".project-item.component")).toHaveCount(0);
	await page.click("#add-component");
	await expect(page.locator(".project-item.component")).toHaveCount(1);
	await page.click("#component-1-button");
	await page
		.locator("#component-1-menu")
		.getByRole("button", { name: "Delete" })
		.click();
	await expect(page.locator(".project-item.component")).toHaveCount(0);
});

test("Delete a system", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await expect(page.locator(".project-item.system")).toHaveCount(0);
	await page.click("#add-system");
	await expect(page.locator(".project-item.system")).toHaveCount(1);
	await page.click("#system-1-button");
	await page
		.locator("#system-1-menu")
		.getByRole("button", { name: "Delete" })
		.click();
	await expect(page.locator(".project-item.system")).toHaveCount(0);
});

test("Delete 10 systems", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await expect(page.locator(".project-item.system")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.locator("#add-system").click();
	}

	await expect(page.locator(".project-item.system")).toHaveCount(10);

	for (let i = 0; i < 10; i++) {
		await page.click("#system-1-button");
		await page
			.locator("#system-1-menu")
			.getByRole("button", { name: "Delete" })
			.click();
	}

	await expect(page.locator(".project-item.system")).toHaveCount(0);
});

test("Delete 10 components", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await expect(page.locator(".project-item.component")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.click("#add-component");
	}

	await expect(page.locator(".project-item.component")).toHaveCount(10);

	for (let i = 0; i < 10; i++) {
		await page.click("#component-1-button");
		await page
			.locator("#component-1-menu")
			.getByRole("button", { name: "Delete" })
			.click();
	}

	await expect(page.locator(".project-item.component")).toHaveCount(0);
});

test("Delete the 2nd component", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	for (let i = 1; i <= 3; i++) {
		await page.click("#add-component");

		await page.click(`#component-${i}-button`);
		await page
			.locator(`#component-${i}-menu`)
			.locator(`.colors > button:nth-child(${i})`)
			.first()
			.click();
	}

	await page.click("#component-2-button");
	await page
		.locator("#component-2-menu")
		.getByRole("button", { name: "Delete" })
		.click();

	const components = page.locator(".project-item.component");

	await expect(components).toHaveCount(2);
	await expect(components.nth(0).locator(".circle")).toHaveCSS(
		"background-color",
		"rgb(139, 0, 0)",
	);
	await expect(components.nth(1).locator(".circle")).toHaveCSS(
		"background-color",
		"rgb(231, 76, 60)",
	);
});

test("Can toggle includeInPeriodicCheck", async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await page.click("#add-component");

	const svgPath = page
		.locator("#component-1-menu")
		.locator("svg")
		.first()
		.locator("path");

	const firstPath = await svgPath.getAttribute("d");

	await page.click("#component-1-button");
	await page
		.locator("#component-1-menu")
		.getByRole("button", { name: "Include in periodic check" })
		.click();

	const secondPath = await svgPath.getAttribute("d");

	expect(firstPath).not.toBe(secondPath);

	await page.click("#component-1-button");
	await page
		.locator("#component-1-menu")
		.getByRole("button", { name: "Include in periodic check" })
		.click();

	const thirdPath = await svgPath.getAttribute("d");

	expect(firstPath).toBe(thirdPath);
});

test("Description should stay the same after edited", async ({
	page,
	browserName,
}) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await page.locator("#add-component").click();

	await page.locator("#component-1-button").click();
	await page
		.locator("#component-1-menu")
		.getByRole("textbox")
		.fill("This is a new description.");
	await page.keyboard.press("Escape");

	await page.locator("#component-1-button").click();
	await expect(
		page.locator("#component-1-menu").getByRole("textbox"),
	).toHaveValue("This is a new description.");
});
