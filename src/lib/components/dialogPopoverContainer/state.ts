import { writable } from "svelte/store";

export enum Popup {
	None,
	Settings,
	About,
	Engine,
}

export const popup = writable(Popup.None);
