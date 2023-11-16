<script lang="ts">
	import {
		Note_add,
		Create_new_folder,
	} from "svelte-google-materialdesign-icons";
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
	<div>
		<button on:click={addComponent}>
			<Create_new_folder tabindex="-1" id="add-component" />
		</button>
		<button on:click={addSystem}>
			<Note_add tabindex="-1" id="add-system" />
		</button>
	</div>
</div>

<style>
	button {
		background: none;
		border: none;
		color: var(--navigationbar-text-color);
	}

	#project-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
	}
</style>
