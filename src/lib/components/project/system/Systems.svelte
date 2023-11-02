<script lang="ts">
	import System from "$lib/components/project/system/System.svelte";

	const systems = [
		{
			name: "Custom Name 1",
			color: "red",
		},
		{
			name: "Custom Name 2",
			color: "green",
		},
		{
			color: "skyblue",
		},
		{
			name: "Custom Name 3",
		},
		{},
	];
</script>

{#each systems as system}
	<System {...system} />
{/each}
