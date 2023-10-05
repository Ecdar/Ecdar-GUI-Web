import type { Action } from "svelte/action";
import type { ContextMenuTarget } from "./contextMenu/ContextMenuTarget";
import type { ContextMenuItem } from "./contextMenu/ContextMenuItem";
import type { PointLike } from "$lib/classes/draw";
import {
	menuItems as menuItemsStore,
	position as positionStore,
	open as openStore,
} from "./contextMenu/state";

/**
 * Adds a context menu (right click menu) to an element. The element must define what the context menu should include.
 * @type {Action<ContextMenuTarget, { menuItems: ContextMenuItem[] }>}
 */
export function contextMenu(
	target: ContextMenuTarget,
	{ menuItems }: { menuItems: ContextMenuItem[] },
) {
	target.addEventListener("contextmenu", (event) => {
		if (!(event instanceof MouseEvent))
			throw new TypeError(
				"Received a context menu event that is not a pointer/mouse event. This should never happen.",
			);
		openContextMenu(event, menuItems);
	});

	return {
		destroy() {
			target.removeEventListener("contextmenu", (event) => {
				if (!(event instanceof MouseEvent))
					throw new TypeError(
						"Received a context menu event that is not a pointer/mouse event. This should never happen.",
					);
				openContextMenu(event, menuItems);
			});
		},
	};
}

function openContextMenu(point: PointLike, menuItems: ContextMenuItem[]) {
	menuItemsStore.set(menuItems);
	positionStore.set(point);
	openStore.set(true);
}
