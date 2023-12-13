import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Start a new project' }).click();
  await page.locator('#tools-nav').getByRole('button').nth(1).click();
  await page.locator('.tool-bar-item > svg').first().click();
  await page.locator('.tool-bar-item > svg').first().press('F12');
  await page.locator('.tool-bar-item > svg').first().click();
});