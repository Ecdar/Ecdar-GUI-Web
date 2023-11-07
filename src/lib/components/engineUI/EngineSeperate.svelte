<script lang="ts">
	import { EngineType } from "$lib/classes/engine/EngineType";
	import Dialog from "../dialogPopover/Dialog.svelte";
	import type { EngineDTO } from "./EngineDTO";

	let formElement: HTMLFormElement;
	let modalContainer: Dialog;
    let nameContainer: HTMLInputElement;

	export let defaultChecked: number;
	export let currentEngine: EngineDTO;

	function deleteEngine() {
		currentEngine.address = "-1";
	}

	function showModal() {
		modalContainer.showModal();
	}
    function onNameChange(){
        currentEngine.name = nameContainer.value;
    }
</script>

<Dialog bind:this={modalContainer}>
	<h2>
		Are you sure you wish to delete the engine: {#if currentEngine.name !== undefined}
			{currentEngine.name}
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
	<input type="text" placeholder="Name" id="name" on:change={onNameChange} bind:this={nameContainer}/> <br />
	<label for="IP">IP Address:</label>
	<input type="text" placeholder="IP" id="IP" /> <br />
	<label for="STARTPORT">Port:</label>
	<input type="number" placeholder="7000" id="STARTPORT" /> -
	<input type="number" placeholder="7000" id="ENDPORT" /> <br />
	<input
		type="radio"
		id="reveaal"
		name="engine_type"
		value="Reveaal"
		checked={defaultChecked == EngineType.Reveaal}
	/>
	<label for="reveaal">Reveaal</label> <br />
	<input
		type="radio"
		id="jecdar"
		name="engine_type"
		value="JEcdar"
		checked={defaultChecked == EngineType.JEcdar}
	/>
	<label for="jecdar">JEcdar</label> <br />
	<input
		type="radio"
		id="reveaalapi"
		name="engine_type"
		value="API"
		checked={defaultChecked == EngineType.API}
	/>
	<label for="reveaalapi">Ecdar API</label> <br />
</form>
