<script lang="ts">
	import type { EngineDTO } from "./EngineDTO";
	import EngineStorage from "$lib/classes/engine/EngineStorage";
	import Modal from "../dialogPopover/Modal.svelte";
	import EnginePanel from "./EnginePanel.svelte";
	import { Save, Add, Close, Done } from "svelte-google-materialdesign-icons";
	import type IModalComponent from "$lib/interfaces/IModalComponent";
	import type EngineSeperate from "./EngineSeperate.svelte";
	import type IEngineSeperateComponent from "$lib/interfaces/IEngineSeperateComponent";
	let dialogContainer!: Modal & IModalComponent;
	let tempEngines: EngineDTO[] = [];
	let unsavedChangesModal: Modal & IModalComponent;
	let incorrectInformationModal: Modal & IModalComponent;

	let engineSeperateArray: Array<EngineSeperate & IEngineSeperateComponent> =
		[];

	/**
	 * Reset the engineUI view and show the engineUI
	 */
	export function showEngineUI() {
		tempEngines = [];
		EngineStorage.getEngineArray().forEach((engine) => {
			let tempEngine: EngineDTO = {
				address: engine.address,
				name: engine.name,
				portRangeEnd: engine.portRangeEnd,
				portRangeStart: engine.portRangeStart,
				type: engine.type,
				id: engine.id,
				hasBeenChanged: false,
				useBundle: engine.useBundle,
			};

			tempEngines.push(tempEngine);
		});

		if (tempEngines.length == 0) {
			addNewEngine();
		}

		tempEngines = tempEngines;
		dialogContainer.showModal();
	}

	/**
	 * Add a new engine to the view
	 */
	function addNewEngine() {
		let newEngine: EngineDTO = {
			address: "",
			name: "",
			portRangeEnd: -1,
			portRangeStart: -1,
			type: 0,
			id: -1,
			hasBeenChanged: false,
			useBundle: false,
		};

		tempEngines.push(newEngine);
		tempEngines = tempEngines;
	}

	/**
	 * Check if any of the engines have been changed
	 * @returns true if any of the engines have been changed
	 */
	function checkIfChanged() {
		tempEngines.forEach((engine) => {
			if (engine.hasBeenChanged) {
				return true;
			}
		});
		return false;
	}

	/**
	 * onSubmit place all the temporary engines into EngineStorage, and delete the engines which have been deleted
	 */
	function onSubmit() {
		try {
			tempEngines.forEach((engine) => {
				if (engine.id == -1) {
					if (engine.address == "-1") return;
					handleCreateNewEngine(engine);
				}
				if (engine.id != -1) {
					if (engine.address == "-1") {
						EngineStorage.deleteEngine(engine.id);
						return;
					}
					let tempEngine = EngineStorage.getEngine(engine.id);

					tempEngine.useBundle = engine.useBundle;
					if (tempEngine.useBundle)
						tempEngine.address = engine.address;
					tempEngine.name = engine.name;
					tempEngine.portRangeStart = engine.portRangeStart;
					tempEngine.portRangeEnd = engine.portRangeEnd;
					tempEngine.type = engine.type;
					tempEngine.hasBeenChanged = false;
				}
			});
			tempEngines = [];
			tempEngines = tempEngines;
			forceCloseDialogContainer();
		} catch (error) {
			engineSeperateArray.forEach((engine) => {
				if (engine.hasBeenDeleted == false)
					engine.setUpEngineSeperate();
			});
			incorrectInformationModal.showModal();
		}
	}

	function handleCreateNewEngine(engine: EngineDTO) {
		EngineStorage.createEngine(
			engine.name,
			engine.address,
			engine.portRangeStart,
			engine.portRangeEnd,
			engine.type,
			engine.useBundle,
		);
	}

	/**
	 * Close the modal, but check if there are any unsaved changes
	 */
	function closeModal() {
		if (!checkIfChanged()) {
			unsavedChangesModal.showModal();
			return;
		}
		tempEngines = [];
		tempEngines = tempEngines;
		dialogContainer.closeModal();
	}

	/**
	 * Forcefully close the modal
	 */
	function forceCloseDialogContainer() {
		closeUnsavedChangesDialog();
		dialogContainer.closeModal();
	}

	/**
	 * Close the unsaved changes dialog
	 */
	function closeUnsavedChangesDialog() {
		unsavedChangesModal.closeModal();
	}
</script>

<Modal bind:this={dialogContainer}>
	<form on:submit={onSubmit}>
		<div class="engine-panel">
			<EnginePanel {tempEngines} {engineSeperateArray} />
		</div>
		<div id="button-box">
			<button on:click={onSubmit} id="save-button" class="unselectable"
				><Save size="18" /></button
			>
			<button
				on:click={addNewEngine}
				type="button"
				id="add-button"
				class="unselectable"><Add size="18" /></button
			>
			<button
				on:click={closeModal}
				type="button"
				id="close-button"
				class="unselectable"><Close size="18" /></button
			>
		</div>
	</form>
</Modal>

<Modal bind:this={unsavedChangesModal}>
	<div class="modal-dialog">
		<div class="inner-modal-dialog">
			<h4 id="modal-text">
				You have unsaved changes. Are you sure you wish to close the
				Engine tab? Your changes may not be saved.
			</h4>
			<button
				on:click={forceCloseDialogContainer}
				class="modal-selection"
			>
				<Done size="18" />
			</button>
			<button
				on:click={closeUnsavedChangesDialog}
				class="modal-selection"
			>
				<Close size="18" />
			</button>
		</div>
	</div>
</Modal>

<Modal bind:this={incorrectInformationModal}>
	<div class="modal-dialog">
		<div class="inner-modal-dialog">
			<h4 id="modal-text">
				The information could not be processed. Check the input and try
				again.
			</h4>
			<button
				on:click={incorrectInformationModal.closeModal}
				class="modal-selection"
			>
				<Done size="18" />
			</button>
		</div>
	</div>
</Modal>

<style>
	form {
		padding: 0.5rem 0rem 0.5rem 1rem;
	}

	#button-box {
		padding-top: 0.5rem;
		display: flex;
		width: 100%;
		height: 3em;
	}

	#add-button {
		border: 0;
		padding: 0.2em 0 0 0;
		background-color: transparent;
		outline: none;
		cursor: pointer;
		margin-left: auto;
		margin-bottom: auto;
	}

	#save-button {
		border: 0;
		padding: 0.2em 0 0 0;
		background-color: transparent;
		cursor: pointer;
	}

	#close-button {
		border: 0;
		padding: 0;
		background-color: transparent;
		margin-left: auto;
		padding-right: 1rem;
		padding-top: 0.2em;
		cursor: pointer;
	}

	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		color: var(--engine-ui-text-color);
	}

	.engine-panel {
		padding-bottom: 0.2rem;
	}

	.modal-selection {
		border: 0;
		border-bottom: 0.05em solid var(--engine-ui-underline-color);
		padding: 0.2em 0.2em 0 0.2em;
		background-color: transparent;
		cursor: pointer;
		margin-left: 0.5em;
		margin-right: 0.5em;
		color: var(--engine-ui-text-color);
	}

	#modal-text {
		margin: 0.2em;
		color: var(--engine-ui-text-color);
	}

	.modal-dialog {
		padding: 1em;
	}

	.inner-modal-dialog {
		padding: 0.2em;
		background-color: var(--engine-ui-background-color);
	}
</style>
