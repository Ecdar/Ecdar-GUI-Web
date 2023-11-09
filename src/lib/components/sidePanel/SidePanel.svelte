<script lang="ts">
	import { SidePanelEnum } from "./SidePanelEnum";

	export let panelSide: SidePanelEnum;
	export let mainContainer: HTMLElement;
	let panelWidth: number = 300;

	/**
	 * Function for resizing a sidepanel
	 * @param event
	 */
	function resizeSidePanel(event: MouseEvent) {
		event.preventDefault();
		if (panelSide === SidePanelEnum.Left) {
			panelWidth = event.x;
		} else {
			panelWidth = window.innerWidth - event.x;
		}
	}

	/**
	 * Function for starting resizing a side panel
	 * @param event
	 */
	function startResizingSidePanel(event: PointerEvent) {
		event.preventDefault();
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
		mainContainer.releasePointerCapture(event.pointerId);
		mainContainer.removeEventListener("pointermove", resizeSidePanel);
		mainContainer.removeEventListener("pointerup", stopResizingSidePanel);
		mainContainer.removeEventListener(
			"pointercancel",
			stopResizingSidePanel,
		);
	}
</script>

{#if panelSide === SidePanelEnum.Right}
	<div
		role="button"
		id="right-resizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={(event) => {
			startResizingSidePanel(event);
		}}
	/>
{/if}
<div class="side-panel" style="flex-basis: {panelWidth}px">
	<nav class="inner-nav">
		<slot name="nav" />
	</nav>
	<div class="side-panel-content">
		<slot name="content" />
	</div>
</div>
{#if panelSide === SidePanelEnum.Left}
	<div
		role="button"
		id="left-resizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={(event) => {
			startResizingSidePanel(event);
		}}
	/>
{/if}

<style>
	nav {
		background-color: var(--canvas-topbar-color);
		color: var(--navigationbar-text-color);
		height: 5em;
		flex-shrink: 0;
	}

	.inner-nav {
		background-color: var(--main-navigationbar-color);
		border: var(--main-innernavigationbar-border);
		font-size: var(--sidebar-navigationbar-fontsize);
	}

	.side-panel {
		background-color: var(--background-color);
		display: flex;
		flex-direction: column;
		flex-basis: 10em;
		overflow: hidden;
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
</style>
