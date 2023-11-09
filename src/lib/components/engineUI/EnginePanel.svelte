<script lang="ts">
	import EngineSeperate from "./EngineSeperate.svelte";
	import type { EngineDTO } from "./EngineDTO";

	export let tempEngines: Array<EngineDTO>;
</script>

<h2>Engines</h2>
<div class="engines">
	{#each tempEngines as engine}
		<EngineSeperate defaultChecked={2} currentEngine={engine} />
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
		background-color: rgb(159, 174, 189);
		width: fit-content;
		text-shadow: 0.05em 0.05em 0.05em grey;
	}

	.engines {
		max-height: 75vh;
		overflow-y: scroll;
		display: grid;
		row-gap: 1rem;
		grid-template-columns: repeat(0,1fr);
		min-width: 16em;
	}

	.engines::-webkit-scrollbar {
		width: 1rem;
	}

	.engines::-webkit-scrollbar-track {
		box-shadow: inset 0 0 1em slategray;
		background: lightslategray;
	}

	.engines::-webkit-scrollbar-thumb {
		background: rgb(73, 78, 84);
		border-radius: 4em;
		border: 0.3em solid slategray;
		border-top: 0;
		border-bottom: 0;
	}

	.engines::-webkit-scrollbar-thumb:hover {
		background: rgb(49, 54, 61);
	}
	
	
</style>
