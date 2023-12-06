<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import type { projectHandler as ProjectHandler } from "$lib/classes/projectHandler/ProjectHandler";
	import TopBarButton from "$lib/components/topBar/TopBarButton.svelte";
	import DropDownButton from "$lib/components/topBar/DropDownButton.svelte";
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
	} from "svelte-google-materialdesign-icons";

	const dispatch = createEventDispatcher();
	let projectHandler: typeof ProjectHandler;

	onMount(async () => {
		projectHandler = (
			await import("$lib/classes/projectHandler/ProjectHandler")
		).projectHandler;
	});

	let aboutVisible: boolean = false;
</script>

<!--
	- TopBarButton: The button on the navbar, where name equal text displayed in button
	- DropDownButton: An element in the dropdown menu as a button, where name equal to text displayed 
		in button and icon which can be empty
	- DropDownCheckBox: An element in the dropdown menu as a checkbox, where name eqaul to text displayed. 
		Has two functions on:checked and on:unchecked
		Here icon should not be set.
-->

<!--File top bar button-->
<div class="container">
	<TopBarButton name="File">
		<DropDownButton
			icon={Note_add}
			name="New Project"
			on:click={() => {
				projectHandler.openNewProject();
			}}
		/>
		<DropDownButton
			icon={File_open}
			name="Open Project"
			on:click={async () => {
				await projectHandler.openProject();
			}}
		/>
		<DropDownButton
			icon={File_open}
			name="Recent Projects"
			on:click={() => {
				console.log("Recent Projects");
			}}
		/>
		<DropDownButton
			icon={Save}
			name="Save Project"
			on:click={async () => {
				await projectHandler.quickSaveProject();
			}}
		/>
		<DropDownButton
			icon={Save}
			name="Save Project as"
			on:click={async () => {
				await projectHandler.saveProject();
			}}
		/>
		<DropDownButton
			icon={Save}
			name="Export as JSON"
			on:click={async () => {
				await projectHandler.exportProject();
			}}
		/>
		<DropDownButton
			icon={File_open}
			name="Import from JSON"
			on:click={async () => {
				await projectHandler.importProject();
			}}
		/>
		<DropDownButton
			icon={Image}
			name="Export as Png"
			on:click={() => {
				console.log("Export as Png");
			}}
		/>
		<DropDownButton
			icon={Image}
			name="Export without border as Png"
			on:click={() => {
				console.log("Export without border as Png");
			}}
		/>
	</TopBarButton>
</div>

<!--Edit top bar button-->
<div class="container">
	<TopBarButton name="Edit">
		<DropDownButton
			icon={Arrow_left}
			name="Move All Nodes Left"
			on:click={() => {
				console.log("Move All Nodes Left");
			}}
		/>
		<DropDownButton
			icon={Arrow_right}
			name="Move All Nodes Right"
			on:click={() => {
				console.log("Move All Nodes Right");
			}}
		/>
		<DropDownButton
			icon={Arrow_drop_up}
			name="Move All Nodes Up"
			on:click={() => {
				console.log("Move All Nodes Up");
			}}
		/>
		<DropDownButton
			icon={Arrow_drop_down}
			name="Move All Nodes Down"
			on:click={() => {
				console.log("Move All Nodes Down");
			}}
		/>
	</TopBarButton>
</div>

<!--View top bar button-->
<div class="container">
	<TopBarButton name="View">
		<DropDownCheckBox
			name="Project Panel"
			on:checked={() => {
				console.log("checked Project Panel");
			}}
			on:unchecked={() => {
				console.log("unchecked Project Panel");
			}}
		/>
		<DropDownCheckBox
			name="Query Panel"
			on:checked={() => {
				console.log("checked Query Panel");
			}}
			on:unchecked={() => {
				console.log("unchecked Query Panel");
			}}
		/>
		<DropDownCheckBox
			name="Autoscaling"
			on:checked={() => {
				console.log("checked Autoscaling");
			}}
			on:unchecked={() => {
				console.log("unchecked Autoscaling");
			}}
		/>
		<DropDownButton
			name="Scaling"
			on:click={() => {
				console.log("Scaling");
			}}
		/>
		<DropDownButton
			icon={Window}
			name="Split canvas"
			on:click={() => {
				console.log("Split canvas");
			}}
		/>
	</TopBarButton>
</div>

<!--Options top bar button-->
<div class="container">
	<TopBarButton name="Options">
		<DropDownCheckBox
			name="UI cache"
			on:checked={() => {
				console.log("checked UI cache");
			}}
			on:unchecked={() => {
				console.log("unchecked UI cache");
			}}
		/>
		<DropDownCheckBox
			name="Periodic query execution"
			on:checked={() => {
				console.log("checked Periodic query execution");
			}}
			on:unchecked={() => {
				console.log("unchecked Periodic query execution");
			}}
		/>
		<DropDownButton
			icon={Settings_input_composite}
			name="Engine Options"
			on:click={() => {
				dispatch("toggleEngineUI");
			}}
		/>
		<DropDownButton
			icon={Settings}
			name="Settings"
			on:click={() => {
				dispatch("toggleSettings");
			}}
		/>
	</TopBarButton>
</div>

<!--Help top bar button-->
<div class="container">
	<TopBarButton name="Help">
		<DropDownButton
			icon={Help}
			name="Modelling Help"
			on:click={() => {
				console.log("Modelling Help");
			}}
		/>
		<DropDownButton
			icon={Error}
			name="About"
			on:click={() => {
				aboutVisible = true;
			}}
		/>
	</TopBarButton>
</div>

{#if aboutVisible}
	<div class="pageblocker">
		<div class="aboutBox">
			<div style="position: absolute; left: 2%;">
				<h1>Ecdar v. 0.1</h1>
				Made by:<br />
				5. Semester Software, Aalborg University
				<br /><br /><br /><br />
				For more information, go to
				<a target="_blank" href="https://www.ecdar.net/"
					>www.Ecdar.net</a
				>
			</div>
			<button
				class="aboutBtn"
				on:click={() => {
					aboutVisible = false;
				}}
			>
				Close
			</button>
		</div>
	</div>
{/if}

<style>
	.pageblocker {
		z-index: 1000;
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0px;
		top: 0px;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.container {
		height: 100%;
		display: block;
		float: left;
	}

	.aboutBox {
		height: 15em;
		width: 35em;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		background-color: white;
		border: 2px solid black;
	}

	.aboutBtn {
		position: absolute;
		bottom: 2%;
		right: 2%;
	}
</style>
