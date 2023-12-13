<script lang="ts">
	import ToolbarItem from "./ToolbarItem.svelte";
	import {
		Content_cut,
		Arrow_downward,
		Arrow_right,
	} from "svelte-google-materialdesign-icons";
	import SvgButton from "../buttons/SvgButton.svelte";
	import EcdarConsole from "$lib/classes/console/Console";

	export let collapsed: boolean = false;
	let collapsedSize: string = "0em";
	let toolbarSize = collapsedSize;

	/**
	 * Collapses or expands the toolbar
	 */
	function collapseOrExpand() {
		if (collapsed) {
			toolbarSize = "0";
			collapsed = false;
		} else {
			toolbarSize = "fit-content";
			collapsed = true;
		}
	}
</script>

<nav>
	<div id="tools-nav">
		<div>
			<h1>Tools</h1>
		</div>
		<button class="collapsible unselectable">
			<SvgButton
<<<<<<< Updated upstream
			icon={collapsed ? Arrow_downward : Arrow_right}
			click={collapseOrExpand}
			id="toolbar-collapse-expand"
			color="white"
=======
				icon={collapsed ? Arrow_downward : Arrow_right}
				click={collapseOrExpand}
				id="toolbar-collapse-expand"
				color="white"
>>>>>>> Stashed changes
			/>
		</button>
	</div>
</nav>

<div class="tool-bar-style" style="height: {toolbarSize}" data-testid="toolbar">
	<!-- Add ToolBarItems here, containing name, icon, onClick and description -->
	<ToolbarItem
		name="Cut"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut pressed!");
		}}
		description="This is a testfunction for cut"
	/>
	<ToolbarItem
		name="Cut2"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 2 pressed!");
		}}
		description="This is a testfunction for cut 2"
	/>
	<ToolbarItem
		name="Cut3"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 3 pressed!");
		}}
		description="This is a testfunction for cut 3"
	/>
	<ToolbarItem
		name="Cut4"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 4 pressed!");
		}}
		description="This is a testfunction for cut 4"
	/>
	<ToolbarItem
		name="Cut5"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 5 pressed!");
		}}
		description="This is a testfunction for cut 5"
	/>
	<ToolbarItem
		name="Cut6"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 6 pressed!");
		}}
		description="This is a testfunction for cut 6"
	/>
	<ToolbarItem
		name="Cut7"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 7 pressed!");
		}}
		description="This is a testfunction for cut 7"
	/>
	<ToolbarItem
		name="Cut8"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 8 pressed!");
		}}
		description="This is a testfunction for cut 8"
	/>
	<ToolbarItem
		name="Cut9"
		icon={Content_cut}
		onClick={() => {
			// Your custom logic here
			EcdarConsole.writeLineFrontend("Cut 9 pressed!");
		}}
		description="This is a testfunction for cut 9"
	/>
</div>

<style>
	.tool-bar-style {
		font-size: 0; /* This removes the space between buttons*/
		margin-right: -2px;
		margin-bottom: 0px;
	}
	nav {
		background-color: var(--main-navigationbar-color);
		color: var(--navigationbar-text-color);
		height: 5em;
		flex-shrink: 0;
	}
	#tools-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
		margin-bottom: 0px;
	}
	.collapsible {
		background-color: var(--console-topbar-background-color);
		float: right;
		background: none;
		border: none;
		display: flex;
	}
<<<<<<< Updated upstream

	
=======
>>>>>>> Stashed changes
</style>
