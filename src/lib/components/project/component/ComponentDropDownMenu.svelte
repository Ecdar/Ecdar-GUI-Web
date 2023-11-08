<script lang="ts">
	import { More_vert, Delete } from "svelte-google-materialdesign-icons";
	import { components } from "$lib/globalState/activeProject";
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";

	export let description: string;
	export let color;
	export let index: number;

	const menuId = `component-menu-${index}`;
	let button: HTMLElement;
</script>

<button
	class="dropdown"
	bind:this={button}
	popovertarget={menuId}
	id={`component-button-${index}`}
>
	<More_vert />
</button>
<OverlayMenu anchor={button} id={menuId}>
	<Panel>
		<p>{description}</p>
	</Panel>
	<Panel>
		<Button
			icon={Delete}
			text="Delete"
			click={() => {
				$components?.splice(index, 1);
				$components = $components;
			}}
		/>
	</Panel>
	<Panel>
		{#each ["red", "blue", "green"] as colorOption}
			<button
				class="color {colorOption}"
				on:click={() => {
					color = colorOption;
				}}
			/>
		{/each}
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

	.color.red {
		background-color: red;
	}

	.color.blue {
		background-color: blue;
	}

	.color.green {
		background-color: green;
	}
</style>
