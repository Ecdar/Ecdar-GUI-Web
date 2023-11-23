import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("Check and uncheck Project Panel checkbox", async ({ page }) => {
	await page.getByRole("button", { name: "View", exact: true }).click();
	let color = await page
		.getByRole("button", { name: "done Project Panel" })
		.locator("svg")
		.getAttribute("fill");
	expect(color).toBe("transparent");

	await page.getByRole("button", { name: "done Project Panel" }).click();
	color = await page
		.getByRole("button", { name: "done Project Panel" })
		.locator("svg")
		.getAttribute("fill");
	expect(color).toBe("black");

	await page.getByRole("button", { name: "done Project Panel" }).click();
	color = await page
		.getByRole("button", { name: "done Project Panel" })
		.locator("svg")
		.getAttribute("fill");
	expect(color).toBe("transparent");
});

test("Clicking about button", async ({ context, page }) => {
	const pagePromise = context.waitForEvent("page");

	await page.getByRole("button", { name: "Help", exact: true }).click();

	const popup = new Promise((res, rej) => {
		page.on("dialog", (dialog) => {
			dialog
				.accept()
				.then(() => {
					res(undefined);
				})
				.catch(() => {
					rej();
				});
		});
	});

	await page.getByRole("button", { name: "error About" }).click();

	const newPage = await pagePromise;
	await newPage.waitForLoadState();
	await popup;
	expect(await newPage.title()).toEqual("ECDAR");
});
