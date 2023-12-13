<script lang="ts">
	import Modal from "../modal/Modal.svelte";
	import type { EngineDTO } from "./EngineDTO";
	import {
		Delete,
		Close,
		Done,
		Check_box,
		Check_box_outline_blank,
	} from "svelte-google-materialdesign-icons";
	import type iModalComponent from "$lib/interfaces/IModalComponent";
	import {
		comparePortRange,
		validateEndPort,
		validateIP,
		validateName,
		validateStartPort,
	} from "$lib/classes/engine/Validation";
	import type EngineSeperate from "./EngineSeperate.svelte";
	import SvgButton from "../buttons/SvgButton.svelte";
	import { tempEngines } from "$lib/globalState/tempEngines";
	import { get } from "svelte/store";

	// export let currentComponent: EngineSeperate | undefined;

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
	// export let tempEngines: Array<EngineDTO>;

	export const setUpEngineSeperate = () => {
		changeNameBorder();
		changeIpBorder();
		validatePort();
	};

	/**
	 * Delete an engine by setting the adress of the engine to -1 and removing it from the view
	 * Deletion should not be permanent if the change is not saved in EngineUI
	 */
	function deleteEngine() {
		// currentEngine.address = "-1";

		const validEngines = $tempEngines.filter((engine) => {
			return engine.address != "-1";
		});

		$tempEngines.forEach((engine) => {
			if (engine == currentEngine) {
				engine.address = "-1";
				if (engine.id == -1)
					//if deleted engine is new, dont mark it as change
					engine.hasBeenChanged = false;
			}
		});

		if (validEngines.length <= 1) {
			nameContainer.value = "";
			ipAddressContainer.value = "";
			startPortContainer.value = "";
			endPortContainer.value = "";
			currentEngine.name = "";

			closeModal();
			return;
		}

		$tempEngines = $tempEngines;
		// $tempEngines.find((engine) => {return engine != currentEngine}))

		// currentComponent?.$destroy();
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
			!Number.isInteger(Number(startPortContainer.value)) ||
			!Number.isInteger(Number(endPortContainer.value)) ||
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
		currentEngine.hasBeenChanged = true;
		currentEngine.useBundle = !currentEngine.useBundle;
		if (!currentEngine.useBundle) validateIP(currentEngine.address);
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
			<div class="delete-buttons">
				<SvgButton
					icon={Done}
					click={deleteEngine}
					size={24}
					id="delete-button"
				/>
				<SvgButton
					icon={Close}
					click={closeModal}
					size={24}
					id="delete-button"
				/>
			</div>
		</div>
	</div>
</Modal>

<div id="engine-seperate-outer">
	<p id="name">Name:</p>
	<div id="name-input">
		<input
			type="text"
			placeholder="Name"
			id="name-input-text"
			value={currentEngine.name}
			on:change={onNameChange}
			bind:this={nameContainer}
			style="--border-color: {nameBorderColour}"
		/>
	</div>
	<div class="delete-button">
		<SvgButton icon={Delete} id="show-modal" size={18} click={showModal} />
	</div>
	<p id="ip">IP Address:</p>
	<div id="ip-input">
		<input
			type="url"
			placeholder="192.168.1.1"
			id="ip-input-text"
			value={currentEngine.address != "-1" ? currentEngine.address : ""}
			on:change={onIPChange}
			bind:this={ipAddressContainer}
			style="--border-color: {ipBorderColour}; color: {currentEngine.useBundle
				? 'grey'
				: 'var(--engine-ui-text-color)'}"
			disabled={currentEngine.useBundle}
		/>
	</div>
	<div id="local-button" class="unselectable" tabindex="-1">
		<!-- <SvgButton
			icon={currentEngine.useBundle ? Check_box : Check_box_outline_blank}
			click={toggleUseBundle}
			size={18}
			button={new HTMLElement().id = }
			id={"checkbox-button"}
		/> -->
		<label>
			<!--for attribute automatically works on nested element-->
			Use Bundle
			<SvgButton
				icon={currentEngine.useBundle
					? Check_box
					: Check_box_outline_blank}
				click={toggleUseBundle}
				size={18}
				id={"checkbox-button"}
			/></label
		>
	</div>
	<p id="port">Port range:</p>
	<div id="port-input">
		<input
			type="number"
			placeholder="7000"
			class="port-input"
			min="0"
			step="1"
			max="65535"
			value={currentEngine.portRangeStart != -1
				? currentEngine.portRangeStart
				: ""}
			on:change={onStartPortChange}
			bind:this={startPortContainer}
			style="--border-color: {portColour}"
		/>
		<p id="port-separator">-</p>
		<input
			type="number"
			placeholder="7000"
			class="port-input"
			min="0"
			max="65535"
			value={currentEngine.portRangeEnd != -1
				? currentEngine.portRangeEnd
				: ""}
			on:change={onEndPortChange}
			bind:this={endPortContainer}
			style="--border-color: {portColour}"
		/>
	</div>
</div>

<style>
	:global(.engine-panel #checkbox-button) {
		pointer-events: none;
	}
	label {
		display: flex;
		cursor: pointer;
		padding: 0;
		margin: 0;
		font-size: small;
	}

	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	#engine-seperate-outer {
		background-color: var(--engine-ui-background-color);
		padding: 0.2em;
		color: var(--engine-ui-text-color);
		display: grid;
		grid-template-areas: "name name-input delete" "ip ip-input local" "port port-input .";
		grid-template-columns: 1fr 3fr 1fr;
	}

	.delete-button {
		border: 0;
		background-color: transparent;
		cursor: pointer;
		color: var(--engine-ui-text-color);
		margin-left: auto;
		grid-area: delete;
	}

	.delete-dialog {
		padding: 0.6em;
	}

	.inner-delete-dialog {
		padding: 0.2em;
		background-color: var(--engine-ui-background-color);
	}

	#name {
		grid-area: name;
	}

	#name-input {
		grid-area: name-input;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	#name-input-text {
		padding: 0.4em 0.4em 0.2em 0.4em;
		border-bottom: 0.05em solid var(--border-color);
	}

	#ip {
		grid-area: ip;
	}

	#ip-input {
		grid-area: ip-input;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	#ip-input-text {
		border-bottom: 0.05em solid var(--border-color);
	}

	.port-input {
		width: 10em;
		border: none;
		border-bottom: 0.05em solid var(--border-color);
		background-color: var(--engine-ui-background-color);
		color: var(--engine-ui-text-color);
		text-align: center;
		padding: 0.4em 0.4em 0.2em 0.4em;
	}

	#port {
		grid-area: port;
	}

	#port-input {
		grid-area: port-input;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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

	input[type="url"],
	input[type="text"] {
		border: none;
		background-color: var(--engine-ui-background-color);
		color: var(--engine-ui-text-color);
		margin: 0.2em;
		text-align: center;
	}

	input[type="url"]::placeholder,
	input[type="text"]::placeholder {
		color: var(--engine-ui-input-text-placeholder-color);
		text-align: center;
	}

	#delete-text {
		margin: 0.2em;
		color: var(--engine-ui-text-color);
	}

	.delete-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	#local-button {
		grid-area: local;
		display: flex;
		flex-direction: row-reverse;
		justify-content: center;
		align-items: center;
	}

	#port-separator {
		justify-content: center;
		align-items: center;
		margin: 0 0.3em 0 0.3em;
	}
</style>
