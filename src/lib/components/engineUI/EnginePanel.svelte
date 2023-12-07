<script lang="ts">
	import EngineSeperate from "./EngineSeperate.svelte";
	import type { EngineDTO } from "./EngineDTO";

	export let tempEngines: Array<EngineDTO>;
	export let engineSeperateArray: Array<EngineSeperate | undefined>;
</script>

<h2>Engines</h2>
<div class="engines">
	{#each tempEngines as engine, index}
		<EngineSeperate
			currentEngine={engine}
			{tempEngines}
			bind:this={engineSeperateArray[index]}
		/>
		<hr />
	{/each}
</div>

<style>
	hr {
		display: none;
		padding: 0;
		color: 0 0 0 0;
	}

	h2 {
		margin-bottom: 0.3em;
		padding: 0.15em;
		background-color: var(--console-selectedtab-color);
		width: fit-content;
		text-shadow: 0.05em 0.05em 0.05em grey;
		color: var(--engine-ui-text-color);
	}

	.engines {
		max-height: 75vh;
		overflow-y: scroll;
		display: grid;
		row-gap: 1rem;
		grid-template-columns: repeat(0, 1fr);
		min-width: 16em;
	}

	.engines::-webkit-scrollbar {
		width: 1rem;
	}

	.engines::-webkit-scrollbar-track {
		box-shadow: inset 0 0 1em var(--console-unselectedtab-color);
		background: var(--console-unselectedtab-color);
	}

	.engines::-webkit-scrollbar-thumb {
		background: var(--engine-ui-scrollbar-thumb-background-color);
		border-radius: 4em;
		border: 0.3em solid var(--engine-ui-scrollbar-thumb-color);
		border-top: 0;
		border-bottom: 0;
	}

	.engines::-webkit-scrollbar-thumb:hover {
		background: var(--engine-ui-scrollbar-thumb-color);
	}
</style>
