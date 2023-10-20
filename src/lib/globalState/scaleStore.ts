import { writable, type Writable } from "svelte/store";

/**
 * Dines the current scaling of the main SVG view.
 * We need to know the current scaling when calculating the position of locations based on the mouse position.
 */
export const scale: Writable<number> = writable(1);
