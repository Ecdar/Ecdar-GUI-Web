<script lang="ts">
	import GlobalFontLoader from "$lib/classes/styling/GlobalFontLoader";
	import Console from "$lib/classes/console/Console";

	let uploadButtonReference: HTMLButtonElement;
	let inputReference: HTMLInputElement;
</script>

<div>
	<input
		id="fontInput"
		type="file"
		accept=".ttf, .otf"
		bind:this={inputReference}
		on:change={(event) => {
			if (event instanceof Event)
				GlobalFontLoader.uploadCustomFont(event, uploadButtonReference);
		}}
	/>
	<p>Custom Font <code>(.ttf/.otf)</code></p>
	<button
		bind:this={uploadButtonReference}
		class="add"
		on:click={() => {
			inputReference.click();
		}}
	>
		Click here to upload a font
	</button>

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
		margin: 1.25em;
	}

	p {
		margin-top: 0;
		margin-bottom: 0.5em;
	}

	code {
		font-family: initial;
		opacity: 0.5;
	}

	input {
		display: none;
	}

	button {
		padding: 0.5em 1em;
		height: 2.5em;
		border: none;
	}

	.add {
		color: var(--navigationbar-text-color);
		background-color: var(--settings-safe-button-color);
		transition: var(--settings-background-color-transition);
	}

	.add:hover {
		filter: brightness(1.2);
	}

	.delete {
		background-color: darkred;
		color: white;
		float: right;
	}

	.delete:hover {
		filter: brightness(1.2);
	}
</style>
