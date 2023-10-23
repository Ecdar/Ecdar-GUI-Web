<script lang="ts">
	import ContextMenu from "$lib/components/contextMenu/ContextMenu.svelte";
	import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";
	import { browser } from "$app/environment";

	let colorSchemeLoader: GlobalCssSchemesLoader;

	if (browser) {
		colorSchemeLoader = new GlobalCssSchemesLoader(window);
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
		margin: 0;
		padding: 0;
		height: 100vh;
		display: flex;
		flex-flow: column;
	}
</style>
