import {expect, test} from "@playwright/test";

test('drag and drop a location ', async ({page}) => {
	await page.goto('/');

	const svg = page.locator('#node1');

	// Get the origiganl position of the element
	const svgY = parseInt(await svg.getAttribute('cy') ?? "1");
	const svgX = parseInt(await svg.getAttribute('cx') ?? "1");

/* 	Expected value of the element (there is an offset of 20 because the 
*	element is dragged from its edge in the padding of the svg)
*/
	const expectedX = svgX;
	const expectedY = svgY + 80;
	
	console.log(svgX, svgY);
	//Offset by 80
	await svg.dragTo(svg, {targetPosition: {x: 20, y: 100}, force: true});


	// New values x and y position of the element
	const resultX = parseInt(await svg.getAttribute('cx') ?? "1");
	const resultY = parseInt(await svg.getAttribute('cy') ?? "1");

	// Check if the element has moved
	expect(resultX).toBe(expectedX);
	expect(resultY).toBe(expectedY);
});
