<script lang="ts">
	import {
		Component,
		Location,
		Nickname,
		Edge,
		Status,
		Nail,
		PropertyType,
		Property,
	} from "$lib/classes/automaton";
	import { Point } from "$lib/classes/draw";
	import { Project } from "$lib/classes/project/Project";
	import ContextMenu from "$lib/components/contextMenu/ContextMenu.svelte";
	import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";
	import { browser } from "$app/environment";
	import { activeView, project } from "$lib/globalState/activeProject";

	const comp = new Component(
		"bing",
		"",
		[
			new Location(
				"1",
				new Point(100, 100),
				new Nickname("testing", new Point(40, -40)),
			),
			new Location(
				"2",
				new Point(200, 200),
				new Nickname("testing2", new Point(40, -40)),
			),
		],
		[
			new Edge(
				"test",
				undefined,
				"1",
				"2",
				Status.OUTPUT,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				[
					new Nail(
						new Property(
							PropertyType.SYNCHRONIZATION,
							new Point(150, 150),
						),
						new Point(150, 150),
					),
				],
			),
		],
	);

	project.set(new Project("Test project", [comp]));

	$activeView = comp;

	if (browser) {
		// Catch errors here and show error popup
		try {
			new GlobalCssSchemesLoader();
		} catch (e) {
			console.log(e);
		}
	}
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
	}

	:global(body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
		margin: 0;
	}
</style>
