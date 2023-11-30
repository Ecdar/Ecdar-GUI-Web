import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("side panels exist", async ({ page }) => {
	await expect(page.locator(".side-panel")).toHaveCount(2);
});

test("side panels have correct start flex-basis", async ({ page }) => {
	const sidePanels = await page.locator(".side-panel").all();
	for (const sidePanel of sidePanels) {
		await expect(sidePanel).toHaveCSS("flex-basis", "300px");
	}
});

test("resizers exist", async ({ page }) => {
	await expect(page.locator("#left-resizer")).toHaveCount(1);
	await expect(page.locator("#right-resizer")).toHaveCount(1);
});

test("side panels can be resized", async ({ page }) => {
	const sidePanels = await page.locator(".side-panel").all();
	const leftResizer = page.locator("#left-resizer");
	const rightResizer = page.locator("#right-resizer");
	const target = page.locator("body");

	const viewportSize = page.viewportSize();

	if (!viewportSize) {
		console.log("Could not get viewport size");
		return;
	}

	for (const size of [10, 50, 100, 200]) {
		await leftResizer.dragTo(target, {
			targetPosition: { x: 300 - size, y: 0 },
		});

		await rightResizer.dragTo(target, {
			targetPosition: { x: viewportSize.width - 300 + size, y: 20 },
		});

		for (const sidePanel of sidePanels) {
			await expect(sidePanel).toHaveCSS(
				"flex-basis",
				(300 - size).toString() + "px",
			);
		}

		await leftResizer.dragTo(target, {
			targetPosition: { x: 300 + size, y: 0 },
		});

		await rightResizer.dragTo(target, {
			targetPosition: { x: viewportSize.width - 300 - size, y: 20 },
		});

		for (const sidePanel of sidePanels) {
			await expect(sidePanel).toHaveCSS(
				"flex-basis",
				(300 + size).toString() + "px",
			);
		}
	}
});
