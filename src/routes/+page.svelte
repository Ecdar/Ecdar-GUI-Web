<script lang="ts">
	import DropDownMenu from "$lib/components/samplesImplementations/DropDownMenu.svelte";
	import LocationsWithContextMenu from "$lib/components/samplesImplementations/LocationsWithContextMenu.svelte";

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
	 * Function for stopping resizing a sid panel
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

	//Top-bar menu items
	let fileMenuOpen = false;
	const fileMenuItems = ["New project", "Open Project", "Recent Projects", "Save Project", "Save Project as", "New Test Plan", "Export as Png", "Export without border as Png"];
	let editMenuOpen = false;
	const editMenuItems = ["Move All Nodes Left", "Move All Nodes Up", "Move All Nodes Right", "Move All Nodes Right", "Move All Nodes Down"];
	let viewMenuOpen = false;
	const viewMenuItems = ["Project Panel", "Query Panel", "Autoscalling", "Scalling", "Split canvas"];
	let optionsMenuOpen = false;
	const optionsMenuItems = ["UI Cache", "Periodic query execution", "Engine Options"];
	let helpMenuOpen = false;
	const helpMenuItems = ["Modelling Help", "Testing Help", "About"];
	let topbar = [["File",fileMenuOpen,fileMenuItems], ["Edit",editMenuOpen, editMenuItems], ["View", viewMenuOpen,viewMenuItems],["Options",optionsMenuOpen, optionsMenuItems], ["Help",helpMenuOpen,helpMenuItems]];

</script>

<!-- Top navigation Panel -->
<nav id="main-nav">
	{#each topbar as bar}
		<section class="dropdown">
			<button class = "dropdown-btn" on:click={() => bar[1] = !bar[1]} >{bar[0]}</button>
			<div class:show={bar[1]} class="dropdown-content">		
				{#each bar[2] as item}
					<div class="dropdown-item">{item}</div>
				{/each}
			</div>	
		</section>
	{/each}
	

</nav>

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
		<DropDownMenu />
		<LocationsWithContextMenu />
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
<footer>Footer/Console</footer>

<style>
	nav {
		height: 5em;
		background-color: slategrey;
	}

	#main-nav {
		height: 2.5em;
		border-bottom: 2px solid black;
		
		
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
		height: 2.5em;
		background-color: slategrey;
	}



	.dropdown {
		position: relative;
		display: inline-block;
		height: inherit;
	}

	.dropdown-btn{
		background-color: slategrey;
		border-color: transparent;
		color:white;
		height: 95%;
	}

	.dropdown-btn:hover{
		background-color: rgb(67, 150, 181);
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #f6f6f6;
		width: max-content;
		z-index: 1;
	}

	.dropdown-item {
		color: black;
		padding: 5px 16px;
		text-decoration: none;
		display: block;
		width: 100%;
	}

	.dropdown-item:hover {
		background-color: #ddd
	}
		
	.show {
		display:block;
	}

</style>
