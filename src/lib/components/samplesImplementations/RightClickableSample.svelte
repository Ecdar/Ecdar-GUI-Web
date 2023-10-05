<script lang="ts">
	import {
		Star,
		Zoom_in,
		Delete,
		Warning,
	} from "svelte-google-materialdesign-icons";
	import { ContextMenuItem } from "../svelteModifiers/contextMenu/ContextMenuItem";
	import { contextMenu } from "../svelteModifiers/contextMenu";

	let circle: SVGElement;
	const menuItems: ContextMenuItem[] = [
		new ContextMenuItem(false, "View", () => void 0, Zoom_in),
		new ContextMenuItem(true),
		new ContextMenuItem(
			false,
			"Delete",
			() => {
				circle.remove();
			},
			Delete,
			"danger",
		),
		new ContextMenuItem(
			false,
			"Deattach",
			() => void 0,
			Warning,
			"warning",
		),
		new ContextMenuItem(false, "Star", () => void 0, Star, "success"),
	];
	let heading: HTMLElement;
	const menuItems2: ContextMenuItem[] = [
		new ContextMenuItem(
			false,
			"Warning",
			() => {
				console.log("Warned the user");
			},
			Warning,
			"warning",
		),
		new ContextMenuItem(
			false,
			"Remove",
			() => {
				heading.remove();
			},
			Delete,
			"danger",
		),
	];
</script>

<svg
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
	width="50px"
	height="50px"
>
	<circle
		use:contextMenu={{ menuItems: menuItems }}
		bind:this={circle}
		cx="50"
		cy="50"
		r="50"
	/>
</svg>
<h3 use:contextMenu={{ menuItems: menuItems2 }} bind:this={heading}>
	Right click me
</h3>
