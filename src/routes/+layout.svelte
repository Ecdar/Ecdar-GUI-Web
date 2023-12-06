<script lang="ts">
	import { browser } from "$app/environment";
	import ContextMenu from "$lib/components/contextMenu/ContextMenu.svelte";

	if (browser) {
		/**
		 * This is a temporary fix to not show the popover elements in Firefox, which has not enabled support for popover elements yet
		 * TOOO: remove this when the popover element is enabled by default: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#browser_compatibility
		 */
		if (!Object.hasOwnProperty.call(HTMLElement.prototype, "popover")) {
			const style = document.createElement("style");
			document.head.appendChild(style);
			style.sheet?.insertRule("div[popover] { display: none; }");
		}
	}
</script>

<svelte:head>
	<title>Ecdar</title>
</svelte:head>

<svelte:window on:contextmenu|preventDefault />

<slot />
<ContextMenu />

<style>
	:global(*) {
		box-sizing: border-box;
		font-family: var(--font-family);
	}

	:global(body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
		margin: 0;
		background-color: var(--background-color);
		color: var(--text-color);
	}

	:global(button:not(:disabled)) {
		cursor: pointer;
	}

	:global(svg) {
		outline: none;
	}
</style>
