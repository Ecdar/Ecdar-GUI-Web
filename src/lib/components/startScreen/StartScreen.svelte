<script lang="ts">
	import { Project } from "$lib/classes/project/Project";
	import { project } from "$lib/globalState/activeProject";
	import SvgButton from "../buttons/SvgButton.svelte";
	import { Add, File_open } from "svelte-google-materialdesign-icons";

	function startNewProject() {
		$project = new Project();
	}

	function openProject() {
		// Add your logic to open a project here
	}
</script>

<div style="display: flex; flex-direction: column; width: 100%">
	<h1 style="text-align: center;">Welcome to Ecdar</h1>
	<div
		style="display: flex; width: 100%; height: 100vh; justify-content: center;"
	>
		<div class="flex-column">
			<SvgButton
				click={startNewProject}
				icon={Add}
				id={`new-project`}
				color="var(--sidebar-text-color)"
				slotSide="left"><div>New Blank Project</div></SvgButton
			>
		</div>
		<div class="flex-column">
			<SvgButton
				click={openProject}
				icon={File_open}
				id={`open-project`}
				color="green">Open A Project</SvgButton
			>
		</div>
		test
	</div>
</div>

<style>
	h1 {
		color: var(--navigationbar-text-color);
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		width: 50%;
		margin: 5%;
	}
</style>
