<script lang="ts">
	import { project } from "$lib/globalState/activeProject";
	import StartScreen from "$lib/components/startScreen/StartScreen.svelte";
	import SidePanel from "$lib/components/sidePanel/SidePanel.svelte";
	import { SidePanelEnum } from "$lib/components/sidePanel/SidePanelEnum";
	import SvgView from "$lib/components/svg-view/SvgView.svelte";
	import Console from "$lib/components/console/Console.svelte";
	import ProjectNav from "$lib/components/project/ProjectNav.svelte";
	import GlobalDeclaration from "$lib/components/project/globalDeclaration/GlobalDeclaration.svelte";
	import Components from "$lib/components/project/component/Components.svelte";
	import Systems from "$lib/components/project/system/Systems.svelte";
	import Queries from "$lib/components/query/Queries.svelte";
	import QueryNav from "$lib/components/query/QueryNav.svelte";

	let mainContainer: HTMLElement;
</script>

<!-- Top navigation Panel -->
<nav id="main-nav"></nav>
<main bind:this={mainContainer}>
	{#if $project === undefined}
		<StartScreen />
	{:else}
		<!-- Left side -->
		<SidePanel panelSide={SidePanelEnum.Left} {mainContainer}>
			<ProjectNav slot="nav" />
			<div slot="content">
				<GlobalDeclaration />
				<Components />
				<Systems />
			</div>
		</SidePanel>
		<!-- Canvas -->
		<div class="canvas">
			<nav class="inner-nav2">Nav 2</nav>
			<SvgView />
		</div>
		<!-- Right side -->
		<SidePanel panelSide={SidePanelEnum.Right} {mainContainer}>
			<QueryNav slot="nav" />
			<div slot="content">
				<Queries />
			</div>
		</SidePanel>
	{/if}
</main>
<!-- Console component -->
<Console />

<style>
	nav {
		height: 5em;
		background-color: slategrey;
		flex-shrink: 0;
	}

	#main-nav {
		height: 2.5em;
		min-height: 2.5em;
	}

	main {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.inner-nav2 {
		background-color: lightslategrey;
		box-shadow: slategrey 0px 0px 1em;
	}

	.canvas {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>
