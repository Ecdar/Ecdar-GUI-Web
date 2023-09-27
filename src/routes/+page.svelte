<script lang="ts">
	enum PanelSide {
		Left,
		Right,
		Neither
	}

	let currentSide: PanelSide = PanelSide.Neither;
	let leftSidebarWidth: number = 300;
	let rightSidebarWidth: number = 300;
	let mainContainer: HTMLElement;

	/**
	 * Function for resizing a sidebar
	 * @param event
	 */
	function resizeSidebar(event: MouseEvent) {
		event.preventDefault();
		if (currentSide === PanelSide.Left) {
			leftSidebarWidth = event.x;
		} else {
			rightSidebarWidth = window.innerWidth - event.x;
		}
	}

	/**
	 * Function for starting resizing a sidebar
	 * @param event
	 * @param side
	 */
	function startResizingSidebar(event: PointerEvent, side: PanelSide) {
		event.preventDefault();
		currentSide = side;
		mainContainer.setPointerCapture(event.pointerId);
		mainContainer.addEventListener('pointermove', resizeSidebar);
		mainContainer.addEventListener('pointerup', stopResizingSidebar);
		mainContainer.addEventListener('pointercancel', stopResizingSidebar);
	}

	/**
	 * Function for stopping resizing a sidebar
	 * @param event
	 */
	function stopResizingSidebar(event: PointerEvent) {
		currentSide = PanelSide.Neither;
		mainContainer.releasePointerCapture(event.pointerId);
		mainContainer.removeEventListener('pointermove', resizeSidebar);
		mainContainer.removeEventListener('pointerup', stopResizingSidebar);
		mainContainer.removeEventListener('pointercancel', stopResizingSidebar);
	}
</script>

<!-- Top navigation bar -->
<nav id="main-nav"></nav>
<main bind:this={mainContainer}>
	<!-- Left side bar -->
	<div class="sidebar" style="flex-basis: {leftSidebarWidth}px">
		<nav class="inner-nav1">Nav 1</nav>
		<p>Left</p>
	</div>
	<!-- Left resize bar -->
	<div
		role="button"
		id="leftresizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={(event) => {
			startResizingSidebar(event, PanelSide.Left);
		}}
	/>
	<!-- Canvas -->
	<div class="canvas">
		<nav class="inner-nav2">Nav 2</nav>
		<p>Canvas</p>
	</div>
	<!-- Right resize bar -->
	<div
		role="button"
		id="leftresizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={(event) => {
			startResizingSidebar(event, PanelSide.Right);
		}}
	/>
	<!-- Right side bar -->
	<div class="sidebar" style="flex-basis: {rightSidebarWidth}px">
		<nav class="inner-nav3">Nav 3</nav>
		<p>Right</p>
	</div>
</main>
<!-- Footer component -->
<footer>Footer/Console</footer>

<style>
	nav {
		height: 50px;
		background-color: slategrey;
	}

	#main-nav {
		height: 25px;
	}

	main {
		display: flex;
		height: 100%;
	}

	.inner-nav1,
	.inner-nav3 {
		background-color: slategrey;
	}

	.inner-nav2 {
		background-color: lightslategrey;
	}

	.sidebar {
		background-color: whitesmoke;
		flex-basis: 200px;
	}

	.resizer {
		background-color: black;
		flex-basis: 5px;
		cursor: col-resize;
	}

	.canvas {
		background-color: whitesmoke;
		flex-grow: 1;
	}

	footer {
		height: 25px;
		background-color: slategrey;
	}
</style>
