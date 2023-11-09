<script lang="ts">
	import Component from "$lib/components/project/component/Component.svelte";

	const components = [
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

{#each components as component}
	<Component {...component} />
{/each}
