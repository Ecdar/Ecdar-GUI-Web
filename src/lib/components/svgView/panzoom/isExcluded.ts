/**
 * @file
 * Code adapted from https://www.npmjs.com/package/@panzoom/panzoom/v/4.5.1
 * The original code is not very optimized for svelte. CSS values are set at runtime instead of compile time, and events are handled outside of the svelte event loop.
 * We have forked the code to integrate it correctly with svelte.
 *
 * PLEASE DO NOT MODIFY unless it is very necessary. This code is intentionally structured to follow the source code, to make future upgrades/debugging easier.
 */

import type { PanzoomOptions } from "./types";

function getClass(elem: Element) {
	return (elem.getAttribute("class") || "").trim();
}

function hasClass(elem: Element, className: string) {
	return (
		elem.nodeType === 1 && ` ${getClass(elem)} `.includes(` ${className} `)
	);
}

export default function isExcluded(elem: Element, options: PanzoomOptions) {
	let cur: ParentNode | null = elem;
	while (cur !== null) {
		if (
			isElement(cur) &&
			(hasClass(cur, options.excludeClass) ||
				options.exclude.includes(cur))
		) {
			return true;
		}
		cur = cur.parentNode;
	}
	return false;
}

function isElement(value: unknown): value is Element {
	return value instanceof Element;
}
