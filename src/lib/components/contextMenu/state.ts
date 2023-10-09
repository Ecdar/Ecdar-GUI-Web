import { writable, type Writable } from "svelte/store";
import type { ComponentType } from "svelte";
import type { ContextMenuProps } from "./ContextMenuProps";
import { PointElement } from "../overlayMenu/PointElement";
import type { ReferenceElement } from "@floating-ui/dom";

/**
 * The content to put in the context menu.
 */
export const content: Writable<{
	component: ComponentType | undefined;
	props: ContextMenuProps;
}> = writable({ component: undefined, props: undefined });

/**
 * The suggested position of the context menu. The context menu might alter this position to be more visible.
 */
export const anchor: Writable<ReferenceElement> = writable(
	new PointElement(0, 0),
);

/**
 * Whether or not the context menu is being shown.
 * You can use this to control and/or get the current state of the context menu.
 */
export const open: Writable<boolean> = writable(false);
