import { writable, type Writable} from "svelte/store";

export const toolbarState: {
    [NAME: string]: Writable<string>;
} = {};

export function addToolbarItemState(name: string, defaultValue: string){
    if (typeof toolbarState[name] === typeof undefined) {
		toolbarState[name] = writable(defaultValue);
	}
}