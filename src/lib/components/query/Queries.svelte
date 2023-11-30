<script lang="ts">
	import Query from "$lib/components/query/Query.svelte";
	import { queries } from "$lib/globalState/activeProject";

	function getType(query: string): string {
		return query.split(":")[0];
	}

	function getName(query: string): string {
		return query.split(":")[1];
	}
</script>

{#each $queries || [] as query, index}
	<Query
		bind:query={query.query}
		type={getType(query.query)}
		name={getName(query.query)}
		bind:comment={query.comment}
		bind:isPeriodic={query.isPeriodic}
		{index}
	/>
{/each}
