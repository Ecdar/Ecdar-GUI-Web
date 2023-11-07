<script lang="ts">
	import EngineSeperate from "./EngineSeperate.svelte";
	import type { EngineDTO } from "./EngineDTO";

	export let tempEngines: Array<EngineDTO>;
</script>

{#each tempEngines as engine}
	<EngineSeperate defaultChecked={2} currentEngine={engine} />
	<hr />
{/each}

<style>
	hr {
		display: none;
		padding: 0;
		color: 0 0 0 0;
	}
</style>
