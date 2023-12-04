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
