<script lang="ts">
	import { More_vert, Delete } from "svelte-google-materialdesign-icons";
	import { systems } from "$lib/globalState/activeProject";
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";

	export let index: number;

	const menuId = `system-menu-${index}`;
	let button: HTMLElement;
</script>

<button bind:this={button} popovertarget={menuId} id={`system-button-${index}`}>
	<More_vert />
</button>
<OverlayMenu anchor={button} id={menuId}>
	<Panel>
		<Button
			icon={Delete}
			text="Delete"
			click={() => {
				$systems?.splice(index, 1);
				$systems = $systems;
			}}
		/>
	</Panel>
</OverlayMenu>

<style>
	button {
		background: none;
		border: none;
		cursor: pointer;
	}
</style>
