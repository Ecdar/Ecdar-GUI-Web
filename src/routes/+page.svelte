<script lang="ts">
	import { project } from "$lib/globalState/activeProject";
	import StartScreen from "$lib/components/startScreen/StartScreen.svelte";
	import SvgView from "$lib/components/svg-view/SvgView.svelte";
	import Console from "$lib/components/console/Console.svelte";
	import Components from "$lib/components/project/component/Components.svelte";
	import Systems from "$lib/components/project/system/Systems.svelte";
	import ProjectNav from "$lib/components/project/ProjectNav.svelte";
	import Queries from "$lib/components/query/Queries.svelte";
	import QueryNav from "$lib/components/query/QueryNav.svelte";
	import { Description } from "svelte-google-materialdesign-icons";

	enum SidePanel {
		Left,
		Right,
		Neither,
	}

	let currentResizablePanel: SidePanel = SidePanel.Neither;
	let leftSidePanelWidth: number = 300;
	let rightSidePanelWidth: number = 300;
	let mainContainer: HTMLElement;

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
</script>

<!-- Top navigation Panel -->
<nav id="main-nav">
	<p>Main Nav</p>
</nav>
<main bind:this={mainContainer}>
	{#if $project === undefined}
		<StartScreen />
	{:else}
		<!-- Left side Panel -->
		<div class="sidePanel" style="flex-basis: {leftSidePanelWidth}px">
			<nav class="inner-nav1"><ProjectNav /></nav>
			<div class="sidePanelContent">
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
				<Components />
				<Systems />
			</div>
		</div>
		<!-- Left resize Panel -->
		<div
			role="button"
			id="leftresizer"
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
			id="rightresizer"
			class="resizer"
			tabindex="-1"
			on:pointerdown={(event) => {
				startResizingSidePanel(event, SidePanel.Right);
			}}
		/>
		<!-- Right side Panel -->
		<div class="sidePanel" style="flex-basis: {rightSidePanelWidth}px">
			<nav class="inner-nav3">
				<QueryNav />
			</nav>
			<div class="sidePanelContent">
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
		color: var(--navigationbar-text-color);
		background-color: var(--main-navigationbar-color);
		height: 2.5em;
		min-height: 2.5em;
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

	.sidePanel {
		flex-basis: 10em;
		overflow: hidden;
		background-color: var(--background-color);
	}

	.sidePanelContent {
		color: var(--sidebar-text-color);
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		white-space: nowrap;
	}

	.resizer {
		background-color: black;
		flex-basis: 0.1em;
		cursor: col-resize;
	}

	.canvas {
		color: var(--canvas-text-color);
		background-color: var(--background-color);
		flex-grow: 1;
	}

	.canvas,
	.sidePanel {
		display: flex;
		flex-direction: column;
	}
</style>
