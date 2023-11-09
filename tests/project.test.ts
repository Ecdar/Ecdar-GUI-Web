import { test, expect, type Dialog } from "@playwright/test";
import { P } from "@tauri-apps/api/event-41a9edf5";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("Starts only with Global Declaration", async ({ page }) => {
	await expect(page.locator(".global-dec")).toHaveCount(1);
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


