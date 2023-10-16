<script lang="ts">
	import ContextMenu from "$lib/components/contextMenu/ContextMenu.svelte";
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
		flex-flow: column;
	}
</style>
