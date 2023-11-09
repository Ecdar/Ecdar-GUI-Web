<script lang="ts">
	import ProjectItem from "./ProjectItem.svelte";
	import { systems, components } from "$lib/globalState/activeProject";
</script>

{#each $components || [] as component, index}
	<ProjectItem
		bind:name={component.name}
		bind:description={component.description}
		bind:color={component.color}
		bind:includeInPeriodicCheck={component.includeInPeriodicCheck}
		itemType="component"
		{index}
	/>
{/each}
{#each $systems || [] as system, index}
	<ProjectItem
		bind:name={system.name}
		bind:description={system.description}
		bind:color={system.color}
		itemType="system"
		{index}
	/>
{/each}
