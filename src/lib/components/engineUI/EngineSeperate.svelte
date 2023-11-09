<script lang="ts">
	import { EngineType } from "$lib/classes/engine/EngineType";
	import Modal from "../dialogPopover/Modal.svelte";
	import type { EngineDTO } from "./EngineDTO";
	import { Delete, Close, Done } from "svelte-google-materialdesign-icons";

	let formElement: HTMLFormElement;
	let modalContainer: Modal;
	let nameContainer: HTMLInputElement;
	let ipAddressContainer: HTMLInputElement;
	let startPortContainer: HTMLInputElement;
	let endPortContainer: HTMLInputElement;
	let engineTypeContainer: HTMLInputElement;

	export let defaultChecked: EngineType;
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

	function onStartPortChange() {
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

	function closeModal() {
		modalContainer.closeModal();
	}
</script>

<Modal bind:this={modalContainer}>
	<div class="delete-dialog">
		<div class="inner-delete-dialog">
			<h4 id="delete-text">
				Are you sure you wish to delete the engine:
				{currentEngine.name}
			</h4>
			<button
				on:click={deleteEngine}
				type="button"
				class="delete-selection"
			>
				<Done size="18" />
			</button>
			<button
				on:click={closeModal}
				type="button"
				class="delete-selection"
			>
				<Close size="18" />
			</button>
		</div>
	</div>
</Modal>

<form bind:this={formElement}>
	Name:
	<input
		type="text"
		placeholder="Name"
		id="name"
		on:change={onNameChange}
		bind:this={nameContainer}
	/>
	<button
		type="button"
		id="show-modal"
		class="delete-button"
		on:click={showModal}><Delete size="18" /></button
	>
	<br />
	IP Address:
	<input
		type="text"
		placeholder="192.168.1.1"
		id="IP"
		on:change={onIPChange}
		bind:this={ipAddressContainer}
	/> <br />
	Port range:
	<input
		type="number"
		placeholder="7000"
		id="STARTPORT"
		class="port-input"
		on:change={onStartPortChange}
		bind:this={startPortContainer}
	/>
	-
	<input
		type="number"
		placeholder="7000"
		id="ENDPORT"
		class="port-input"
		on:change={onEndPortChange}
		bind:this={endPortContainer}
	/> <br />
	<input
		type="radio"
		id="reveaal"
		name="engine_type"
		value="Reveaal"
		class="radio-inputs"
		checked={defaultChecked == EngineType.Reveaal}
		on:change={onEngineTypeChange}
		bind:this={engineTypeContainer}
	/>
	Reveaal<br />
	<input
		type="radio"
		id="jecdar"
		name="engine_type"
		value="JEcdar"
		class="radio-inputs"
		checked={defaultChecked == EngineType.JEcdar}
		on:change={onEngineTypeChange}
		bind:this={engineTypeContainer}
	/>
	JEcdar<br />
	<input
		type="radio"
		id="reveaalapi"
		name="engine_type"
		value="API"
		class="radio-inputs"
		checked={defaultChecked == EngineType.API}
		on:change={onEngineTypeChange}
		bind:this={engineTypeContainer}
	/>
	Ecdar API<br />
</form>

<style>
	form {
		background-color: rgb(159, 174, 189);
		padding: 0.2em;
	}

	.delete-button {
		border: 0;
		padding: 0 0.1em 0 0.1em;
		background-color: transparent;
		float: right;
		cursor: pointer;
	}

	.delete-dialog {
		padding: 0.6em;
	}

	.inner-delete-dialog {
		padding: 0.2em;
		background-color: rgb(159, 174, 189);
	}

	#IP {
		width: 10em;
	}

	.port-input {
		width: 4em;
		border: none;
		border-bottom: 0.05em solid black;
		background-color: rgb(159, 174, 189);
		text-align: center;
	}

	.port-input::placeholder {
		color: rgb(68, 68, 68);
	}

	.port-input::-webkit-inner-spin-button,
	.port-input::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.port-input::-moz-inner-spin-button,
	.port-input::-moz-outer-spin-button {
		-moz-appearance: none;
		margin: 0;
	}

	input[type="text"] {
		border: none;
		border-bottom: 0.05em solid black;
		background-color: rgb(159, 174, 189);
		margin: 0.2em;
	}

	input[type="text"]::placeholder {
		color: rgb(68, 68, 68);
	}

	.radio-inputs {
		cursor: pointer;
		margin: 0.15em;
		border-radius: 50%;
	}

	.delete-selection {
		border: 0;
		border-bottom: 0.05em solid black;
		padding: 0.2em 0.2em 0 0.2em;
		background-color: transparent;
		cursor: pointer;
		margin-left: 0.5em;
		margin-right: 0.5em;
	}

	#delete-text {
		margin: 0.2em;
	}
</style>
