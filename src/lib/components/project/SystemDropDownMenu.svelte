<script lang="ts">
	import { More_vert, Delete } from "svelte-google-materialdesign-icons";
	import { systems } from "$lib/globalState/activeProject";
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";

	export let description: string;
	export let color: string;
	export let index: number;

	const menuId = `system-menu-${index}`;
	let button: HTMLElement;
</script>

<button
	class="dropdown"
	bind:this={button}
	popovertarget={menuId}
	id={`system-button-${index}`}
>
	<More_vert />
</button>
<OverlayMenu anchor={button} id={menuId}>
	<Panel>
		<p>{description}</p>
	</Panel>
	<Panel>
		{#each ["grey", "orange", "red", "pink", "purple", "blue", "skyblue", "cyan", "green", "brown"] as colorOption}
			<button
				style="background-color: {colorOption}"
				class="color"
				on:click={() => {
					color = colorOption;
				}}
			/>
		{/each}
	</Panel>
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
	.dropdown {
		background: none;
		border: none;
		cursor: pointer;
	}

	.color {
		display: inline-block;
		height: 2em;
		width: 2em;
		border-radius: 100%;
	}
</style>
