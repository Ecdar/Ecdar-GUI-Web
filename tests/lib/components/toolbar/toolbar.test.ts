import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState();
	await page.click("#start-new-project");
});


test('toolbar collapses and extends', async ({ page }) => {
  let toolbar = await page.getByTestId("toolbar").boundingBox();
  await expect(toolbar?.height).toEqual(0);
  await page.locator('#tools-nav').getByRole('button').nth(1).click();
  toolbar = await page.getByTestId("toolbar").boundingBox();
  await expect(toolbar?.height).toBeGreaterThan(0);
  await page.locator('#tools-nav').getByRole('button').nth(1).click();
  toolbar = await page.getByTestId("toolbar").boundingBox();
  await expect(toolbar?.height).toEqual(0);
});