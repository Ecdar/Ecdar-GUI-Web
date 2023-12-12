import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test('buttons light up when selected', async ({ page }) => {
  await page.locator('#tools-nav').getByRole('button').nth(1).click();

  const firstButton = await page.locator('.tool-bar-item > svg').first();
  expect(firstButton).toHaveCSS('background-color', 'var(--toolbar-icon-background-color)');
  await page.locator('.tool-bar-item > svg').first().click();
  
  const firstButtonClicked = await page.locator('.tool-bar-item > svg').first();
  expect(firstButtonClicked).toHaveCSS('background-color', 'var(--toolbar-selected-color)');

  await page.locator('label:nth-child(2) > svg').click();
  
  expect(firstButton).toHaveCSS('background-color', 'var(--toolbar-icon-background-color)');
});