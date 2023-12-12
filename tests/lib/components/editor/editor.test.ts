import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Ecdar university" }).click();
});

test("Write in editor", async ({ page }) => {
	await page
		.locator("#administration-1")
		.getByRole("button", { name: "folder special Administration 1" })
		.click();
	const span1 = await page
		.locator("#editor")
		.locator(".editor-text")
		.locator("span")
		.innerHTML();
	expect(span1).toBe("clock");
	await expect(page.getByText("clock z;")).toBeVisible();

	await page.locator("#editor").locator(".editor-text").click();
	for (let i = 0; i <= 8; i++) {
		await page.keyboard.press("ArrowRight");
	}
	await page.keyboard.press("Enter");

	await page.keyboard.type("clock x;");

	await page
		.locator("#administration-2")
		.getByRole("button", { name: "folder special Administration 2" })
		.click();
	await page
		.locator("#administration-1")
		.getByRole("button", { name: "folder special Administration 1" })
		.click();

	await expect(page.getByText("clock x;")).toBeVisible();
});

test("Correct line numers in editor", async ({ page }) => {
	await page
		.locator("#coffee-machine-1")
		.getByRole("button", { name: "folder special Coffee Machine 1" })
		.click();
	await page.locator("#editor").locator(".editor-text").click();
	for (let i = 0; i < 4; i++) {
		await page.keyboard.press("Enter");
	}

	await expect(page.locator(".editor-linenum")).toHaveCount(5);

	for (let i = 0; i < 2; i++) {
		await page.keyboard.press("Backspace");
	}

	await expect(page.locator(".editor-linenum")).toHaveCount(3);
});

test("Change between editor- and svg-view", async ({ page }) => {
	await page
		.locator("#administration-1")
		.getByRole("button", { name: "folder special Administration 1" })
		.click();
	await expect(page.getByText("clock z;")).toBeVisible();

	const toggleDraw = await page
		.locator("#canvas-nav")
		.locator("svg")
		.getAttribute("id");
	expect(toggleDraw).toBe("toggle-draw");

	await page.locator("#canvas-nav").getByRole("button").click();

	await expect(page.getByText("L0")).toBeVisible();
	const toggleEditor = await page
		.locator("#canvas-nav")
		.locator("svg")
		.getAttribute("id");
	expect(toggleEditor).toBe("toggle-editor");
});

test("Pressing Global Declarations, removes the button to change between draw and editor", async ({
	page,
}) => {
	await page
		.getByRole("button", { name: "description Global Declarations" })
		.click();

	const canvasNav = await page
		.locator("#canvas-nav")
		.locator("div")
		.innerHTML();

	expect(canvasNav).toBe(" ");
});
