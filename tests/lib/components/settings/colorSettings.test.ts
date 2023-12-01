import { test, expect, type Dialog } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");

	await page.getByRole("button", { name: "Options", exact: true }).hover();
	await page
		.getByRole("button", { name: "settings Settings", exact: true })
		.click();
});

test("can create valid color", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const inputs = await page.locator(`input[type="number"]`).all();

	await inputs[0].fill("1");
	await inputs[1].fill("0");
	await inputs[2].fill("1");

	await page.locator("#add-color").click();

	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(srgb 1 0 1)",
	);
});

test("can use color picker to choose a valid color", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const inputs = await page.locator(`input[type="color"]`).all();

	await inputs[0].fill("#ff00ff");

	await page.locator("#add-color").click();

	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(srgb 1 0 1)",
	);
});

test("can use color picker to update a valid color", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const numberInputs = await page.locator(`input[type="number"]`).all();

	await numberInputs[0].fill("0");
	await numberInputs[1].fill("0");
	await numberInputs[2].fill("0");

	await page.locator("#add-color").click();

	const colorInputs = await page.locator(`input[type="color"]`).all();

	await colorInputs[1].fill("#ff00ff");

	await page.getByRole("button", { name: "Update", exact: true }).click();

	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(srgb 1 0 1)",
	);
});

test("can update valid color", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const inputs = await page.locator(`input[type="number"]`).all();

	await inputs[0].fill("0");
	await inputs[1].fill("0");
	await inputs[2].fill("0");

	await page.locator("#add-color").click();

	const modifiedColorFields = await page
		.locator(".bottom .custom-color")
		.first()
		.locator(`input[type="number"]`)
		.all();

	await modifiedColorFields[0].fill("1");
	await modifiedColorFields[1].fill("0");
	await modifiedColorFields[2].fill("1");

	await page.getByRole("button", { name: "Update", exact: true }).click();

	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(srgb 1 0 1)",
	);
});

test("can delete valid color", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const inputs = await page.locator(`input[type="number"]`).all();

	await inputs[0].fill("1");
	await inputs[1].fill("0");
	await inputs[2].fill("1");

	await page.locator("#add-color").click();

	page.on("dialog", acceptDialouge);

	await page.locator(".bottom .delete").click();
	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(display-p3 0.95686 0.95686 0.95686)",
	);
});

test("can delete invalid color", async ({ page }) => {
	page.on("dialog", acceptDialouge);

	for (const testValue of ["2", "-1", ""]) {
		await page.locator("#select-property").selectOption("Background Color");

		const inputs = await page.locator(`input[type="number"]`).all();

		await inputs[0].fill("1");
		await inputs[1].fill("0");
		await inputs[2].fill("1");

		await page.locator("#add-color").click();

		const modifiedColorFields = await page
			.locator(".bottom .custom-color")
			.first()
			.locator(`input[type="number"]`)
			.all();

		await modifiedColorFields[0].fill("1");
		await modifiedColorFields[1].fill("0");
		await modifiedColorFields[2].fill(testValue);

		await page.locator(".bottom .delete").click();

		await expect(page.locator("body")).toHaveCSS(
			"background-color",
			"color(display-p3 0.95686 0.95686 0.95686)",
		);
	}
});

test("cannot create invalid color", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const inputs = await page.locator(`input[type="number"]`).all();

	await inputs[0].fill("1");
	await inputs[1].fill("0");
	await inputs[2].fill("2");

	await expect(
		page.getByRole("button", { name: "Add", exact: true }),
	).toBeDisabled();
});

test("cannot update invalid color", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const inputs = await page.locator(`input[type="number"]`).all();

	await inputs[0].fill("1");
	await inputs[1].fill("0");
	await inputs[2].fill("1");

	await page.locator("#add-color").click();

	const modifiedColorFields = await page
		.locator(".bottom .custom-color")
		.first()
		.locator(`input[type="number"]`)
		.all();

	await modifiedColorFields[0].fill("1");
	await modifiedColorFields[1].fill("0");
	await modifiedColorFields[2].fill("2");

	await expect(
		page.getByRole("button", { name: "Update", exact: true }),
	).toBeDisabled();
});

test("can reset colors", async ({ page }) => {
	await page.locator("#select-property").selectOption("Background Color");

	const inputs = await page.locator(`input[type="number"]`).all();

	await inputs[0].fill("1");
	await inputs[1].fill("0");
	await inputs[2].fill("1");

	await page.locator("#add-color").click();

	page.on("dialog", acceptDialouge);

	await page.locator("#reset-colors").click();

	await expect(page.locator("body")).toHaveCSS(
		"background-color",
		"color(display-p3 0.95686 0.95686 0.95686)",
	);
});

function acceptDialouge(dialog: Dialog): void {
	dialog.accept().catch(() => {
		throw new Error("Dialog was not accepted");
	});
}
