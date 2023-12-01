/**
 * @file
 * Code adapted from https://www.npmjs.com/package/@panzoom/panzoom/v/4.5.1
 * The original code is not very optimized for svelte. CSS values are set at runtime instead of compile time, and events are handled outside of the svelte event loop.
 * We have forked the code to integrate it correctly with svelte.
 *
 * PLEASE DO NOT MODIFY unless it is very necessary. This code is intentionally structured to follow the source code, to make future upgrades/debugging easier.
 */

/**
 * Utilites for working with multiple pointer events
 */

function findEventIndex(pointers: PointerEvent[], event: PointerEvent) {
	let i = pointers.length;
	while (i--) {
		if (pointers[i].pointerId === event.pointerId) {
			return i;
		}
	}
	return -1;
}

export function addPointer(pointers: PointerEvent[], event: PointerEvent) {
	const i = findEventIndex(pointers, event);
	// Update if already present
	if (i > -1) {
		pointers.splice(i, 1);
	}
	pointers.push(event);
}

export function removePointer(pointers: PointerEvent[], event: PointerEvent) {
	const i = findEventIndex(pointers, event);
	if (i > -1) {
		pointers.splice(i, 1);
	}
}

/**
 * Calculates a center point between
 * the given pointer events, for panning
 * with multiple pointers.
 */
export function getMiddle(pointers: PointerEvent[]) {
	// Copy to avoid changing by reference
	pointers = [...pointers];
	const firstPointer = pointers.pop();
	if (firstPointer === undefined) {
		return { clientX: 0, clientY: 0 };
	}
	let location: Pick<PointerEvent, "clientX" | "clientY"> = firstPointer;
	for (const pointer of pointers) {
		location = {
			clientX:
				(pointer.clientX - location.clientX) / 2 + location.clientX,
			clientY:
				(pointer.clientY - location.clientY) / 2 + location.clientY,
		};
	}
	return location;
}

/**
 * Calculates the distance between two points
 * for pinch zooming.
 * Limits to the first 2
 */
export function getDistance(pointers: PointerEvent[]) {
	if (pointers.length < 2) {
		return 0;
	}
	const event1 = pointers[0];
	const event2 = pointers[1];
	return Math.sqrt(
		Math.pow(Math.abs(event2.clientX - event1.clientX), 2) +
			Math.pow(Math.abs(event2.clientY - event1.clientY), 2),
	);
}
