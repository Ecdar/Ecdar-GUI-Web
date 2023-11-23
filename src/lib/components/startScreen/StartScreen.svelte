<script lang="ts">
	import { Project } from "$lib/classes/project/Project";
	import { project } from "$lib/globalState/activeProject";
	import SvgButton from "../buttons/SvgButton.svelte";

	function startNewProject() {
		$project = new Project();
	}

	function openProject() {
		// Add your logic to open a project here
	}
</script>

<div
	style="display: flex; width: 100%; height: 100vh; justify-content: center;"
>
	<div
		style="display: flex; flex-direction: column; width: 50%;  background-color: red;"
	>
		<h1>Welcome to Ecdar</h1>
		<SvgButton
			click={startNewProject}
			icon={More_vert}
			id={`button`}
			color="var(--sidebar-text-color)"
		/>
	</div>
	<div
		style="display: flex; flex-direction: column; width: 50%; background-color: blue;"
	>
		<button id="open-project" on:click={openProject}>Open a project</button>
	</div>
</div>

<style>
</style>
