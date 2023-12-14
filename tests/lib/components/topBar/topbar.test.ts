import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

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
