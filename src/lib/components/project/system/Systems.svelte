<script lang="ts">
	import System from "$lib/components/project/system/System.svelte";
	import { systems } from "$lib/globalState/activeProject";
</script>

{#each $systems || [] as system, index}
	<System bind:system {index} />
{/each}
