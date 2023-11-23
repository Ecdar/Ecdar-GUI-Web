import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test('Clicking about button', async ({ context, page }) => {
	const pagePromise = context.waitForEvent('page');

	await page.getByRole('button', { name: 'Help', exact: true }).click();
	page.on("dialog", async dialog => {
		await dialog.accept();
	})
	await page.getByRole('button', { name: 'error About' }).click();

	const newPage = await pagePromise;
	await newPage.waitForLoadState();
	await expect(await newPage.title()).toEqual("ECDAR");

  });