<script lang="ts">
	import {
		Note_add,
		Create_new_folder,
	} from "svelte-google-materialdesign-icons";
	import {
		locationIds,
		edgeIds,
		components,
		systems,
	} from "$lib/globalState/activeProject";
	import { Location } from "$lib/classes/automaton/component/Location";
	import { Component } from "$lib/classes/automaton/component/Component";
	import { System } from "$lib/classes/automaton/system/System";
	import { Locations } from "$lib/classes/automaton/component/Locations";
	import { LocationEdges } from "$lib/classes/automaton/component/LocationEdges";

	function addComponent() {
		if (!$components || !$locationIds || !$edgeIds) return;
		const newLocations = new Locations($locationIds);
		const newLocation = new Location($locationIds.getNewOrderedId());
		newLocations.add(newLocation);
		const newComponent = new Component(
			$components.ids.getNewOrderedId(),
			newLocations,
			newLocation.id,
			new LocationEdges($edgeIds),
		);
		newComponent.color = "grey";
		newComponent.description = "This is a description.";
		$components.add(newComponent);
		$components = $components;
	}

	function addSystem() {
		if (!$systems) return;
		const newSystem = new System($systems.ids.getNewOrderedId());
		newSystem.color = "lightgrey";
		newSystem.description = "This is a description.";
		$systems.add(newSystem);
		$systems = $systems;
	}
</script>

<div id="project-nav">
	<div>
		<h1>Project</h1>
	</div>
	<div>
		<Create_new_folder on:click={addComponent} id="add-component" />
		<Note_add on:click={addSystem} id="add-system" />
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
