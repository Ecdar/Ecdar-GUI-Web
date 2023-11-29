<script lang="ts">
	import GlobalFontLoader from "$lib/classes/styling/GlobalFontLoader";
	import Console from "$lib/classes/console/Console";
</script>

<div>
	<input
		on:change={(event) => {
			if (event instanceof Event)
				GlobalFontLoader.uploadCustomFont(event);
		}}
		type="file"
		accept=".ttf, .otf"
	/>

	<button
		class="delete"
		on:click={() => {
			if (
				confirm("Are you sure that you want to reset the custom font?")
			) {
				GlobalFontLoader.clearCustomFont().catch(() => {
					Console.writeLineFrontend(
						`An error occured while resetting fonts`,
					);
				});
			}
		}}>Reset Font</button
	>
</div>

<style>
	div {
		margin: 1em;
	}

	button {
		color: var(--navigationbar-text-color);
		border: none;
		padding: 0.5em 1em;
		transition: background-color 200ms;
	}

	.delete {
		background-color: var(--settings-danger-button-color);
	}

	.delete:hover {
		filter: brightness(1.2);
	}
</style>
