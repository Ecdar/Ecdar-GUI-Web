<script lang="ts">
	import EngineStorage from "$lib/classes/engine/EngineStorage";
	import Dialog from "../dialogPopover/Dialog.svelte";
	import EngineSeperate from "./EngineSeperate.svelte";

	let dialogContainer: Dialog;
	let engines: EngineStorage = new EngineStorage;
	let tempEngines: number[] = [];

	export function showEngineUI() {
		dialogContainer.showModal();
	}

	function addNewEngine() {
		tempEngines.push(1);
		tempEngines = tempEngines;
	}
</script>

<button on:click={showEngineUI}> Show</button>
<Dialog bind:this={dialogContainer}>
	{#each engines.getEngines() as engine}
		<EngineSeperate defaultChecked={2} engineStorage={engines} engineID={engine.id}/>
		<hr/>
	{/each}
	{#each tempEngines as engine}
		<EngineSeperate defaultChecked={2} engineStorage={undefined} engineID={undefined}/>
		<hr/>
	{/each}
	<button on:click={addNewEngine}>Add new engine</button>
	<form method="dialog">
		<button>Save</button>
	</form>
</Dialog>

<style>
	hr {
		display: none;
		padding: 0;
		color: 0 0 0 0;
	}
</style>
