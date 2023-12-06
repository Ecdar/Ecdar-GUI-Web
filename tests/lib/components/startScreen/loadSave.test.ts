import { test, expect, type FileChooser } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState();
});

test("should be able to open(load) Ecdar University", async ({ page }) => {
	const files = [
		"Queries.json",
		"GlobalDeclaration.json",
		"Systems/University Example.json",
		"Components/Administration 1.json",
		"Components/Administration 2.json",
		"Components/Coffee Machine 1.json",
		"Components/Coffee Machine 2.json",
		"Components/Coffee Machine 3.json",
		"Components/Half Administration 1.json",
		"Components/Half Administration 2.json",
		"Components/Researcher.json",
		"Components/Specification.json",
	];

	const paths = files.map(
		(file) =>
			".Ecdar-Common/Project-Examples/examples/Ecdar university/" + file,
	);

	await page.locator("#open-project").setInputFiles(paths);
	page.on("filechooser", chooseEcdarUniversity);

	// Now the browser specific file dialog is open
});

function chooseEcdarUniversity(fileChooser: FileChooser) {
	const files = [
		"Queries.json",
		"GlobalDeclaration.json",
		"Systems/University Example.json",
		"Components/Administration 1.json",
		"Components/Administration 2.json",
		"Components/Coffee Machine 1.json",
		"Components/Coffee Machine 2.json",
		"Components/Coffee Machine 3.json",
		"Components/Half Administration 1.json",
		"Components/Half Administration 2.json",
		"Components/Researcher.json",
		"Components/Specification.json",
	];

	const paths = files.map(
		(file) =>
			".Ecdar-Common/Project-Examples/examples/Ecdar university/" + file,
	);

	fileChooser.setFiles(paths).catch((e) => {
		throw e;
	});
}
