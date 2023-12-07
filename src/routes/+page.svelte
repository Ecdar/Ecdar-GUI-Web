<script lang="ts">
	import { project } from "$lib/globalState/activeProject";
	import StartScreen from "$lib/components/startScreen/StartScreen.svelte";
	import TopBar from "$lib/components/topBar/TopBar.svelte";
	import SidePanel from "$lib/components/sidePanel/SidePanel.svelte";
	import { SidePanelEnum } from "$lib/components/sidePanel/SidePanelEnum";
	import SvgView from "$lib/components/svgView/SvgView.svelte";
	import Console from "$lib/components/console/Console.svelte";
	import ProjectNav from "$lib/components/project/ProjectNav.svelte";
	import GlobalDeclaration from "$lib/components/project/globalDeclaration/GlobalDeclaration.svelte";
	import Queries from "$lib/components/query/Queries.svelte";
	import type IEngineUIComponent from "$lib/interfaces/IEngineUIComponent";
	import type IAboutUI from "$lib/interfaces/IAboutUI";
	import EngineUi from "$lib/components/engineUI/EngineUI.svelte";
	import AboutUi from "$lib/components/topBar/aboutUI/AboutUI.svelte";
	import QueryNav from "$lib/components/query/QueryNav.svelte";
	import ProjectItems from "$lib/components/project/ProjectItems.svelte";
	import Settings from "$lib/components/settings/SettingsView.svelte";

	let engineUIContainer: EngineUi & IEngineUIComponent;

	function openEngineUI() {
		engineUIContainer.showEngineUI();
	}

	let showSettings: boolean = false;
	function toggleSettings() {
		showSettings = !showSettings;
	}

	let aboutUIContainer: AboutUi & IAboutUI;
	function openAboutUI() {
		aboutUIContainer.showAboutUI();
	}
</script>

<!-- Top navigation Panel -->
<EngineUi bind:this={engineUIContainer} />
<AboutUi bind:this={aboutUIContainer} />
<nav id="main-nav">
	<TopBar
		on:toggleSettings={toggleSettings}
		on:toggleEngineUI={openEngineUI}
		on:toggleAboutBox={openAboutUI}
	/>
</nav>
<main>
	{#if $project === undefined}
		<StartScreen />
	{:else}
		<!-- Left side -->
		<SidePanel panelSide={SidePanelEnum.Left}>
			<ProjectNav slot="nav" />
			<div slot="content">
				<GlobalDeclaration />
				<ProjectItems />
			</div>
		</SidePanel>
		<!-- Canvas -->
		<div class="canvas">
			<nav class="inner-nav2">Nav 2</nav>
			<!-- Replace Settings with a modal or new window instead of replacing the SVG View -->
			{#if showSettings}
				<Settings on:toggleSettings={toggleSettings} />
			{:else}
				<SvgView />
			{/if}
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
		color: var(--canvas-text-color);
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>
