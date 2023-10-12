import type { ComponentType } from "svelte";
import type { PointLike } from "$lib/classes/draw";
import { content as contentStore, anchor, open } from "./state";
import { PointElement } from "../overlayMenu/PointElement";
import type { ContextMenuProps } from "./ContextMenuProps";

/**
 * Adds a context menu (right click menu) to an element. The element must define what the context menu should include.
 */
export function contextMenu(
	target: EventTarget,
	{ content, props }: { content: ComponentType; props: ContextMenuProps },
) {
	const abortController = new AbortController();
	target.addEventListener(
		"contextmenu",
		(event) => {
			if (!(event instanceof MouseEvent))
				throw new TypeError(
					"Received a context menu event that is not a pointer/mouse event. This should never happen.",
				);
			openOverlayMenu(event, content, props);
		},
		{ signal: abortController.signal },
	);

	return {
		destroy() {
			abortController.abort();
		},
	};
}

function openOverlayMenu(
	point: PointLike,
	component: ComponentType,
	props: ContextMenuProps,
) {
	contentStore.set({ component, props });
	anchor.set(new PointElement(point.x, point.y));
	open.set(true);
}
