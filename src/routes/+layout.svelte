<script lang="ts">
	import ContextMenu from "$lib/components/contextMenu/ContextMenu.svelte";
	import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";
	import { browser } from "$app/environment";

	if (browser) {
		// Catch errors here and show error popup
		try {
			new GlobalCssSchemesLoader();
		} catch (e) {
			console.log(e);
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
	}

	:global(body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
		margin: 0;
		background-color: var(--background-color);
	}

	:global(button:not(:disabled)) {
		cursor: pointer;
	}

	:global(svg) {
		outline: none;
	}
</style>
