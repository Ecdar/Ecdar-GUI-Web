<script lang="ts">
	import { project } from "$lib/globalState/activeProject";
	import StartScreen from "$lib/components/startScreen/StartScreen.svelte";
	import SvgView from "$lib/components/svg-view/SvgView.svelte";
	import ProjectNav from "$lib/components/project/ProjectNav.svelte";
	import ProjectItems from "$lib/components/project/ProjectItems.svelte";
	import QueryNav from "$lib/components/query/QueryNav.svelte";
	import Queries from "$lib/components/query/Queries.svelte";
	import Console from "$lib/components/console/Console.svelte";
	import { Description } from "svelte-google-materialdesign-icons";
	import type iEngineUIComponent from "$lib/interfaces/IEngineUIComponent";

	import TopBar from "$lib/components/topBar/TopBar.svelte";
	import EngineUi from "$lib/components/engineUI/EngineUI.svelte";

	enum SidePanel {
		Left,
		Right,
		Neither,
	}

	let currentResizablePanel: SidePanel = SidePanel.Neither;
	let leftSidePanelWidth: number = 300;
	let rightSidePanelWidth: number = 300;
	let mainContainer: HTMLElement;
	let engineUIContainer: EngineUi & iEngineUIComponent;

	/**
	 * Function for resizing a sidepanel
	 * @param event
	 */
	function resizeSidePanel(event: MouseEvent) {
		event.preventDefault();
		if (currentResizablePanel === SidePanel.Left) {
			leftSidePanelWidth = event.x;
		} else {
			rightSidePanelWidth = window.innerWidth - event.x;
		}
	}

	/**
	 * Function for starting resizing a side panel
	 * @param event
	 * @param side
	 */
	function startResizingSidePanel(event: PointerEvent, side: SidePanel) {
		event.preventDefault();
		currentResizablePanel = side;
		mainContainer.setPointerCapture(event.pointerId);
		mainContainer.addEventListener("pointermove", resizeSidePanel);
		mainContainer.addEventListener("pointerup", stopResizingSidePanel);
		mainContainer.addEventListener("pointercancel", stopResizingSidePanel);
	}

	/**
	 * Function for stopping resizing a side panel
	 * @param event
	 */
	function stopResizingSidePanel(event: PointerEvent) {
		currentResizablePanel = SidePanel.Neither;
		mainContainer.releasePointerCapture(event.pointerId);
		mainContainer.removeEventListener("pointermove", resizeSidePanel);
		mainContainer.removeEventListener("pointerup", stopResizingSidePanel);
		mainContainer.removeEventListener(
			"pointercancel",
			stopResizingSidePanel,
		);
	}

	function openEngineUI() {
		engineUIContainer.showEngineUI();
	}
</script>

<!-- Top navigation Panel -->
<EngineUi bind:this={engineUIContainer} />
<nav id="main-nav">
	<TopBar on:toggle={openEngineUI} />
</nav>
<main bind:this={mainContainer}>
	{#if $project === undefined}
		<StartScreen />
	{:else}
		<!-- Left side Panel -->
		<div class="side-panel" style="flex-basis: {leftSidePanelWidth}px">
			<nav class="inner-nav1">
				<ProjectNav />
			</nav>
			<div class="side-panel-content">
				<div
					class="global-dec"
					style="background-color: var(--sidebar-element-color);"
				>
					<div class="circle" style="background-color: grey">
						<div class="icon">
							<Description size="100%" />
						</div>
					</div>
					<p>Global declaration</p>
				</div>
				<ProjectItems />
			</div>
		</div>
		<!-- Left resize Panel -->
		<div
			role="button"
			id="left-resizer"
			class="resizer"
			tabindex="-1"
			on:pointerdown={(event) => {
				startResizingSidePanel(event, SidePanel.Left);
			}}
		/>
		<!-- Canvas -->
		<div class="canvas">
			<nav class="inner-nav2">Nav 2</nav>
			<SvgView />
		</div>
		<!-- Right resize Panel -->
		<div
			role="button"
			id="right-resizer"
			class="resizer"
			tabindex="-1"
			on:pointerdown={(event) => {
				startResizingSidePanel(event, SidePanel.Right);
			}}
		/>
		<!-- Right side Panel -->
		<div class="side-panel" style="flex-basis: {rightSidePanelWidth}px">
			<nav class="inner-nav3">
				<QueryNav />
			</nav>
			<div class="side-panel-content">
				<Queries />
			</div>
		</div>
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

	.inner-nav1,
	.inner-nav3 {
		background-color: var(--main-navigationbar-color);
		border: var(--main-innernavigationbar-border);
		font-size: var(--sidebar-navigationbar-fontsize);
	}

	.inner-nav2 {
		background-color: var(--canvas-topbar-color);
		border: none;
	}

	.inner-nav1,
	.inner-nav2,
	.inner-nav3 {
		color: var(--navigationbar-text-color);
	}

	.global-dec {
		background-color: #eceff1;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
		transition: background-color 200ms;
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

	.icon {
		display: flex;
		vertical-align: middle;
		padding: 15%;
	}

	.side-panel {
		flex-basis: 10em;
		overflow: hidden;
		background-color: var(--background-color);
	}

	.side-panel-content {
		color: var(--sidebar-text-color);
		font-size: var(--sidebar-standard-fontsize);
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		white-space: nowrap;
	}

	.resizer {
		background-color: black;
		flex-basis: 0.2em;
		cursor: col-resize;
	}

	.canvas {
		color: var(--canvas-text-color);
		background-color: var(--background-color);
		flex-grow: 1;
	}

	.canvas,
	.side-panel {
		display: flex;
		flex-direction: column;
	}
</style>
