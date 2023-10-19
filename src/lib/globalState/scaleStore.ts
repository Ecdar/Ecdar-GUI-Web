import { writable, type Writable } from "svelte/store";

export const scale: Writable<number> = writable(1);
