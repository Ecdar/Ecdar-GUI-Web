<script lang="ts">
	import Tabs from "$lib/components/tabs/Tabs.svelte";
	import type { Tab } from "$lib/components/tabs/Tab";
	import ColorSettings from "$lib/components/settings/ColorSettings.svelte";
	import FontSettings from "$lib/components/settings/FontSettings.svelte";

	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function onCloseSettings() {
		dispatch("toggleSettings");
	}

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

<Tabs tabs={settingTabs} />

<button type="button" on:click={onCloseSettings}>
	<p>Close Settings</p>
</button>
