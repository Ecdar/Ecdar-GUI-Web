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
