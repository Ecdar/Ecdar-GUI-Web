<script lang="ts">
	import Component from "$lib/components/project/component/Component.svelte";
	import { components } from "$lib/globalState/activeProject";
</script>

{#each $components || [] as component, index}
	<Component bind:component {index} />
{/each}
