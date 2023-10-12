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
	}

	:global(body) {
		margin: 0;
		padding: 0;
		height: 100vh;
		display: flex;
		flex-flow: column;
	}
</style>
