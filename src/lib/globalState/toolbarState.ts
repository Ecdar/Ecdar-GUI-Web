import type ToolBarItem from "$lib/components/toolBar/ToolBarItemOld.svelte";
import { writable, type Writable} from "svelte/store";

export let toolbarState: ToolBarItem;
//export const toolbarState: {
//    [NAME: string]: Writable<boolean>;
//} = {};

export function changeToolBarItemState(name: string, defaultValue: boolean){
    if (typeof toolbarState[name] === typeof undefined) {
		toolbarState[name] = writable(defaultValue);
	}
}