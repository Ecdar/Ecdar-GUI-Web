<script lang="ts">
	import Modal from "../dialogPopover/Modal.svelte";
	import type { EngineDTO } from "./EngineDTO";
	import {
		Delete,
		Close,
		Done,
		Check_box,
		Check_box_outline_blank,
	} from "svelte-google-materialdesign-icons";
	import type iModalComponent from "$lib/interfaces/IModalComponent";
	import Button from "../overlayMenu/elements/Button.svelte";
	import {
		comparePortRange,
		validateEndPort,
		validateIP,
		validateName,
		validateStartPort,
	} from "$lib/classes/engine/Validation";

	let formElement: HTMLFormElement;
	let modalContainer: Modal & iModalComponent;
	let nameContainer: HTMLInputElement;
	let ipAddressContainer: HTMLInputElement;
	let startPortContainer: HTMLInputElement;
	let endPortContainer: HTMLInputElement;

	let nameBorderColour: string = "var(--engine-ui-underline-color)";
	let ipBorderColour: string = "var(--engine-ui-underline-color)";
	let portColour: string = "var(--engine-ui-underline-color)";

	let engineUIErrorUnderlineColour: string =
		"var(--engine-ui-error-underline-color)";
	let engineUIUnderlineColour: string = "var(--engine-ui-underline-color)";

	export let currentEngine: EngineDTO;
	export let tempEngines: Array<EngineDTO>;

	export let hasBeenDeleted: boolean = false;

	export const setUpEngineSeperate = () => {
		changeNameBorder();
		changeIpBorder();
		validatePort();
	};

	/**
	 * Delete an engine by setting the adress of the engine to -1 and removing it from the view
	 */
	function deleteEngine() {
		currentEngine.address = "-1";
		hasBeenDeleted = true;
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
		changeNameBorder();
	}

	function changeNameBorder() {
		if (!validateName(nameContainer.value)) {
			nameBorderColour = engineUIErrorUnderlineColour;
		} else {
			nameBorderColour = engineUIUnderlineColour;
		}
	}

	function onIPChange() {
		currentEngine.address = ipAddressContainer.value;
		currentEngine.hasBeenChanged = true;
		changeIpBorder();
	}

	function changeIpBorder() {
		if (currentEngine.useBundle) {
			ipBorderColour = "grey";
			return;
		}
		if (!validateIP(ipAddressContainer.value)) {
			ipBorderColour = engineUIErrorUnderlineColour;
		} else {
			ipBorderColour = engineUIUnderlineColour;
		}
	}

	function onStartPortChange() {
		currentEngine.portRangeStart = Number(startPortContainer.value);
		currentEngine.hasBeenChanged = true;
		validatePort();
	}

	function onEndPortChange() {
		currentEngine.portRangeEnd = Number(endPortContainer.value);
		currentEngine.hasBeenChanged = true;
		validatePort();
	}

	function validatePort() {
		if (startPortContainer.value == "" || endPortContainer.value == "") {
			portColour = engineUIErrorUnderlineColour;
			return;
		}
		if (
			!validateStartPort(Number(startPortContainer.value)) ||
			!validateEndPort(Number(endPortContainer.value)) ||
			!comparePortRange(
				Number(startPortContainer.value),
				Number(endPortContainer.value),
			)
		) {
			portColour = engineUIErrorUnderlineColour;
		} else {
			portColour = engineUIUnderlineColour;
		}
	}

	function closeModal() {
		modalContainer.closeModal();
	}

	function toggleUseBundle(event: MouseEvent) {
		event.stopPropagation();
		currentEngine.useBundle = !currentEngine.useBundle;
		changeIpBorder();
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
			value={currentEngine.name}
			on:change={onNameChange}
			bind:this={nameContainer}
			style="--borderColour: {nameBorderColour}"
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
			value={currentEngine.address != "-1" ? currentEngine.address : ""}
			on:change={onIPChange}
			bind:this={ipAddressContainer}
			style="--borderColour: {ipBorderColour}; color: {currentEngine.useBundle
				? 'grey'
				: 'var(--engine-ui-text-color)'}"
			readonly={currentEngine.useBundle}
		/>
		<div id="local-button" class="unselectable">
			{#if currentEngine.useBundle}
				<Button
					icon={Check_box}
					text="Use Bundle"
					click={toggleUseBundle}
					backgroundColor={"var(--engine-ui-button-color)"}
					buttonColor={"var(--engine-ui-text-color)"}
				/>
			{:else}
				<Button
					icon={Check_box_outline_blank}
					text="Use Bundle"
					click={toggleUseBundle}
					backgroundColor={"var(--engine-ui-button-color)"}
					buttonColor={"var(--engine-ui-text-color)"}
				/>
			{/if}
		</div>
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
			value={currentEngine.portRangeStart != -1
				? currentEngine.portRangeStart
				: ""}
			on:change={onStartPortChange}
			bind:this={startPortContainer}
			style="--borderColour: {portColour}"
		/>
		-
		<input
			type="number"
			placeholder="7000"
			id="ENDPORT"
			class="port-input"
			min="0"
			max="65535"
			value={currentEngine.portRangeEnd != -1
				? currentEngine.portRangeEnd
				: ""}
			on:change={onEndPortChange}
			bind:this={endPortContainer}
			style="--borderColour: {portColour}"
		/>
	</div>
</form>

<style>
	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	form {
		background-color: var(--engine-ui-background-color);
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
		background-color: var(--engine-ui-background-color);
	}

	#name {
		width: 90%;
		padding: 0.4em 0.4em 0.2em 0.4em;
		border-bottom: 0.05em solid var(--borderColour);
	}

	#IP {
		width: 55%;
		padding: 0.4em 0.4em 0.2em 0.4em;
		border-bottom: 0.05em solid var(--borderColour);
	}

	.port-input {
		width: 37%;
		border: none;
		border-bottom: 0.05em solid var(--borderColour);
		background-color: var(--engine-ui-background-color);
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
		background-color: var(--engine-ui-background-color);
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
		width: 32em;
		padding: 0.1rem 0.4rem 0.1rem 0.4rem;
	}

	#port-range-box {
		padding-bottom: 1rem;
	}

	#name-box {
		padding-top: 0.5rem;
	}

	#local-button {
		width: 25%;
	}
</style>
