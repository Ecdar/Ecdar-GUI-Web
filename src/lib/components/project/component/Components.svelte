<script lang="ts">
	import Component from "$lib/components/project/component/Component.svelte";

	const components = [
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

{#each components as component}
	<Component {...component} />
{/each}
