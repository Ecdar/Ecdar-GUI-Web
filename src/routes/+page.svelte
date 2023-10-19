<script lang="ts">
	import DropDownMenu from "$lib/components/samplesImplementations/DropDownMenu.svelte";
	import LocationsWithContextMenu from "$lib/components/samplesImplementations/LocationsWithContextMenu.svelte";
	import Queries from "$lib/components/query/Queries.svelte";
	import QueryNav from "$lib/components/query/QueryNav.svelte";
	import {
		Person_pin_circle,
		Vpn_key_off,
		Screen_lock_landscape,
		Table_restaurant,
		Clean_hands,
		Pregnant_woman,
		Fire_extinguisher,
	} from "svelte-google-materialdesign-icons";

	const iconConfig = {
		size: "40",
	};

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
</script>

<!-- Top navigation Panel -->
<nav id="main-nav"></nav>
<main bind:this={mainContainer}>
	<!-- Left side Panel -->
	<div class="sidePanel" style="flex-basis: {leftSidePanelWidth}px">
		<nav class="inner-nav1">Toolbox</nav>
		<p>Tool</p>
		<div class="icons">
			<div class="icon">
				<Person_pin_circle {...iconConfig} />
			</div>
			<div class="icon">
				<Vpn_key_off {...iconConfig} />
			</div>
			<div class="icon">
				<Screen_lock_landscape {...iconConfig} />
			</div>
			<div class="icon">
				<Table_restaurant {...iconConfig} />
			</div>
			<div class="icon">
				<Clean_hands {...iconConfig} />
			</div>
			<div class="icon">
				<Pregnant_woman {...iconConfig} />
			</div>
			<div class="icon">
				<Fire_extinguisher {...iconConfig} />
			</div>
		</div>
		<nav class="inner-nav1">Project</nav>
		<p>Project</p>
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
		<nav class="inner-nav3">
			<QueryNav />
		</nav>
		<Queries />
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

	.icons {
		display: flex;
		flex-wrap: wrap;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border: 2px solid black;
		margin: 2px;
	}

	footer {
		height: 2.5em;
		background-color: slategrey;
	}
</style>
