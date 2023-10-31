<script lang="ts">
	import Dialog from "../dialogPopover/Dialog.svelte";
	import EngineSeperate from "./EngineSeperate.svelte";

	let dialogContainer: Dialog;
	let engines: Array<EngineSeperate> = [];
	let engineData: any = {
		name: "",
		IP: "",
	};

	export function showEngineUI() {
		dialogContainer.showModal();
	}

	function addNewEngine() {
		engines.push(new EngineSeperate(engineData));
	}
</script>

<button on:click={showEngineUI}> Show</button>
<Dialog bind:this={dialogContainer}>
	{#each engines as engine}
		<EngineSeperate/>
	{/each}
	<button on:click={addNewEngine}>Add new engine</button>
	<button>Save</button>
</Dialog>

<style>
</style>
