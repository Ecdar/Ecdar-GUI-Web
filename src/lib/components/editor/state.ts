import { writable } from "svelte/store";

/**
 * A handler for the editor
 * */
export const editor = {
	/**
	 * The writable containing the function that runs whenever the editor pushes
	 * */
	push: writable((s: string) => {
		s;
	}),
	/**
	 * The writable that whenever set overwrites what is displayed in the editor
	 * */
	change: writable(""),
};
