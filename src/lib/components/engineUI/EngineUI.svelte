<script lang="ts">
	import Dialog from "../dialogPopover/Dialog.svelte";

	let formElement: HTMLFormElement;
	let dialogContainer: Dialog;

	export function showEngineUI() {
		dialogContainer.showModal();
	}
</script>

<button on:click={showEngineUI}> Show</button>
<Dialog bind:this={dialogContainer}>
	<form bind:this={formElement}>
		<label for="IP">IP Address:</label>
		<input type="text" placeholder="IP" name="IP" />
		<button type="button">Confirm</button>
	</form>

	<button>Close</button>
</Dialog>

<style>
</style>
