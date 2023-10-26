import type { iPoint } from "$lib/interfaces/iPoint";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.click("#start-new-project");
});

test("drag and drop a location to a new position", async ({ page }) => {

	const svg = page.locator("#node-1");

	// Get the origiganl position of the element
	const svgY = parseInt((await svg.getAttribute("cy")) ?? "1");
	const svgX = parseInt((await svg.getAttribute("cx")) ?? "1");

	/* 	Expected value of the element (there is an offset of 20 because the
	 *	element is dragged from its edge in the padding of the svg)
	 */
	const expectedX = svgX;
	const expectedY = svgY + 80;

	console.log(svgX, svgY);
	//Offset by 80
	await svg.dragTo(svg, { targetPosition: { x: 20, y: 100 }, force: true });

	// New values x and y position of the element
	const resultX = parseInt((await svg.getAttribute("cx")) ?? "1");
	const resultY = parseInt((await svg.getAttribute("cy")) ?? "1");

	// Check if the element has moved
	expect(resultX).toBe(expectedX);
	expect(resultY).toBe(expectedY);
});

test("drag and drop a nail", async ({ page }) => {

	const svg = page.locator("#node-\\!");

	// Get the origiganl position of the element
	const svgY = parseInt((await svg.getAttribute("cy")) ?? "1");
	const svgX = parseInt((await svg.getAttribute("cx")) ?? "1");

	/* 	Expected value of the element (there is an offset of 10 because the
	 *	element is dragged from its edge in the padding of the svg)
	 */
	const expectedX = svgX;
	const expectedY = svgY + 80;

	console.log(svgX, svgY);
	//Offset by 80
	await svg.dragTo(svg, { targetPosition: { x: 10, y: 90 }, force: true });

	// New values x and y position of the element
	const resultX = parseInt((await svg.getAttribute("cx")) ?? "1");
	const resultY = parseInt((await svg.getAttribute("cy")) ?? "1");

	// Check if the element has moved
	expect(resultX).toBe(expectedX);
	expect(resultY).toBe(expectedY);
});

test("see if the svg line moves with the nodes", async ({ page }) => {

	const location = page.locator("#node-3");

	// get the line location between the location and the nail
	const line = page.locator("#edge-OUTPUT-1");
	
	// get the original location of the line
	const oldSourceLocation: iPoint = {
		x: parseInt((await line.getAttribute("x1")) ?? "1"),
		y: parseInt((await line.getAttribute("y1")) ?? "1"),
	};
	
	const oldTargetLocation: iPoint = {
		x: parseInt((await line.getAttribute("x2")) ?? "1"),
		y: parseInt((await line.getAttribute("y2")) ?? "1"),
	};

	// move the location by an offset of 80
	await location.dragTo(location, { targetPosition: { x: 20, y: 100 }, force: true });
	
	// get the new location of the line
	const newSourceLocation: iPoint = {
		x: parseInt((await line.getAttribute("x1")) ?? "1"),
		y: parseInt((await line.getAttribute("y1")) ?? "1"),
	};
	
	const newTargetLocation: iPoint = {
		x: parseInt((await line.getAttribute("x2")) ?? "1"),
		y: parseInt((await line.getAttribute("y2")) ?? "1"),
	};

	// check if the line has moved (target is the location)
	expect(newSourceLocation).toEqual(oldSourceLocation);
	expect(newTargetLocation).not.toEqual(oldTargetLocation);
	
});
