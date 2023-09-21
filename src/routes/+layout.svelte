<svelte:head>
	<title>Ecdar</title>
</svelte:head>

<slot />

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
