<script lang="ts">
	import Query from "$lib/components/query/Query.svelte";

	const queries = [
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
			color: "var(--query-success-color)",
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
			color: "var(--query-error-color)",
		},
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
			color: "var(--query-success-color)",
		},
		{
			name: "Admin1",
			type: "Spec",
			server: "Reveaal",
			color: "var(--query-warning-color)",
		},
	];
</script>

{#each queries as query}
	<Query {...query} />
{/each}
