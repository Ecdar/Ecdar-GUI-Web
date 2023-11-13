<script lang="ts">
	import {
		More_vert,
		Delete,
		Check_box,
		Check_box_outline_blank,
	} from "svelte-google-materialdesign-icons";
	import { SystemId } from "$lib/classes/automaton/system/SystemId";
	import { ComponentId } from "$lib/classes/automaton/component/ComponentId";
	import { systems, components } from "$lib/globalState/activeProject";
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";

	export let description: string;
	export let color: string;
	export let includeInPeriodicCheck: boolean = false;
	export let id: SystemId | ComponentId;
	export let itemType: "system" | "component";

	const colorOptions = [
		"grey",
		"orange",
		"red",
		"pink",
		"purple",
		"blue",
		"skyblue",
		"cyan",
		"green",
		"brown",
	];

	const menuId = `${itemType}-menu-${id?.rawId}`;
	let button: HTMLElement;

	function togglePeriodicCheck(event: MouseEvent) {
		event.stopPropagation();
		includeInPeriodicCheck = !includeInPeriodicCheck;
	}
</script>

<button
	class="dropdown"
	bind:this={button}
	popovertarget={menuId}
	id={`${itemType}-button-${id?.rawId}`}
>
	<More_vert />
</button>
<OverlayMenu anchor={button} id={menuId}>
	{#if itemType === "component"}
		<Panel>
			<p>Configuration</p>
			{#if includeInPeriodicCheck}
				<Button
					icon={Check_box}
					text="Include in periodic check"
					click={togglePeriodicCheck}
				/>
			{:else}
				<Button
					icon={Check_box_outline_blank}
					text="Include in periodic check"
					click={togglePeriodicCheck}
				/>
			{/if}
		</Panel>
	{/if}
	<Panel>
		<p>Description</p>
		<input type="text" bind:value={description} on:click|stopPropagation />
	</Panel>
	<Panel>
		<div class="colors">
			{#each colorOptions as colorOption}
				<button
					style="background-color: {colorOption}"
					class="color"
					on:click={() => {
						color = colorOption;
					}}
				/>
			{/each}
		</div>
	</Panel>
	<Panel>
		<Button
			icon={Delete}
			text="Delete"
			click={() => {
				if (id instanceof SystemId) {
					$systems?.delete(id);
					$systems = $systems;
				} else if (id instanceof ComponentId) {
					$components?.delete(id);
					$components = $components;
				}
			}}
		/>
	</Panel>
</OverlayMenu>

<style>
	button {
		color: var(--sidebar-text-color);
		padding: 0;
	}

	p {
		margin: 0.5em 0;
	}

	.dropdown {
		background: none;
		border: none;
		cursor: pointer;
	}

	.colors {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}

	.color {
		display: inline-block;
		border: none;
		height: 2em;
		width: 2em;
		border-radius: 100%;
	}
</style>
