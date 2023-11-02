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
