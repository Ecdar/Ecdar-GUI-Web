<script lang="ts">
	import { project } from "$lib/globalState/activeProject";
	import StartScreen from "$lib/components/startScreen/StartScreen.svelte";
	import Toolbar from "$lib/components/toolBar/Toolbar.svelte"
	import TopBar from "$lib/components/topBar/TopBar.svelte";
	import SidePanel from "$lib/components/sidePanel/SidePanel.svelte";
	import { SidePanelEnum } from "$lib/components/sidePanel/SidePanelEnum";
	import SvgView from "$lib/components/svg-view/SvgView.svelte";
	import Console from "$lib/components/console/Console.svelte";
	import ProjectNav from "$lib/components/project/ProjectNav.svelte";
	import GlobalDeclaration from "$lib/components/project/globalDeclaration/GlobalDeclaration.svelte";
	import Queries from "$lib/components/query/Queries.svelte";
	import QueryNav from "$lib/components/query/QueryNav.svelte";
	import ProjectItems from "$lib/components/project/ProjectItems.svelte";
</script>

<!-- Top navigation Panel -->
<nav id="main-nav">
	<TopBar />
</nav>
<main>
	{#if $project === undefined}
		<StartScreen />
	{:else}
		<!-- Left side -->
		<SidePanel panelSide={SidePanelEnum.Left}>
			<ProjectNav  slot="nav"/>
			<div slot="content">
				<Toolbar/>
				<GlobalDeclaration />
				<ProjectItems />
			</div>
		</SidePanel>
		<!-- Canvas -->
		<div class="canvas">
			<nav class="inner-nav2">Nav 2</nav>
			<SvgView />
		</div>
		<!-- Right side -->
		<SidePanel panelSide={SidePanelEnum.Right}>
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
		border: var(--main-navigationbar-border);
		flex-shrink: 0;
	}

	#main-nav {
		background-color: var(--main-navigationbar-color);
		height: 2em;
		border-bottom: 0.2em solid black;
	}

	main {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.inner-nav2 {
		background-color: var(--canvas-topbar-color);
		color: var(--navigationbar-text-color);
		border: none;
	}

	.canvas {
		display: flex;
		flex-direction: column;
		color: var(--canvas-text-color);
		flex-grow: 1;
	}
</style>