<script lang="ts">
	import {
		Note_add,
		Create_new_folder,
	} from "svelte-google-materialdesign-icons";

	function addComponent() {
		console.log("Add component");
	}

	function addSystem() {
		console.log("Add system");
	}
</script>

<div id="project-nav">
	<div>
		<h1>Project</h1>
	</div>
	<div>
		<Note_add on:click={addComponent} />
		<Create_new_folder on:click={addSystem} />
	</div>
</div>

<style>
	#project-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
	}
</style>
