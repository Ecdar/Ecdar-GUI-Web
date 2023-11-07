<script lang="ts">
	import type { EngineDTO } from "./EngineDTO";
	import EngineStorage from "$lib/classes/engine/EngineStorage";
	import Dialog from "../dialogPopover/Dialog.svelte";
	import EnginePanel from "./EnginePanel.svelte";

	let dialogContainer: Dialog;
	let engines: EngineStorage = new EngineStorage();
	let tempEngines: EngineDTO[] = [];

	export function showEngineUI() {
		tempEngines = [];
		engines.getEngineArray().forEach((engine) => {
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
		tempEngines = tempEngines;
		dialogContainer.showModal();
	}

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

	function onSubmit() {
		tempEngines.forEach((engine) => {
			if (engine.id == -1) {
				if(engine.name == "" || engine.address == "" || engine.portRangeStart == -1 || engine.portRangeEnd == -1) return;
				engines.createEngine(
					engine.name,
					engine.address,
					engine.portRangeStart,
					engine.portRangeEnd,
					engine.type,
				);
			}
			if (engine.id != -1) {
				if (engine.address == "-1") {
					engines.deleteEngine(engine.id);
					return;
				}
				let tempEngine = engines.getEngine(engine.id);

				tempEngine.address = engine.address;
				tempEngine.name = engine.name;
				tempEngine.portRangeStart = engine.portRangeStart;
				tempEngine.portRangeEnd = engine.portRangeEnd;
				tempEngine.type = engine.type;
			}
		});
	}

	function closeModal(){
		dialogContainer.closeModal();
	}
</script>

<button on:click={showEngineUI}> Show</button>
<Dialog bind:this={dialogContainer}>
	<form on:submit={onSubmit}>
		<EnginePanel {tempEngines} />
		<button on:click={addNewEngine} type="button">Add new engine</button>
		<button on:click={closeModal}>Save</button>
	</form>
</Dialog>
