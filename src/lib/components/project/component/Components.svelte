<script lang="ts">
	import Component from "$lib/components/project/component/Component.svelte";
	import { components } from "$lib/globalState/activeProject";
</script>

{#each $components || [] as component, index}
	<Component
		bind:name={component.name}
		bind:description={component.description}
		bind:color={component.color}
		{index}
	/>
{/each}
