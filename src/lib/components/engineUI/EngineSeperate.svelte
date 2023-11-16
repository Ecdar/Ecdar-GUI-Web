<script lang="ts">
	import { EngineType } from "$lib/classes/engine/EngineType";
	import Modal from "../dialogPopover/Modal.svelte";
	import type { EngineDTO } from "./EngineDTO";
	import { Delete, Close, Done } from "svelte-google-materialdesign-icons";
	import type iModalComponent from "$lib/interfaces/IModalComponent";

	let formElement: HTMLFormElement;
	let modalContainer: Modal & iModalComponent;
	let nameContainer: HTMLInputElement;
	let ipAddressContainer: HTMLInputElement;
	let startPortContainer: HTMLInputElement;
	let endPortContainer: HTMLInputElement;

	export let currentEngine: EngineDTO;
	export let tempEngines: Array<EngineDTO>;

	/**
	 * Delete an engine by setting the adress of the engine to -1 and removing it from the view
	 */
	function deleteEngine() {
		currentEngine.address = "-1";
		if (tempEngines.length == 1) {
			nameContainer.value = "";
			ipAddressContainer.value = "";
			startPortContainer.value = "";
			endPortContainer.value = "";
			currentEngine.name = "";
			closeModal();
			return;
		}
		formElement.parentNode?.removeChild(formElement);
		closeModal();
	}

	function showModal() {
		modalContainer.showModal();
	}
	function onNameChange() {
		currentEngine.name = nameContainer.value;
		currentEngine.hasBeenChanged = true;
	}

	function onIPChange() {
		currentEngine.address = ipAddressContainer.value;
		currentEngine.hasBeenChanged = true;
	}

	function onStartPortChange() {
		currentEngine.portRangeStart = Number(startPortContainer.value);
		currentEngine.hasBeenChanged = true;
	}

	function onEndPortChange() {
		currentEngine.portRangeEnd = Number(endPortContainer.value);
		currentEngine.hasBeenChanged = true;
	}

	function closeModal() {
		modalContainer.closeModal();
	}
</script>

<Modal bind:this={modalContainer}>
	<div class="delete-dialog">
		<div class="inner-delete-dialog">
			<h4 id="delete-text">
				{#if currentEngine.name !== ""}					
				Are you sure you wish to delete the engine:
				{currentEngine.name}
				{:else}
				Are you sure you wish to delete this engine?
				{/if}
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
	<div id="name-box" class="box">
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
	</div>
	<div class="box">
		IP Address:
		<input
			type="text"
			placeholder="192.168.1.1"
			id="IP"
			on:change={onIPChange}
			bind:this={ipAddressContainer}
		/> 
	</div>
	<div id="port-range-box" class="box">
		Port range:
		<input
			type="number"
			placeholder="7000"
			id="STARTPORT"
			class="port-input"
			min="0"
			max="65535"
			on:change={onStartPortChange}
			bind:this={startPortContainer}
		/>
		-
		<input
			type="number"
			placeholder="7000"
			id="ENDPORT"
			class="port-input"
			min="0"
			max="65535"
			on:change={onEndPortChange}
			bind:this={endPortContainer}
		/> 
	</div>
</form>

<style>
	form {
		background-color: var(--console-selectedtab-color);
		padding: 0.2em;
		color: var(--engine-ui-text-color);
	}

	.delete-button {
		border: 0;
		padding: 0 0.1em 0 2em;
		background-color: transparent;
		cursor: pointer;
		color: var(--engine-ui-text-color);
	}

	.delete-dialog {
		padding: 0.6em;
	}

	.inner-delete-dialog {
		padding: 0.2em;
		background-color: var(--console-selectedtab-color);
	}

	#name {
		width: 90%;
		padding: 0.4em 0.4em 0.2em 0.4em;
	}

	#IP {
		width: 70%;
		padding: 0.4em 0.4em 0.2em 0.4em;
	}

	.port-input {
		width: 37%;
		border: none;
		border-bottom: 0.05em solid var(--engine-ui-underline-color);
		background-color: var(--console-selectedtab-color);
		color: var(--engine-ui-text-color);
		text-align: center;
		padding: 0.4em 0.4em 0.2em 0.4em;
	}

	.port-input::placeholder {
		color: var(--engine-ui-input-text-placeholder-color);
		text-align: center;
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
		border-bottom: 0.05em solid var(--engine-ui-underline-color);
		background-color: var(--console-selectedtab-color);
		color: var(--engine-ui-text-color);
		margin: 0.2em;
	}

	input[type="text"]::placeholder {
		color: var(--engine-ui-input-text-placeholder-color);
		text-align: center;
	}

	.delete-selection {
		border: 0;
		border-bottom: 0.05em solid var(--engine-ui-underline-color);
		padding: 0.2em 0.2em 0 0.2em;
		background-color: transparent;
		cursor: pointer;
		margin-left: 0.5em;
		margin-right: 0.5em;
		color: var(--engine-ui-text-color);
	}

	#delete-text {
		margin: 0.2em;
		color: var(--engine-ui-text-color);
	}

	.box {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 30em;
		padding: 0.1rem 0.4rem 0.1rem 0.4rem;
	}

	#port-range-box {
		padding-bottom: 1rem;
	}

	#name-box {
		padding-top: 0.5rem;
	}

</style>
