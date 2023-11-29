<script lang="ts">
	import GlobalFontLoader from "$lib/classes/styling/GlobalFontLoader";
	import Console from "$lib/classes/console/Console";
</script>

<input
	on:change={(event) => {
		if (event instanceof Event) GlobalFontLoader.uploadCustomFont(event);
	}}
	type="file"
	accept=".ttf, .otf"
/>

<button
	on:click={() => {
		if (confirm("Are you sure that you want to reset the custom font?")) {
			GlobalFontLoader.clearCustomFont().catch(() => {
				Console.writeLineFrontend(
					`An error occured while resetting fonts`,
				);
			});
		}
	}}>Reset Font</button
>

<style>
	button {
		background-color: red;
	}
</style>
