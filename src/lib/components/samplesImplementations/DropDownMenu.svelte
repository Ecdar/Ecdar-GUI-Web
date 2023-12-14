<script lang="ts">
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";
	import { Save, Download } from "svelte-google-materialdesign-icons";

	const menuId = "menu-files";

	let button: HTMLElement;
</script>

<button bind:this={button} popovertarget={menuId}>Files</button>
<OverlayMenu anchor={button} id={menuId}>
	<Panel>
		<Button icon={Download} text="Load" on:click={() => {}} />
	</Panel>
	<Panel>
		<Button icon={Save} text="Save" on:click={() => {}} />
	</Panel>
</OverlayMenu>
