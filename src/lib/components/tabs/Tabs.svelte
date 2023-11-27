<script lang="ts">
	import type { Tab } from "$lib/components/tabs/Tab";

	export let tabs: Tab[] = [];
	export let activeTab = 0;
</script>

{#each tabs as tab, index}
	<button on:click={() => (activeTab = index)}>{tab.label}</button>
{/each}

<br />
<hr />

<svelte:component this={tabs[activeTab].component} />
