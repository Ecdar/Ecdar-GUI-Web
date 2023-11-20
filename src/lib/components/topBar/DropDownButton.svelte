<script lang="ts">
	import EmptyElement from "$lib/components/topBar/Empty.svelte";
	import { setContext, type ComponentType } from "svelte";

	//Set dafult button name and icon
	export let name: string = "Default";
	export let icon: ComponentType = EmptyElement;
	export let color: string = "black";

	//Set icon attributes
	const iconContext = {
		strokeWidth: "1.5",
		size: "15",
		variation: "filled",
	};
	setContext("iconContext", iconContext);
</script>

<!--Make each dropdown item, into button-->

<button class="dropdown-item" on:click>
	<svelte:component color={color} this={icon}></svelte:component>
	<div class="align-text">{name}</div>
</button>

<style>
	.align-text {
		width: 100%;
		text-align: center;
	}

	.dropdown-item {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
	}

	.dropdown-item:hover {
		filter: brightness(0.9);
	}
</style>
