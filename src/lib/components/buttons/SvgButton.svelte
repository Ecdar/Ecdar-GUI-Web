<script lang="ts">
	import type { ComponentType } from "svelte";

	export let click: (event: MouseEvent) => void = () => {};
	export let icon: ComponentType;
	export let id: string;
	export let size: number = 24;
	export let color: string = "currentColor";
	export let alignItems: string = "left";
	export let button: HTMLElement | undefined = undefined;
	export let popovertarget: string | undefined = undefined;
	export let slotSide: "left" | "right" = "right";
</script>

<div style="float: right">
	<button bind:this={button} on:click={click} {popovertarget}>
		{#if slotSide === "left"}
			<slot />
		{/if}
		<svelte:component
			this={icon}
			{id}
			{size}
			{color}
			ariaLabel=""
			tabindex="-1"
		/>
		{#if slotSide === "right"}
			<slot />
		{/if}
	</button>
</div>

<style>
	button {
		color: var(--navigationbar-text-color);
		background: none;
		border: none;
		display: flex;
		text-align: right;
		align-items: center;
		border-radius: 0.5em;
		width: 100%;
		padding: 0.4em;
		transition: background-color 200ms; /* todo: var() */
	}

	button:hover {
		background-color: var(--navigationbar-button-hover-color);
		cursor: pointer;
	}
</style>
