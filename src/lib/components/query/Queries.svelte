<script lang="ts">
	import Query from "$lib/components/query/Query.svelte";
	import { queries } from "$lib/globalState/activeProject";
</script>

{#key $queries?.arr}
	{#each $queries?.arr || [] as query, index}
		<Query
			bind:query={query.query}
			bind:comment={query.comment}
			bind:isPeriodic={query.isPeriodic}
			bind:backend={query.backend}
			{index}
		/>
	{/each}
{/key}
