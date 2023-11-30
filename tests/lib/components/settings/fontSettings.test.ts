import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

// TODO: create tests when GUNGI is in modal

test("can upload real font", async ({ page }) => {
	expect(undefined).toBe(undefined);
});

test("cannot upload broken font", async ({ page }) => {});

test("cannot upload non-permitted font file type", async ({ page }) => {});
