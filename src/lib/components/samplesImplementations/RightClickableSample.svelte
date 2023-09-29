<script lang="ts">
	import {
		Star,
		Zoom_in,
		Delete,
		Warning,
	} from "svelte-google-materialdesign-icons";
	import { ContextMenuItem } from "../svelte-modifiers/rightClickableComponents/context_menu_item";
	import RightClickable from "../svelte-modifiers/RightClickable.svelte";

	const menuItems: ContextMenuItem[] = [
		new ContextMenuItem(false, "View", () => void 0, Zoom_in),
		new ContextMenuItem(true),
		new ContextMenuItem(
			false,
			"Delete",
			(target) => {
				target.remove();
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
			(element) => {
				element.remove();
			},
			Delete,
			"danger",
		),
	];
</script>

<div>
	<RightClickable {menuItems}>
		<h1>Test Component 1 Here</h1>
	</RightClickable>
	<RightClickable menuItems={menuItems2}>
		<h1>Test Component 2 Here</h1>
	</RightClickable>
</div>
