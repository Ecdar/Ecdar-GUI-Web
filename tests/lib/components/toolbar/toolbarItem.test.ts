import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test('selected button lights up correctly', async ({ page }) => {
  await page.locator('#tools-nav').getByRole('button').nth(1).click();
  const firstButtonColor = await page.locator('.tool-bar-item > svg')
                                     .first()
                                     .innerHTML;

  await page.locator('.tool-bar-item > svg')
            .first()
            .click();

  const firstButtonSelectedColor = await page.getByTestId("toolbar")
                                             .nth(1)
                                             .getAttribute('background-color');

  await page.locator('label:nth-child(2) > svg').click();

  const firstButtonUnselectedColor = await page.getByTestId('toolbar')
                                               .nth(1)
                                               .getAttribute('background-color');

  const secondButtonSelectedColor = await page.getByTestId('toolbar')
                                              .nth(2)
                                              .getAttribute("background-color");
  
  await expect(firstButtonColor).toBe("black");
  await expect(firstButtonColor).toEqual(firstButtonUnselectedColor);
  await expect(firstButtonUnselectedColor).not.toBe(firstButtonSelectedColor);
  await expect(firstButtonSelectedColor).toBe(secondButtonSelectedColor);
});