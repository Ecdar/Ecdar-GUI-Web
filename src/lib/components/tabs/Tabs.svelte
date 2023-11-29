<script lang="ts">
	import type { Tab } from "$lib/components/tabs/Tab";

	export let tabs: Tab[] = [];
	export let activeTab = 0;
</script>

<div>
	{#each tabs as tab, index}
		<button
			class:active={activeTab === index}
			on:click={() => (activeTab = index)}>{tab.label}</button
		>
	{/each}
</div>

<hr />

<svelte:component this={tabs[activeTab].component} />

<style>
	button {
		background-color: var(--console-unselectedtab-color);
		color: var(--navigationbar-text-color);
		border: none;
		padding: 0.5em 1em;
		transition: background-color 200ms;
	}

	button:hover {
		background-color: var(--console-tab-hover-color);
	}

	hr {
		margin: 0;
		height: 0.2em;
		border: none;
		background-color: black;
	}

	div {
		background-color: var(--console-topbar-background-color);
	}

	.active {
		background-color: var(--console-selectedtab-color);
	}
</style>
