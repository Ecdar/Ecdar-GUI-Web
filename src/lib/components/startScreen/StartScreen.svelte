<script lang="ts">
	import { project } from "$lib/globalState/activeProject";
	import { Project } from "$lib/classes/automaton/Project";
	import { ProjectId } from "$lib/classes/automaton/ProjectId";

	function startNewProject() {
		$project = new Project(new ProjectId("Unsaved Project"));
	}
</script>

<div>
	<h1>Welcome to Ecdar</h1>
	<button id="start-new-project" on:click={startNewProject}
		>Start a new project</button
	>
</div>

<style>
	h1 {
		color: var(--canvas-text-color);
	}
</style>
