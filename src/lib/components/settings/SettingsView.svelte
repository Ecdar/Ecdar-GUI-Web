<script lang="ts">
	import Tabs from "$lib/components/tabs/Tabs.svelte";
	import type { Tab } from "$lib/components/tabs/Tab";
	import ColorSettings from "$lib/components/settings/ColorSettings.svelte";
	import FontSettings from "$lib/components/settings/FontSettings.svelte";

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
