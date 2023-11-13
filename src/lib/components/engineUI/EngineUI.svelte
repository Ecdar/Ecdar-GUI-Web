<script lang="ts">
	import type { EngineDTO } from "./EngineDTO";
	import EngineStorage from "$lib/classes/engine/EngineStorage";
	import Modal from "../dialogPopover/Modal.svelte";
	import EnginePanel from "./EnginePanel.svelte";
	import { Save, Add, Cancel } from "svelte-google-materialdesign-icons";
	import type iModalComponent from "$lib/interfaces/IModalComponent";

	let dialogContainer!: Modal & iModalComponent;
	let tempEngines: EngineDTO[] = [];

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
		};

		tempEngines.push(newEngine);
		tempEngines = tempEngines;
	}

	/**
	 * onSubmit place all the temporary engines into EngineStorage, and delete the engines which have been deleted
	 */
	function onSubmit() {
		tempEngines.forEach((engine) => {
			if (engine.id == -1) {
				if (
					engine.name == "" ||
					engine.address == "" ||
					engine.address == "-1" ||
					engine.portRangeStart == -1 ||
					engine.portRangeEnd == -1
				)
					return;
				EngineStorage.createEngine(
					engine.name,
					engine.address,
					engine.portRangeStart,
					engine.portRangeEnd,
					engine.type,
				);
			}
			if (engine.id != -1) {
				if (engine.address == "-1") {
					EngineStorage.deleteEngine(engine.id);
					return;
				}
				let tempEngine = EngineStorage.getEngine(engine.id);

				tempEngine.address = engine.address;
				tempEngine.name = engine.name;
				tempEngine.portRangeStart = engine.portRangeStart;
				tempEngine.portRangeEnd = engine.portRangeEnd;
				tempEngine.type = engine.type;
			}
		});
	}

	function closeModal() {
		dialogContainer.closeModal();
	}
</script>

<Modal bind:this={dialogContainer}>
	<form on:submit={onSubmit}>
		<div class="engine-panel">
			<EnginePanel {tempEngines} />
		</div>
		<button
			on:click={addNewEngine}
			type="button"
			id="add-button"
			class="unselectable"><Add size="18" /></button
		>
		<button on:click={closeModal} id="save-button" class="unselectable"
			><Save size="18" /></button
		>
		<button
			on:click={closeModal}
			type="button"
			id="cancel-button"
			class="unselectable"><Cancel size="18" /></button
		>
	</form>
</Modal>

<style>
	form {
		padding: 0.5rem 0rem 0.5rem 1rem;
	}

	#add-button {
		border: 0;
		padding: 0.2em 0 0 0;
		background-color: transparent;
		outline: none;
		cursor: pointer;
	}

	#save-button {
		border: 0;
		padding: 0.2em 0 0 0;
		background-color: transparent;
		cursor: pointer;
	}

	#cancel-button {
		border: 0;
		padding: 0;
		background-color: transparent;
		float: right;
		padding-right: 1rem;
		padding-top: 0.2em;
		cursor: pointer;
	}

	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		color: var(--console-text-color);
	}

	.engine-panel {
		padding-bottom: 0.2rem;
	}
</style>
