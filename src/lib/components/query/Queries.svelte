<script lang="ts">
	import Query from "$lib/components/query/Query.svelte";

	const queries = [
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
			color: "limegreen",
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
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
			color: "red",
		},
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
			color: "limegreen",
		},
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
			color: "yellow",
		},
	];
</script>

{#each queries as query}
	<Query {...query} />
{/each}
