<script lang="ts">
	import ToolBarItem from "./ToolbarItem.svelte";
	import {
		Content_cut,
		Arrow_downward,
		Arrow_upward,
		Arrow_right,
	} from "svelte-google-materialdesign-icons";
	import SidePanel from "$lib/components/sidePanel/SidePanel.svelte";
	import SvgButton from "../buttons/SvgButton.svelte";
	
	export let collapsed: boolean = false;
	const initalSize: string = "fits-content";
	let extendedSize: string = initalSize;
	let collapsedSize: string = "0em";
	let toolbarSize = collapsedSize;

	/**
	 * Collapses or expands the toolbar
	 */
	function collapseOrExpand(){
		if(collapsed){
			toolbarSize = "0";
			collapsed = false;
		}
		else {
			toolbarSize = "fit-content"
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
			{#if collapsed}
				<SvgButton
				icon={Arrow_downward}
				click={collapseOrExpand}
				id="toolbar-collapse-expand"
				color="white"
				/>
			{:else}
				<SvgButton
				icon={Arrow_right}
				click={collapseOrExpand}
				id="toolbar-collapse-expand"
				color="white"
				/>
			{/if}
			
		</button>
	</div>
</nav>

<div 
	class=tool-bar-style 
	style= "height: {toolbarSize}"
	data-testid="toolbar"
>
	<!-- Add ToolBarItems here, containing name, icon, onClick and description -->
	<ToolBarItem 
		name="Cut"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut pressed!');
		}}	
		description="This is a testfunction for cut"
		
	/>
	<ToolBarItem 
		name="Cut2"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 2 pressed!');
		}}		
		description="This is a testfunction for cut 2"
	/>
	<ToolBarItem 
		name="Cut3"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 3 pressed!');
		}}
		description="This is a testfunction for cut 3"
	/>
	<ToolBarItem 
		name="Cut4"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 4 pressed!');
		}}
		description="This is a testfunction for cut 4"
	/>
	<ToolBarItem 
		name="Cut5"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 5 pressed!');
		}}
		description="This is a testfunction for cut 5"
	/>
	<ToolBarItem 
		name="Cut6"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 6 pressed!');
		}}
		description="This is a testfunction for cut 6"
	/>
	<ToolBarItem 
		name="Cut7"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 7 pressed!');
		}}
		description="This is a testfunction for cut 7"
	/>
	<ToolBarItem 
		name="Cut8"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 8 pressed!');
		}}
		description="This is a testfunction for cut 8"
	/>
	<ToolBarItem 
		name="Cut9"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Cut 9 pressed!');
		}}
		description="This is a testfunction for cut 9"
	/>
</div>

<style>
	.tool-bar-style{
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

	
</style>