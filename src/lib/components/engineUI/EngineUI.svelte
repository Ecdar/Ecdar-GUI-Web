<script lang="ts">
	import type { EngineDTO } from "./EngineDTO";
	import EngineStorage from "$lib/classes/engine/EngineStorage";
	import Modal from "../modal/Modal.svelte";
	import EnginePanel from "./EnginePanel.svelte";
	import { Save, Add, Close, Done } from "svelte-google-materialdesign-icons";
	import type IEngineSeperateComponent from "$lib/interfaces/IEngineSeperateComponent";
	import SvgButton from "../buttons/SvgButton.svelte";
	import { writable, type Writable } from "svelte/store";
	import type EngineSeperate from "./EngineSeperate.svelte";
	import { showEngineUI } from "./showEngineUI";
	import { engineStore } from "$lib/globalState/engines";

	let showUnsavedChanges = false;
	$: if (!$showEngineUI && checkIfChanged()) {
		showUnsavedChanges = false;
	}

	/**
	 * Close the unsaved changes modal
	 */
	let showIncorrectInformation = false;

	let tempEngines: Writable<Array<EngineDTO>> = writable<Array<EngineDTO>>(
		[],
	);

	let engineSeperateArray: Array<
		(EngineSeperate & IEngineSeperateComponent) | undefined
	> = [];

	//Always have at least one component!
	$: if (
		$tempEngines.filter((engine) => {
			return engine.address != "-1"; //not marked for deletion
		}).length == 0
	) {
		addNewEngine();
		$tempEngines[0].hasBeenChanged = false; //dont mark empty engine as change
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

	function forceCloseDialogContainer() {
		showUnsavedChanges = false;
		showIncorrectInformation = false;
		$showEngineUI = false;
	}
	/**
	 * onSubmit place all the temporary engines into EngineStorage, and delete the engines which have been deleted
	 */
	function onSubmit() {
		try {
			//assign id's to new engines, and set change to false
			$tempEngines.forEach((engine) => {
				if (engine.id == -1 && engine.address != "-1")
					handleCreateNewEngine(engine);

				engine.hasBeenChanged = false;
			});

			//Remove engines marked for deletion
			$tempEngines = $tempEngines.filter((engine) => {
				return engine.address != "-1";
			});

			engineStore.set($tempEngines);
			forceCloseDialogContainer();
		} catch (error) {
			engineSeperateArray.forEach((engine) => {
				if (engine != undefined) engine.setUpEngineSeperate();
			});
			showIncorrectInformation = true;
		}
	}

	function onDiscard() {
		if (checkIfChanged()) {
			showUnsavedChanges = true;
		} else {
			$showEngineUI = false;
		}
	}
	/**
	 * Calls Engine constructer, which validates all input.
	 * Throws errors on validation fails
	 */
	function handleCreateNewEngine(engine: EngineDTO) {
		return EngineStorage.createEngine(
			engine.name,
			engine.address,
			engine.portRangeStart,
			engine.portRangeEnd,
			engine.useBundle,
		);
	}

	console.log($showEngineUI);
</script>

<Modal show={$showEngineUI}>
	<div id="engine-ui-outer">
		<div class="engine-panel" tabindex="-1">
			<EnginePanel {tempEngines} {engineSeperateArray} />
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
				click={onDiscard}
				color={"var(--engine-ui-text-color)"}
			/>
		</div>
	</div>
</Modal>

<Modal show={showUnsavedChanges}>
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
					click={() => {
						showUnsavedChanges = false;
					}}
					size={24}
				/>
			</div>
		</div>
	</div>
</Modal>

<Modal show={showIncorrectInformation}>
	<div class="modal-dialog" tabindex="-1">
		<div class="inner-modal-dialog" tabindex="-1">
			<h4 id="modal-text">
				The information could not be processed. Check the input and try
				again.
			</h4>
			<div class="incorrect-information-button">
				<SvgButton
					icon={Done}
					click={() => {
						showIncorrectInformation = false;
					}}
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
