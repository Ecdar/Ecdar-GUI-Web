<script lang="ts">
	import { Project } from "$lib/classes/project/Project";
	import { project } from "$lib/globalState/activeProject";

	function startNewProject() {
		$project = new Project();
	}
</script>

<div>
	<h1>Welcome to Ecdar</h1>
	<button id="start-new-project" on:click={startNewProject}
		>Start a new project</button
	>
</div>
