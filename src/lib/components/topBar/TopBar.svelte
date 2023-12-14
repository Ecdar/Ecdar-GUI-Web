<script lang="ts">
	import { onMount } from "svelte";
	import type { projectHandler as ProjectHandler } from "$lib/classes/projectHandler/ProjectHandler";
	import TopBarButton from "$lib/components/topBar/TopBarButton.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";
	import DropDownCheckBox from "$lib/components/topBar/DropDownCheckBox.svelte";
	import {
		Note_add,
		File_open,
		Save,
		Image,
		Arrow_left,
		Arrow_right,
		Arrow_drop_down,
		Arrow_drop_up,
		Window,
		Settings,
		Settings_input_composite,
		Help,
		Error,
		Zoom_in,
	} from "svelte-google-materialdesign-icons";
	import SettingsView from "$lib/components/settings/SettingsView.svelte";
	import { showSettings } from "$lib/components/settings/showSettings";
	import AboutUi from "./aboutUI/AboutUI.svelte";
	import { showAboutUI } from "$lib/components/topBar/aboutUI/showAboutUI";

	let projectHandler: typeof ProjectHandler;

	onMount(async () => {
		projectHandler = (
			await import("$lib/classes/projectHandler/ProjectHandler")
		).projectHandler;
	});
</script>

<!--
	- TopBarButton: The button on the navbar, where name equal text displayed in button
	- Button: An element in the dropdown menu as a button, where name equal to text displayed 
		in button and icon which can be empty
	- DropDownCheckBox: An element in the dropdown menu as a checkbox, where name eqaul to text displayed. 
		Has two functions on:checked and on:unchecked
		Here icon should not be set.
-->

<!--File top bar button-->
<TopBarButton name="File">
	<Button
		icon={Note_add}
		text="New Project"
		on:click={() => {
			projectHandler.openNewProject();
		}}
	/>
	<Button
		icon={File_open}
		text="Open Project"
		on:click={async () => {
			await projectHandler.openProject();
		}}
	/>
	<Button
		icon={File_open}
		text="Recent Projects"
		on:click={() => {
			console.log("Recent Projects");
		}}
	/>
	<Button
		icon={Save}
		text="Save Project"
		on:click={async () => {
			await projectHandler.quickSaveProject();
		}}
	/>
	<Button
		icon={Save}
		text="Save Project as"
		on:click={async () => {
			await projectHandler.saveProject();
		}}
	/>
	<Button
		icon={Save}
		text="Export as JSON"
		on:click={async () => {
			await projectHandler.exportProject();
		}}
	/>
	<Button
		icon={File_open}
		text="Import from JSON"
		on:click={async () => {
			await projectHandler.importProject();
		}}
	/>
	<Button
		icon={Image}
		text="Export as Png"
		on:click={() => {
			console.log("Export as Png");
		}}
	/>
	<Button
		icon={Image}
		text="Export without border as Png"
		on:click={() => {
			console.log("Export without border as Png");
		}}
	/>
</TopBarButton>

<!--Edit top bar button-->
<TopBarButton name="Edit">
	<Button
		icon={Arrow_left}
		text="Move All Nodes Left"
		on:click={() => {
			console.log("Move All Nodes Left");
		}}
	/>
	<Button
		icon={Arrow_right}
		text="Move All Nodes Right"
		on:click={() => {
			console.log("Move All Nodes Right");
		}}
	/>
	<Button
		icon={Arrow_drop_up}
		text="Move All Nodes Up"
		on:click={() => {
			console.log("Move All Nodes Up");
		}}
	/>
	<Button
		icon={Arrow_drop_down}
		text="Move All Nodes Down"
		on:click={() => {
			console.log("Move All Nodes Down");
		}}
	/>
</TopBarButton>

<!--View top bar button-->
<TopBarButton name="View">
	<DropDownCheckBox
		text="Project Panel"
		on:checked={() => {
			console.log("checked Project Panel");
		}}
		on:unchecked={() => {
			console.log("unchecked Project Panel");
		}}
	/>
	<DropDownCheckBox
		text="Query Panel"
		on:checked={() => {
			console.log("checked Query Panel");
		}}
		on:unchecked={() => {
			console.log("unchecked Query Panel");
		}}
	/>
	<DropDownCheckBox
		text="Autoscaling"
		on:checked={() => {
			console.log("checked Autoscaling");
		}}
		on:unchecked={() => {
			console.log("unchecked Autoscaling");
		}}
	/>
	<Button
		icon={Zoom_in}
		text="Scaling"
		on:click={() => {
			console.log("Scaling");
		}}
	/>
	<Button
		icon={Window}
		text="Split canvas"
		on:click={() => {
			console.log("Split canvas");
		}}
	/>
</TopBarButton>

<!--Options top bar button-->
<TopBarButton name="Options">
	<DropDownCheckBox
		text="UI cache"
		on:checked={() => {
			console.log("checked UI cache");
		}}
		on:unchecked={() => {
			console.log("unchecked UI cache");
		}}
	/>
	<DropDownCheckBox
		text="Periodic query execution"
		on:checked={() => {
			console.log("checked Periodic query execution");
		}}
		on:unchecked={() => {
			console.log("unchecked Periodic query execution");
		}}
	/>
	<Button
		icon={Settings_input_composite}
		text="Engine Options"
		on:click={() => {
			console.log("Engine options");
		}}
	/>
	<Button
		icon={Settings}
		text="Settings"
		on:click={() => {
			$showSettings = true;
		}}
	/>
</TopBarButton>

<!--Help top bar button-->
<TopBarButton name="Help">
	<Button
		icon={Help}
		text="Modelling Help"
		on:click={() => {
			console.log("Modelling Help");
		}}
	/>
	<Button
		icon={Error}
		text="About"
		on:click={() => {
			$showAboutUI = true;
		}}
	/>
</TopBarButton>

<!-- Add modal component here -->
<SettingsView />
<AboutUi />
