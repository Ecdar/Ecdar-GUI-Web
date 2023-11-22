import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
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

test("Delete a component", async ({ page }) => {
	await expect(page.locator(".project-item.component")).toHaveCount(0);
	await page.click("#add-component");
	await expect(page.locator(".project-item.component")).toHaveCount(1);
	await page.click("#component-button-0");
	await page
		.locator("#component-menu-0")
		.getByRole("button", { name: "Delete" })
		.click();
	await expect(page.locator(".project-item.component")).toHaveCount(0);
});

test("Delete a system", async ({ page }) => {
	await expect(page.locator(".project-item.system")).toHaveCount(0);
	await page.click("#add-system");
	await expect(page.locator(".project-item.system")).toHaveCount(1);
	await page.click("#system-button-0");
	await page
		.locator("#system-menu-0")
		.getByRole("button", { name: "Delete" })
		.click();
	await expect(page.locator(".project-item.system")).toHaveCount(0);
});

test("Delete 10 systems", async ({ page }) => {
	await expect(page.locator(".project-item.system")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.click("#add-system");
	}

	await expect(page.locator(".project-item.system")).toHaveCount(10);

	for (let i = 0; i < 10; i++) {
		await page.click("#system-button-0");
		await page
			.locator("#system-menu-0")
			.getByRole("button", { name: "Delete" })
			.click();
	}

	await expect(page.locator(".project-item.system")).toHaveCount(0);
});

test("Delete 10 components", async ({ page }) => {
	await expect(page.locator(".project-item.component")).toHaveCount(0);

	for (let i = 0; i < 10; i++) {
		await page.click("#add-component");
	}

	await expect(page.locator(".project-item.component")).toHaveCount(10);

	for (let i = 0; i < 10; i++) {
		await page.click("#component-button-0");
		await page
			.locator("#component-menu-0")
			.getByRole("button", { name: "Delete" })
			.click();
	}

	await expect(page.locator(".project-item.component")).toHaveCount(0);
});

test("Delete the grey component", async ({ page }) => {
	for (let i = 0; i < 3; i++) {
		await page.click("#add-component");

		await page.click(`#component-button-${i}`);
		await page
			.locator(`#component-menu-${i}`)
			.locator(`.colors > button:nth-child(${i + 1})`)
			.first()
			.click();
	}

	await page.click("#component-button-0");
	await page
		.locator("#component-menu-0")
		.getByRole("button", { name: "Delete" })
		.click();

	const components = page.locator(".project-item.component");

	await expect(components).toHaveCount(2);
	await expect(components.nth(0).locator(".circle")).toHaveCSS(
		"background-color",
		"rgb(199, 0, 57)",
	);
	await expect(components.nth(1).locator(".circle")).toHaveCSS(
		"background-color",
		"rgb(231, 76, 60)",
	);
});

test("Can toggle includeInPeriodicCheck", async ({ page }) => {
	await page.click("#add-component");

	const svgPath = page
		.locator("#component-menu-0")
		.locator("svg")
		.first()
		.locator("path");

	const firstPath = await svgPath.getAttribute("d");

	await page.click("#component-button-0");
	await page
		.locator("#component-menu-0")
		.getByRole("button", { name: "Include in periodic check" })
		.click();

	const secondPath = await svgPath.getAttribute("d");

	expect(firstPath).not.toBe(secondPath);

	await page.click("#component-button-0");
	await page
		.locator("#component-menu-0")
		.getByRole("button", { name: "Include in periodic check" })
		.click();

	const thirdPath = await svgPath.getAttribute("d");

	expect(firstPath).toBe(thirdPath);
});

test("Description should stay the same after edited", async ({ page }) => {
	await page.click("#add-component");

	await page.click("#component-button-0");
	await page
		.locator("#component-menu-0")
		.getByRole("textbox")
		.fill("This is a new description.");
	await page.keyboard.press("Escape");

	await page.click("#component-button-0");
	await expect(
		page.locator("#component-menu-0").getByRole("textbox"),
	).toHaveValue("This is a new description.");
});
