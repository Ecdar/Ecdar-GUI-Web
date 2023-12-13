<script lang="ts">
	import { setContext, type ComponentType } from "svelte";
	import { tooltip } from "svooltip";
	import "svooltip/styles.css"; // Include default styling
	import selectedItem from "$lib/globalState/toolbarState";

	export let icon: ComponentType;
	export let name: string;
	export let onClick: () => void;
	export let description: string;

	/**
	 * Calls the on:Click function on the button
	 */
	function handleClick() {
		onClick();
		$selectedItem = name;
	}

	const iconCtx = {
		strokeWidth: "1.5",
		size: "100%",
		variation: "filled",
	};
	setContext("iconCtx", iconCtx);

	const slugify = (str = "") =>
		str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<label
	class="tool-bar-item"
	for={slugify(name)}
	use:tooltip={{ content: description }}
>
	<input
		type="radio"
		name="tools"
		id={slugify(name)}
		value={name}
		on:click={handleClick}
		style="display: none;"
	/>
	<svelte:component this={icon} style={"color: var(--toolbar-icon-color)"}
	></svelte:component>
</label>

<style>
	.tool-bar-item {
		display: inline-flex;
		align-items: left;
		justify-content: space-evenly;
		width: calc(
			100% / 9
		); /* adjusts the space evenly to the tools. In this case 9 buttons*/
		border: var(--main-innernavigationbar-border);
		cursor: pointer;
		margin-bottom: -2px;
		background-color: var(--toolbar-icon-background-color);
	}
	label:has(input[type="radio"]:checked) {
		background-color: var(--toolbar-selected-color);
	}
</style>
