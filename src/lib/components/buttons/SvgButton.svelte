<script lang="ts">
	import type { ComponentType } from "svelte";

	export let click: (event: MouseEvent) => void = () => {};
	export let icon: ComponentType;
	export let id: string;
	export let size: number = 24;
	export let color: string = "currentColor";
	export let button: HTMLElement | undefined = undefined;
	export let popovertarget: string | undefined = undefined;
</script>

<button bind:this={button} on:click={click} {popovertarget}>
	<svelte:component
		this={icon}
		{id}
		{size}
		{color}
		ariaLabel=""
		tabindex="-1"
	/>
</button>

<style>
	button {
		color: var(--navigationbar-text-color);
		background: none;
		border: none;
		display: flex;
		align-items: center;
		border-radius: 0.5em;
		width: 100%;
		padding: 0.4em;
		transition: var(--svgbutton-background-color-transition);
	}

	button:hover {
		background-color: var(--navigationbar-button-hover-color);
		cursor: pointer;
	}
</style>
