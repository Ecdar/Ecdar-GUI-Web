import { test, expect, type Dialog } from "@playwright/test";

const testFilesPath = "tests/lib/components/settings/testfiles";

test.beforeEach(async ({ page, browserName }) => {
	// TODO: remove this check when Firefox and WebKit supports popover: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility
	test.skip(
		browserName === "firefox" || browserName === "webkit",
		"Popover not supported yet",
	);

	await page.goto("/");
	await page.waitForLoadState();
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");
	await page.click("#start-new-project");
	await page.waitForLoadState("load");
	await page.waitForLoadState("domcontentloaded");

	await page.getByRole("button", { name: "Options", exact: true }).click();
	await page.getByRole("button", { name: "Settings", exact: true }).click();
	await page.getByRole("button", { name: "Font", exact: true }).click();
});

test("can upload and apply real font", async ({ page }) => {
	const fileChooserPromise = page.waitForEvent("filechooser");
	const uploadButton = page.getByRole("button", {
		name: "Click here to upload a font",
		exact: true,
	});
	await uploadButton.click();
	const fileChooser = await fileChooserPromise;

	// Select one file
	await fileChooser.setFiles(`${testFilesPath}/Lobster-Regular.ttf`);

	// Test if the font has been applied
	await page.evaluate(() => {
		document.fonts.onloadingdone = () => {
			const fontIsLoaded = document.fonts.check("12px CustomFont");
			expect(fontIsLoaded).toBe(true);
		};
	});

	await expect(
		page.getByRole("button", {
			name: "Click here to upload a font",
			exact: true,
		}),
	).toHaveCSS("background-color", "color(srgb 0.3255 0.498 0.2667)");
});

test("cannot upload broken font", async ({ page }) => {
	const fileChooserPromise = page.waitForEvent("filechooser");
	const uploadButton = page.getByRole("button", {
		name: "Click here to upload a font",
		exact: true,
	});
	await uploadButton.click();
	const fileChooser = await fileChooserPromise;

	// Select one file
	await fileChooser.setFiles(`${testFilesPath}/emptyNonFontFile.ttf`);

	// Test if the font has been applied
	await page.evaluate(() => {
		document.fonts.onloadingdone = () => {
			const fontIsLoaded = document.fonts.check("12px CustomFont");
			expect(fontIsLoaded).toBe(false);
		};
	});

	await expect(
		page.getByRole("button", {
			name: "Click here to upload a font",
			exact: true,
		}),
	).toHaveCSS("background-color", "color(srgb 0.498 0.0902 0.0549)");
});

test("cannot upload non-permitted font file type", async ({ page }) => {
	const fileChooserPromise = page.waitForEvent("filechooser");
	const uploadButton = page.getByRole("button", {
		name: "Click here to upload a font",
		exact: true,
	});
	await uploadButton.click();
	const fileChooser = await fileChooserPromise;

	// Select one file
	await fileChooser.setFiles(`${testFilesPath}/hello.txt`);

	// Test if the font has been applied
	await page.evaluate(() => {
		document.fonts.onloadingdone = () => {
			const fontIsLoaded = document.fonts.check("12px CustomFont");
			expect(fontIsLoaded).toBe(false);
		};
	});

	await expect(
		page.getByRole("button", {
			name: "Click here to upload a font",
			exact: true,
		}),
	).toHaveCSS("background-color", "color(srgb 0.498 0.0902 0.0549)");
});

test("can reset font", async ({ page }) => {
	const fileChooserPromise = page.waitForEvent("filechooser");
	const resetButton = page.getByRole("button", {
		name: "Reset Font",
		exact: true,
	});
	await page
		.getByRole("button", {
			name: "Click here to upload a font",
			exact: true,
		})
		.click();
	const fileChooser = await fileChooserPromise;

	// Select one file
	await fileChooser.setFiles(`${testFilesPath}/Lobster-Regular.ttf`);

	// Test if the new font has been applied
	await page.evaluate(() => {
		document.fonts.onloadingdone = () => {
			const fontIsLoaded = document.fonts.check("12px CustomFont");
			expect(fontIsLoaded).toBe(true);
		};
	});

	// Accept dialog to accept to reset font
	page.on("dialog", acceptDialogue);

	await resetButton.click();

	// Test if the font has been reset
	await page.evaluate(() => {
		document.fonts.onloadingdone = () => {
			const fontIsLoaded = document.fonts.check("12px CustomFont");
			expect(fontIsLoaded).toBe(false);
		};
	});
});

test("cannot upload multiple files at once", async ({ page }) => {
	const fileChooserPromise = page.waitForEvent("filechooser");

	await page
		.getByRole("button", {
			name: "Click here to upload a font",
			exact: true,
		})
		.click();

	const fileChooser = await fileChooserPromise;

	expect(fileChooser.isMultiple()).toBe(false);
});

function acceptDialogue(dialog: Dialog): void {
	dialog.accept().catch(() => {
		throw new Error("Dialog was not accepted");
	});
}
