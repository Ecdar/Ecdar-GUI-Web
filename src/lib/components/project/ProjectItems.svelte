<script lang="ts">
	import ProjectItem from "./ProjectItem.svelte";
	import {
		activeView,
		systems,
		components,
	} from "$lib/globalState/activeProject";
</script>

{#if $components}
	{#each $components as component}
		<ProjectItem
			id={component.id}
			bind:description={component.description}
			bind:color={component.color}
			bind:includeInPeriodicCheck={component.includeInPeriodicCheck}
			itemType="component"
			setAsActive={() => {
				if (!$components) return;
				$activeView = component;
			}}
			rename={() => {
				if (!$components) return;

				const newId = prompt("New name:", component.id.rawId);
				if (!newId) return;

				//TODO: tell the user if the rename fails (the function returns false)
				component.id.rename(newId, $components.ids);
				$components = $components;
			}}
		/>
	{/each}
{/if}
{#if $systems}
	{#each $systems as system}
		<ProjectItem
			id={system.id}
			bind:description={system.description}
			bind:color={system.color}
			itemType="system"
			setAsActive={() => {
				if (!$systems) return;
				$activeView = system;
			}}
			rename={() => {
				if (!$systems) return;

				const newId = prompt("New name:", system.id.rawId);
				if (!newId) return;

				//TODO: tell the user if the rename fails (the function returns false)
				system.id.rename(newId, $systems.ids);
				$systems = $systems;
			}}
		/>
	{/each}
{/if}
