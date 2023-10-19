<script lang="ts">
	import System from "$lib/components/system/System.svelte";

	const systems = [
		{
			name: "ost",
			color: "red",
		},
		{
			name: "horsens",
			color: "green",
		},
		{
			color: "skyblue",
		},
		{
			name: "horsens",
		},
		{},
	];
</script>

{#each systems as system}
	<System {...system} />
{/each}
