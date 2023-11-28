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

test("Navigating to Help, then About", async ({
	page
}) => {
	await page.getByRole("button", { name: "Help", exact: true }).click();

	await page.getByRole("button", { name: "error About" }).click();

	const aboutBox = await page.locator(".aboutBox").locator("h1").innerHTML();

	await expect(aboutBox).toBe("Ecdar v.");

	await page.getByRole("button", {name: "Close"}).click();


});
