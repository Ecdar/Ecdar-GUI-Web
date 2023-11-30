<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Tabs from "$lib/components/tabs/Tabs.svelte";
	import type { Tab } from "$lib/components/tabs/Tab";
	import ColorSettings from "$lib/components/settings/ColorSettings.svelte";
	import FontSettings from "$lib/components/settings/FontSettings.svelte";

	const dispatch = createEventDispatcher();

	const settingTabs: Tab[] = [
		{
			label: "Color",
			component: ColorSettings,
		},
		{
			label: "Font",
			component: FontSettings,
		},
	];
</script>

<div id="setting-tabs-container">
	<Tabs tabs={settingTabs} />
</div>

<button
	on:click={() => {
		dispatch("toggleSettings");
	}}
>
	<p>Close Settings</p>
</button>

<style>
	button {
		background-color: var(--console-topbar-background-color);
		color: var(--navigationbar-text-color);
		border: none;
		padding: 0.5em 1em;
		height: 2.5em;
		transition: var(--settings-background-color-transition);
	}

	button:hover {
		background-color: var(--console-selectedtab-color);
	}

	p {
		margin: 0;
	}
</style>
