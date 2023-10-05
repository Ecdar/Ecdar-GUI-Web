import type { ContextMenuItem } from "./ContextMenuItem";
import { Point, type PointLike } from "$lib/classes/draw";
import { writable, type Writable } from "svelte/store";

/**
 * The menu items that the context menu will display.
 */
export const menuItems: Writable<ContextMenuItem[]> = writable([]);

/**
 * The suggested position of the context menu. The context menu might alter this position to be more visible.
 */
export const position: Writable<PointLike> = writable(new Point(0, 0));

/**
 * Whether or not the context menu is being shown.
 * You can use this to control and/or get the current state of the context menu.
 */
export const open: Writable<boolean> = writable(false);
