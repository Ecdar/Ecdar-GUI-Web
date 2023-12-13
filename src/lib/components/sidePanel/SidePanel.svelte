<script lang="ts">
	import { SidePanelEnum } from "./SidePanelEnum";

	export let panelSide: SidePanelEnum;

	let resizer: HTMLElement;
	let panelWidth: number = 300;
	let controller: AbortController;
	let signal: AbortSignal;

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
		controller = new AbortController();
		signal = controller.signal;

		event.preventDefault();
		event.stopPropagation();

		resizer.setPointerCapture(event.pointerId);
		resizer.addEventListener("pointermove", resizeSidePanel, {
			signal,
		});
		resizer.addEventListener("pointerup", stopResizingSidePanel, {
			signal,
		});
		resizer.addEventListener("pointercancel", stopResizingSidePanel, {
			signal,
		});
	}

	/**
	 * Function for stopping resizing a side panel
	 * @param event
	 */
	function stopResizingSidePanel(event: PointerEvent) {
		resizer.releasePointerCapture(event.pointerId);
		controller.abort();
	}
</script>

{#if panelSide === SidePanelEnum.Right}
	<div
		bind:this={resizer}
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
	{#if panelSide === SidePanelEnum.Left}
		<slot name="toolbar" />
	{/if}
	<nav class="inner-nav">
		<slot name="nav" />
	</nav>
	<div class="side-panel-content">
		<slot name="content" />
	</div>
</div>
{#if panelSide === SidePanelEnum.Left}
	<div
		bind:this={resizer}
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
