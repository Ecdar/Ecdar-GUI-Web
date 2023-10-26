<script lang="ts">
	import EmptyElement from "$lib/components/topBar/Empty.svelte";
	import { setContext, type ComponentType } from "svelte";

	//Set dafult button name and icon
	export let name: string = "Default";
	export let icon: ComponentType = EmptyElement;
	export let checkbox: boolean = false;

	let checkboxMarked:boolean = false;

	//Set icon attributes
	const iconCtx = {
		strokeWidth: "1.5",
		size: "15",
		variation: "filled",
	};
	setContext("iconCtx", iconCtx);

	

</script>

<!--Make each dropdown item, into button-->

<button class="dropdown-item" on:click={() =>{checkboxMarked = !checkboxMarked}}>
	{#if checkbox}
		{#if checkboxMarked}
			<svelte:component this={icon} color="black"></svelte:component>
		{:else}
			<svelte:component this={icon} color="transparent"></svelte:component>
		{/if}
	{:else}
		<svelte:component this={icon}></svelte:component>
	{/if}
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
