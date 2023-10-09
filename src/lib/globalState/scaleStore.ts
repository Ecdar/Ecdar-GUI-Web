import { writable } from "svelte/store";

export const scale = writable(1);

export function updateScale(newScale: number) {
	scale.set(newScale);
}
