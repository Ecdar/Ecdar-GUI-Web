<script lang="ts">
	import type { ComponentType } from "svelte";

	export let icon: ComponentType;

	export let text: string;

	export let backgroundColor: string = "var(--dropdown-button-color)";

	export let buttonColor: string = "var(--dropdown-text-color))";
</script>

<button
	on:click
	style="background-color: {backgroundColor}; color: {buttonColor}"
>
	<svelte:component this={icon} ariaLabel="" class="icon" tabindex="-1" />
	<p>{text}</p>
</button>

<style>
	button {
		border: 0;
		display: flex;
		align-items: center;
		height: 2em;
		border-radius: 0.5em;
		width: 100%;
	}

	p {
		padding: 0 0.5em;
		font-size: 1em;
	}

	button:hover {
		filter: brightness(0.9);
	}
</style>
