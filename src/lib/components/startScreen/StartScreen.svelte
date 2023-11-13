<script lang="ts">
	import { project } from "$lib/globalState/activeProject";
	import { Project } from "$lib/classes/automaton/Project";

	function startNewProject() {
		const id = $projects.ids.getNewOrderedId();
		$project = new Project(id);
	}
</script>

<div>
	<h1>Welcome to Ecdar</h1>
	<button id="start-new-project" on:click={startNewProject}
		>Start a new project</button
	>
</div>
