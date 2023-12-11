<script lang="ts">
	import type IModalComponent from "$lib/interfaces/IModalComponent";
	import EngineUi from "../engineUI/EngineUI.svelte";
	import SettingsView from "../settings/SettingsView.svelte";
	import AboutUi from "../topBar/aboutUI/AboutUI.svelte";
	import { popup, Popup } from "./state";

	let engine: EngineUi & IModalComponent;
	let about: AboutUi & IModalComponent;
	let settings: SettingsView & IModalComponent;

	popup.subscribe((window) => {
		switch (window) {
			case Popup.None:
				return;
			case Popup.About:
				about.showModal();
				break;
			case Popup.Settings:
				settings.showModal();
				break;
			case Popup.Engine:
				engine.showModal();
				break;
		}

		popup.set(Popup.None);
	});
</script>

<EngineUi bind:this={engine} />
<AboutUi bind:this={about} />
<SettingsView bind:this={settings} />
