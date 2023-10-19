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
	for (let cur = elem; cur != null; cur = cur.parentNode as Element) {
		if (
			hasClass(cur, options.excludeClass) ||
			options.exclude.includes(cur)
		) {
			return true;
		}
	}
	return false;
}
