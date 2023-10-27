<script lang="ts">
	import { Component, Location, Nickname } from "$lib/classes/automaton";
	import { Point } from "$lib/classes/draw";
	import { Project } from "$lib/classes/project/Project";
	import ContextMenu from "$lib/components/contextMenu/ContextMenu.svelte";
	import { activeView, project } from "$lib/globalState/activeProject";

	const comp = new Component("bing", "", [
		new Location(
			"1",
			new Point(100, 100),
			new Nickname("testing", new Point(40, -40)),
		),
	]);

	project.set(new Project("Test project", [comp]));

	$activeView = comp;
</script>

<svelte:head>
	<title>Ecdar</title>
</svelte:head>

<svelte:window on:contextmenu|preventDefault />

<slot />
<ContextMenu />

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
