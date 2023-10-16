<script lang="ts">
	import Query from "$lib/components/query/Query.svelte";

	const queries = [
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
		},
		{
			name: "Admin2",
			type: "Imp",
			comment: "I wrote this!",
			server: "Reveaal",
		},
		{
			name: "Coffee",
			type: "Con",
			comment: "",
			server: "Reveaal",
		},
	];
</script>

{#each queries as query}
	<Query {...query} />
{/each}
