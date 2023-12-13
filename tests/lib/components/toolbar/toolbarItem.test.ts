import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test('selected button lights up correctly', async ({ page }) => {
  await page.locator('#tools-nav').getByRole('button').nth(1).click();
  const firsttool =  page.locator('.tool-bar-item').first();
  const unSelectedcolor = await firsttool.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('background-color');

  })


  await page.locator('.tool-bar-item > svg')
            .first()
            .click();


  const Selectedcolor = await firsttool.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('background-color');

  })
  await page.locator('label:nth-child(2) > svg').click();

  expect(Selectedcolor).not.toBe(unSelectedcolor);

  const secondTool =  page.locator('.tool-bar-item').nth(1);

  const secondToolSelectedcolor = await secondTool.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('background-color');

  })

  expect(Selectedcolor).toBe(secondToolSelectedcolor);
});