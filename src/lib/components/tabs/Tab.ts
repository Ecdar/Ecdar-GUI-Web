import type { ComponentType } from "svelte";

export type Tab = {
	label: string;
	component: ComponentType;
};
