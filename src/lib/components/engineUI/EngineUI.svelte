<script lang="ts">
	import type { EngineDTO } from "./EngineDTO";
	import EngineStorage from "$lib/classes/engine/EngineStorage";
	import Modal from "../modal/Modal.svelte";
	import EnginePanel from "./EnginePanel.svelte";
	import { Save, Add, Close, Done } from "svelte-google-materialdesign-icons";
	import type IModalComponent from "$lib/interfaces/IModalComponent";
	import type EngineSeperate from "./EngineSeperate.svelte";
	import type IEngineSeperateComponent from "$lib/interfaces/IEngineSeperateComponent";
	import SvgButton from "../buttons/SvgButton.svelte";
	import { get } from "svelte/store";
	import { tempEngines } from "$lib/globalState/tempEngines";
	let dialogContainer!: Modal & IModalComponent;
	let unsavedChangesModal: Modal & IModalComponent;
	let incorrectInformationModal: Modal & IModalComponent;

	let engineSeperateArray: Array<
		(EngineSeperate & IEngineSeperateComponent) | undefined
	> = [];

	/**
	 * Reset the engineUI view and show the engineUI
	 */
	export function showEngineUI() {
		$tempEngines = [];
		EngineStorage.getEngineArray().forEach((engine) => {
			let tempEngine: EngineDTO = {
				address: engine.address,
				name: engine.name,
				portRangeEnd: engine.portRangeEnd,
				portRangeStart: engine.portRangeStart,
				id: engine.id,
				hasBeenChanged: false,
				useBundle: engine.useBundle,
			};

			tempEngines.update((items) => [...items, tempEngine]);
		});

		if (get(tempEngines).length == 0) {
			addNewEngine();
			$tempEngines[0].hasBeenChanged = false; //dont mark empty engine as change
		}
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
			id: -1,
			hasBeenChanged: true,
			useBundle: false,
		};

		tempEngines.update((items) => [...items, newEngine]);
	}

	/**
	 * Check if any of the engines have been changed
	 * @returns true if any of the engines have been changed
	 */
	function checkIfChanged() {
		return $tempEngines.find((engine) => {
			return engine.hasBeenChanged;
		});
	}

	/**
	 * onSubmit place all the temporary engines into EngineStorage, and delete the engines which have been deleted
	 */
	function onSubmit() {
		try {
			$tempEngines.forEach((engine) => {
				if (engine.id == -1) {
					if (engine.address == "-1") return;
					handleCreateNewEngine(engine);
				} else {
					if (engine.address == "-1") {
						EngineStorage.deleteEngine(engine.id);
						return;
					}
					let storedEngine = EngineStorage.getEngine(engine.id);

					storedEngine.useBundle = engine.useBundle;
					if (!storedEngine.useBundle)
						storedEngine.address = engine.address;
					storedEngine.name = engine.name;
					storedEngine.portRangeStart = engine.portRangeStart;
					storedEngine.portRangeEnd = engine.portRangeEnd;
					storedEngine.hasBeenChanged = false;
				}
			});
			forceCloseDialogContainer();
		} catch (error) {
			engineSeperateArray.forEach((engine) => {
				if (engine != undefined) engine.setUpEngineSeperate();
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
			engine.useBundle,
		);
	}

	/**
	 * Close the modal, but check if there are any unsaved changes
	 */
	function closeModal() {
		if (checkIfChanged()) {
			unsavedChangesModal.showModal();
			return;
		}
		dialogContainer.closeModal();
	}

	/**
	 * Forcefully close the modal
	 */
	function forceCloseDialogContainer() {
		closeUnsavedChangesModal();
		dialogContainer.closeModal();
	}

	/**
	 * Close the unsaved changes modal
	 */
	function closeUnsavedChangesModal() {
		unsavedChangesModal.closeModal();
	}

	function closeIncorrectModal() {
		incorrectInformationModal.closeModal();
	}
</script>

<Modal bind:this={dialogContainer}>
	<div id="engine-ui-outer">
		<div class="engine-panel" tabindex="-1">
			<EnginePanel {engineSeperateArray} />
		</div>
		<div id="button-box" tabindex="-1">
			<SvgButton
				id={"save-button"}
				icon={Save}
				size={24}
				click={onSubmit}
				color={"var(--engine-ui-text-color)"}
			/>
			<SvgButton
				id={"add-button"}
				icon={Add}
				size={24}
				click={addNewEngine}
				color={"var(--engine-ui-text-color)"}
			/>
			<SvgButton
				id={"close-button"}
				icon={Close}
				size={24}
				click={closeModal}
				color={"var(--engine-ui-text-color)"}
			/>
		</div>
	</div>
</Modal>

<Modal bind:this={unsavedChangesModal}>
	<div class="modal-dialog">
		<div class="inner-modal-dialog">
			<h4 id="modal-text">
				You have unsaved changes. Are you sure you wish to close the
				Engine tab? Your changes may not be saved.
			</h4>
			<div class="close-buttons">
				<SvgButton
					icon={Done}
					id="close-unsaved-changes-modal"
					click={forceCloseDialogContainer}
					size={24}
				/>
				<SvgButton
					icon={Close}
					id="close-unsaved-changes-modal"
					click={closeUnsavedChangesModal}
					size={24}
				/>
			</div>
		</div>
	</div>
</Modal>

<Modal bind:this={incorrectInformationModal}>
	<div class="modal-dialog" tabindex="-1">
		<div class="inner-modal-dialog" tabindex="-1">
			<h4 id="modal-text">
				The information could not be processed. Check the input and try
				again.
			</h4>
			<div class="incorrect-information-button">
				<SvgButton
					icon={Done}
					click={closeIncorrectModal}
					id="close-incorrect-information-modal"
					size={24}
				/>
			</div>
		</div>
	</div>
</Modal>

<style>
	#engine-ui-outer {
		padding: 0.5rem 0rem 0.5rem 1rem;
	}

	#button-box {
		display: flex;
		width: 100%;
		height: 3em;
		justify-content: space-evenly;
		padding-right: 1rem;
	}

	:global(#button-box button) {
		border: 0;
		cursor: pointer;
	}

	.engine-panel {
		padding-bottom: 0.2rem;
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

	.close-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.incorrect-information-button {
		display: flex;
		justify-content: center;
	}
</style>
