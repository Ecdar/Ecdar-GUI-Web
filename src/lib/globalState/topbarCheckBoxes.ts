import { writable, type Writable } from "svelte/store";

export const checkboxStates: {
	[NAME: string]: Writable<boolean>;
} = {};

export function addCheckbox(name: string, defaultVal: boolean) {
	if (typeof checkboxStates[name] === typeof undefined) {
		checkboxStates[name] = writable(defaultVal);
	}
}
