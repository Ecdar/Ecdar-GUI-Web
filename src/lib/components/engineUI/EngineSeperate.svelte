<script lang="ts">
	import type EngineStorage from "$lib/classes/engine/EngineStorage";
	import Dialog from "../dialogPopover/Dialog.svelte";

	let formElement: HTMLFormElement;
	let modalContainer: Dialog;

	export let defaultChecked: number;
	export let engineStorage: EngineStorage | undefined;
	export let engineID: number | undefined;
	let nameContainer: HTMLInputElement;

	function deleteEngine() {
		if (engineID == undefined) {
			formElement.parentNode?.removeChild(formElement);
			return;
		}
		engineStorage?.deleteEngine(engineID);
	}

	function showModal() {
		modalContainer.showModal();
	}
</script>

<Dialog bind:this={modalContainer}>
	<h2>
		Are you sure you wish to delete the engine {#if engineID !== undefined}
			{engineID}
		{/if}
	</h2>
	<form method="dialog">
		<button on:click={deleteEngine}> Yes </button>
		<button> No </button>
	</form>
</Dialog>

<form bind:this={formElement}>
	<button type="submit" id="show-modal" on:click={showModal}>Delete</button>
	<br />
	<label for="name">Name:</label>
	<input
		type="text"
		placeholder="Name"
		name="name"
		bind:this={nameContainer}
	/> <br />
	<label for="IP">IP Address:</label>
	<input type="text" placeholder="IP" name="IP" /> <br />
	<label for="IP">Start Port:</label>
	<input type="text" placeholder="7000" name="IP" /> <br />
	<label for="IP">End Port:</label>
	<input type="text" placeholder="7000" name="IP" /> <br />
	<input
		type="radio"
		id="reveaal"
		name="engine_type"
		value="Reveaal"
		checked={defaultChecked == 0}
	/>
	<label for="reveeal">Reveaal</label> <br />
	<input
		type="radio"
		id="jecdar"
		name="engine_type"
		value="JEcdar"
		checked={defaultChecked == 1}
	/>
	<label for="jecdar">JEcdar</label> <br />
	<input
		type="radio"
		id="reveaalapi"
		name="engine_type"
		value="API"
		checked={defaultChecked == 2}
	/>
	<label for="reveaalapi">Ecdar API</label> <br />
</form>
