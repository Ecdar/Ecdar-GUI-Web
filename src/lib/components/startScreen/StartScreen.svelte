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
			<div class="bottom-border">
				<SvgButton
					click={startNewProject}
					icon={Add}
					id={`new-project`}
					color="var(--sidebar-text-color)"
					justifyContend="center"
					><p style="font-size: 1.7em">
						New Blank Project
					</p></SvgButton
				>
			</div>

			<h2>Example projects</h2>
			<SvgButton
				click={openProject}
				icon={File_open}
				id={`open-project`}
				color="var(--sidebar-text-color)"
				justifyContend="center"><p>ecdar univeristy</p></SvgButton
			>
		</div>
		<div class="flex-column">
			<div class="bottom-border">
				<SvgButton
					click={openProject}
					icon={File_open}
					id={`open-project`}
					color="var(--sidebar-text-color)"
					justifyContend="center"
					><p style="font-size: 1.7em">Open A Project</p></SvgButton
				>
			</div>

			<h2>Recent Projects</h2>
			<SvgButton
				click={openProject}
				icon={File_open}
				id={`open-project`}
				color="var(--sidebar-text-color)"
				justifyContend="center"><p>recent 1</p></SvgButton
			>
		</div>
	</div>
</div>

<style>
	h1 {
		color: var(--navigationbar-text-color);
	}

	h2 {
		color: var(--navigationbar-text-color);
		text-align: center;
	}

	.bottom-border {
		border-bottom: 1px solid var(--navigationbar-text-color);
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		width: 50%;
		margin: 5%;
	}
</style>
