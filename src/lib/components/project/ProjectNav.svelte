<script lang="ts">
	import {
		Note_add,
		Create_new_folder,
	} from "svelte-google-materialdesign-icons";
	import SvgButton from "$lib/components/buttons/SvgButton.svelte";
	import { components, systems } from "$lib/globalState/activeProject";
	import { Component } from "$lib/classes/automaton/Component";
	import { System } from "$lib/classes/automaton/System";

	function addComponent() {
		const newComponent = new Component("New Component");
		newComponent.color = "grey";
		newComponent.description = "This is a description.";
		$components?.push(newComponent);
		$components = $components;
	}

	function addSystem() {
		const newSystem = new System("New System");
		newSystem.color = "lightgrey";
		newSystem.description = "This is a description.";
		$systems?.push(newSystem);
		$systems = $systems;
	}
</script>

<div id="project-nav">
	<div>
		<h1>Project</h1>
	</div>
	<div class="buttons">
		<SvgButton
			icon={Create_new_folder}
			click={addComponent}
			size={30}
			id="add-component"
		/>
		<SvgButton
			icon={Note_add}
			click={addSystem}
			size={30}
			id="add-system"
		/>
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

	.buttons {
		display: flex;
	}
</style>
