<script lang="ts">
	enum SidePanel {
		Left,
		Right,
		Neither
	}

	import Console from '../lib/console.svelte';

	let currentResizablePanel: SidePanel = SidePanel.Neither;
	let leftSidePanelWidth: number = 300;
	let rightSidePanelWidth: number = 300;
	let mainContainer: HTMLElement;
	let footerHeight: number = 2;

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
		mainContainer.addEventListener('pointermove', resizeSidePanel);
		mainContainer.addEventListener('pointerup', stopResizingSidePanel);
		mainContainer.addEventListener('pointercancel', stopResizingSidePanel);
	}

	/**
	 * Function for stopping resizing a sid panel
	 * @param event
	 */
	function stopResizingSidePanel(event: PointerEvent) {
		currentResizablePanel = SidePanel.Neither;
		mainContainer.releasePointerCapture(event.pointerId);
		mainContainer.removeEventListener('pointermove', resizeSidePanel);
		mainContainer.removeEventListener('pointerup', stopResizingSidePanel);
		mainContainer.removeEventListener('pointercancel', stopResizingSidePanel);
	}
</script>

<!-- Top navigation Panel -->
<nav id="main-nav"></nav>
<main bind:this={mainContainer}>
	<!-- Left side Panel -->
	<div class="sidePanel" style="flex-basis: {leftSidePanelWidth}px">
		<nav class="inner-nav1">Nav 1</nav>
		<p>Left</p>
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
		<p>Canvas</p>
	</div>
	<!-- Right resize Panel -->
	<div
		role="button"
		id="leftresizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={(event) => {
			startResizingSidePanel(event, SidePanel.Right);
		}}
	/>
	<!-- Right side Panel -->
	<div class="sidePanel" style="flex-basis: {rightSidePanelWidth}px">
		<nav class="inner-nav3">Nav 3</nav>
		<p>Right</p>
	</div>
</main>
<!-- Footer component -->
<footer style="height:{footerHeight}em;">
	<Console bind:value={footerHeight} />
</footer>

<style>
	nav {
		height: 5em;
		background-color: slategrey;
	}

	#main-nav {
		height: 2.5em;
	}

	main {
		display: flex;
		height: 100%;
	}

	.inner-nav1,
	.inner-nav3 {
		background-color: slategrey;
		box-shadow: lightslategray 0px 0px 1em;
	}

	.inner-nav2 {
		background-color: lightslategrey;
		box-shadow: slategrey 0px 0px 1em;
	}

	.sidePanel {
		background-color: whitesmoke;
		flex-basis: 10em;
	}

	.resizer {
		background-color: black;
		flex-basis: 0.3em;
		cursor: col-resize;
	}

	.canvas {
		background-color: whitesmoke;
		flex-grow: 1;
	}

	footer {
		height: var(--footerHeight);
		background-color: slategrey;
		overflow: hidden;
	}
</style>
