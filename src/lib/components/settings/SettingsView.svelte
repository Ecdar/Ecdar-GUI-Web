<script lang="ts">
	import Tabs from "$lib/components/tabs/Tabs.svelte";
	import type { Tab } from "$lib/components/tabs/Tab";
	import ColorSettings from "$lib/components/settings/ColorSettings.svelte";
	import FontSettings from "$lib/components/settings/FontSettings.svelte";
	import Modal from "../modal/Modal.svelte";
	import { showSettings } from "../settings/showSettings";

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

<Modal show={showSettings}>
	<div id="setting-tabs-container">
		<Tabs tabs={settingTabs} />
	</div>

	<button
		on:click={() => {
			$showSettings = false;
		}}
	>
		<p>Close Settings</p>
	</button>
</Modal>

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
