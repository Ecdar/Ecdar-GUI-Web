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
		margin: 0;
		padding: 0;
	}

	:global(body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
