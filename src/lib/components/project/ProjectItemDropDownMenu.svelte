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
	import SvgButton from "$lib/components/buttons/SvgButton.svelte";

	export let description: string;
	export let color: string;
	export let includeInPeriodicCheck: boolean = false;
	export let id: SystemId | ComponentId;
	export let itemType: "system" | "component";

	const UniqueId = id.rawId.split(" ").join("-").toLowerCase();

	const colorOptions = [
		"#8B0000", // Dark Red
		"#C70039", // Imperial Red
		"#e74c3c", // Alizarin Crimson
		"#FF5733", // Dark Orange
		"#f39c12", // Orange
		"#FFC300", // Vivid Yellow
		"#e67e22", // Carrot
		"#d35400", // Pumpkin
		"#2ecc71", // Emerald
		"#1abc9c", // Turquoise
		"#3498db", // Dodger Blue
		"#34495e", // Wet Asphalt
		"#2c3e50", // Midnight Blue
		"#9b59b6", // Amethyst
		"#581845", // Dark Purple
		"#900C3F", // Deep Red
	];

	const menuId = `${UniqueId}-menu`;
	let button: HTMLElement;

	/**
	 * Function for toggling the includeInPeriodicCheck variable
	 * @param event
	 */
	function togglePeriodicCheck(event: MouseEvent) {
		event.stopPropagation();
		includeInPeriodicCheck = !includeInPeriodicCheck;
	}
</script>

<SvgButton
	bind:button
	icon={More_vert}
	popovertarget={menuId}
	id={`${UniqueId}-button`}
	color="var(--sidebar-text-color)"
/>
<OverlayMenu anchor={button} id={menuId}>
	{#if itemType === "component"}
		<Panel>
			<p>Configuration</p>
			<Button
				icon={includeInPeriodicCheck
					? Check_box
					: Check_box_outline_blank}
				text="Include in periodic check"
				on:click={togglePeriodicCheck}
			/>
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
					on:click|stopPropagation={() => {
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
			on:click={() => {
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
		display: flex;
	}

	p {
		margin: 0.5em 0;
		text-align: left;
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
