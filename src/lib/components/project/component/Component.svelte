<script lang="ts">
	import { Folder_special } from "svelte-google-materialdesign-icons";
	import type { Component } from "$lib/classes/automaton/Component";
	import ComponentDropDownMenu from "./ComponentDropDownMenu.svelte";

	export let component: Component;
	export let index: number;

	function handleDoubleClick() {
		component.name = prompt("New name:", component.name) || component.name;
	}
</script>

<div
	class="component"
	on:dblclick={handleDoubleClick}
	role="button"
	tabindex="-1"
>
	<div class="left">
		<div class="circle" style="background-color: {component.color}">
			<div class="icon">
				<Folder_special size="100%" />
			</div>
		</div>
		<p>{component.name}</p>
	</div>
	<div>
		<ComponentDropDownMenu {index} />
	</div>
</div>

<style>
	.left {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.component {
		background-color: #eceff1;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
		transition: background-color 200ms;
	}

	.component:hover {
		background-color: #cfd8dc;
	}

	.icon {
		display: flex;
		vertical-align: middle;
		padding: 15%;
	}

	.circle {
		margin-right: 10px;
		display: flex;
		height: 50px;
		width: 50px;
		min-width: 50px;
		border-radius: 70px;
		justify-content: center;
	}
</style>
