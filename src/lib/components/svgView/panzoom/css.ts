/**
 * @file
 * Code adapted from https://www.npmjs.com/package/@panzoom/panzoom/v/4.5.1
 * The original code is not very optimized for svelte. CSS values are set at runtime instead of compile time, and events are handled outside of the svelte event loop.
 * We have forked the code to integrate it correctly with svelte.
 *
 * PLEASE DO NOT MODIFY unless it is very necessary. This code is intentionally structured to follow the source code, to make future upgrades/debugging easier.
 */

import type { CurrentValues } from "./types";

/**
 * Gets a style value expected to be a number
 */
export function getCSSNum(name: string, style: CSSStyleDeclaration) {
	return parseFloat(style.getPropertyValue(name)) || 0;
}

function getBoxStyle(
	elem: HTMLElement | SVGElement,
	name: string,
	style: CSSStyleDeclaration = window.getComputedStyle(elem),
) {
	// Support: FF 68+
	// Firefox requires specificity for border
	const suffix = name === "border" ? "Width" : "";
	return {
		left: getCSSNum(`${name}Left${suffix}`, style),
		right: getCSSNum(`${name}Right${suffix}`, style),
		top: getCSSNum(`${name}Top${suffix}`, style),
		bottom: getCSSNum(`${name}Bottom${suffix}`, style),
	};
}

/**
 * Activate or deactivate animated transitions on the DOM element
 */
export type setTransition = (active: boolean) => void;

/**
 * Set the transform of the DOM element
 *
 * ```js
 * // This example always sets a rotation
 * // when setting the scale and translation
 * const panzoom = Panzoom(elem, {
 *   setTransform: (elem, { scale, x, y }) => {
 *     panzoom.setStyle('transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
 *   }
 * })
 * ```
 */
export type setTransform = (values: CurrentValues) => void;

/**
 * Dimensions used in containment and focal point zooming
 */
export function getDimensions(elem: HTMLElement | SVGElement) {
	const parent = elem.parentNode as HTMLElement | SVGElement;
	const style = window.getComputedStyle(elem);
	const parentStyle = window.getComputedStyle(parent);
	const rectElem = elem.getBoundingClientRect();
	const rectParent = parent.getBoundingClientRect();

	return {
		elem: {
			style,
			width: rectElem.width,
			height: rectElem.height,
			top: rectElem.top,
			bottom: rectElem.bottom,
			left: rectElem.left,
			right: rectElem.right,
			margin: getBoxStyle(elem, "margin", style),
			border: getBoxStyle(elem, "border", style),
		},
		parent: {
			style: parentStyle,
			width: rectParent.width,
			height: rectParent.height,
			top: rectParent.top,
			bottom: rectParent.bottom,
			left: rectParent.left,
			right: rectParent.right,
			padding: getBoxStyle(parent, "padding", parentStyle),
			border: getBoxStyle(parent, "border", parentStyle),
		},
	};
}
