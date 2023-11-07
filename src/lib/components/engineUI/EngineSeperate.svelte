<script lang="ts">
	import { EngineType } from "$lib/classes/engine/EngineType";
	import type { event } from "@tauri-apps/api";
	import Dialog from "../dialogPopover/Dialog.svelte";
	import type { EngineDTO } from "./EngineDTO";

	let formElement: HTMLFormElement;
	let modalContainer: Dialog;
	let nameContainer: HTMLInputElement;
	let ipAddressContainer: HTMLInputElement;
	let startPortContainer: HTMLInputElement;
	let endPortContainer: HTMLInputElement;
	let engineTypeContainer: HTMLInputElement;

	export let defaultChecked: number;
	export let currentEngine: EngineDTO;

	function deleteEngine() {
		currentEngine.address = "-1";
		formElement.parentNode?.removeChild(formElement);
		closeModal();
	}

	function showModal() {
		modalContainer.showModal();
	}
	function onNameChange() {
		currentEngine.name = nameContainer.value;
	}

	function onIPChange() {
		currentEngine.address = ipAddressContainer.value;
	}

	function onStartPortChange(e:Event) {
		currentEngine.portRangeStart = Number(startPortContainer.value);
	}

	function onEndPortChange() {
		currentEngine.portRangeEnd = Number(endPortContainer.value);
	}

	function onEngineTypeChange(e: Event) {
		let temp: HTMLInputElement = <HTMLInputElement>e.target;

		switch (temp.value) {
			case "Reveaal":
				currentEngine.type = EngineType.Reveaal;
				break;
			case "JEcdar":
				currentEngine.type = EngineType.JEcdar;
				break;
			case "API":
				currentEngine.type = EngineType.API;
				break;
			default:
				currentEngine.type = defaultChecked;
				break;
		}
	}

	function closeModal(){
		modalContainer.closeModal();
	}
</script>

<Dialog bind:this={modalContainer}>
	<h2>
		Are you sure you wish to delete the engine: {#if currentEngine.name !== undefined}
			{currentEngine.name}
		{/if}
	</h2>
	<button on:click={deleteEngine} type="button"> Yes </button>
	<button on:click={closeModal} type="button"> No </button>
</Dialog>

<form bind:this={formElement}>
	<button type="button" id="show-modal" on:click={showModal}>Delete</button>
	<br />
	<label for="name">Name:</label>
	<input
		type="text"
		placeholder="Name"
		id="name"
		on:change={onNameChange}
		bind:this={nameContainer}
	/> <br />
	<label for="IP">IP Address:</label>
	<input
		type="text"
		placeholder="IP"
		id="IP"
		on:change={onIPChange}
		bind:this={ipAddressContainer}
	/> <br />
	<label for="STARTPORT">Port:</label>
	<input
		type="number"
		placeholder="7000"
		id="STARTPORT"
		on:change={onStartPortChange}
		bind:this={startPortContainer}
	/>
	-
	<input
		type="number"
		placeholder="7000"
		id="ENDPORT"
		on:change={onEndPortChange}
		bind:this={endPortContainer}
	/> <br />
	<input
		type="radio"
		id="reveaal"
		name="engine_type"
		value="Reveaal"
		checked={defaultChecked == EngineType.Reveaal}
		on:change={onEngineTypeChange}
		bind:this={engineTypeContainer}
	/>
	<label for="reveaal">Reveaal</label> <br />
	<input
		type="radio"
		id="jecdar"
		name="engine_type"
		value="JEcdar"
		checked={defaultChecked == EngineType.JEcdar}
		on:change={onEngineTypeChange}
		bind:this={engineTypeContainer}
	/>
	<label for="jecdar">JEcdar</label> <br />
	<input
		type="radio"
		id="reveaalapi"
		name="engine_type"
		value="API"
		checked={defaultChecked == EngineType.API}
		on:change={onEngineTypeChange}
		bind:this={engineTypeContainer}
	/>
	<label for="reveaalapi">Ecdar API</label> <br />
</form>
