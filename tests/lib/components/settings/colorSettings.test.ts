import { test, expect } from "@playwright/test";

// TODO: create tests when GUNGI is in modal

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("can create valid color", async ({ page }) => {});

test("can update valid color", async ({ page }) => {});

test("can delete valid color", async ({ page }) => {});

test("cannot create invalid color", async ({ page }) => {});

test("cannot update invalid color", async ({ page }) => {});

test("can delete invalid color", async ({ page }) => {});
