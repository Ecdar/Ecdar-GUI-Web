<script lang="ts">
	import ToolBarItem from "./ToolBarItem.svelte";
	import {
		Content_cut,
		Arrow_downward,
		Arrow_upward,
	} from "svelte-google-materialdesign-icons";
	
	export let collapsed: boolean = true;
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
		<button
			type="button"
			class="collapsible unselectable"
			on:click={collapseOrExpand}
		>
			{#if collapsed}
				<Arrow_upward size="18" />
			{:else}
				<Arrow_downward size="18" />
			{/if}
		</button>
	</div>
	
</nav>
<div 
	class=tool-bar-style 
	style= "height: {toolbarSize}"
>
	<!-- Add ToolBarItems here, containing name, icon, onClick and description -->
	<ToolBarItem 
		name="Cut"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}	
		description="This is a testfunction for cut"
		
	/>
	<ToolBarItem 
		name="Cut2"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}		
		description="This is a testfunction for cut 2"
	/>
	<ToolBarItem 
		name="Cut3"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}
		description="This is a testfunction for cut 3"
	/>
	<ToolBarItem 
		name="Cut4"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}
		description="This is a testfunction for cut 4"
	/>
	<ToolBarItem 
		name="Cut5"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}
		description="This is a testfunction for cut 5"
	/>
	<ToolBarItem 
		name="Cut6"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}
		description="This is a testfunction for cut 6"
	/>
	<ToolBarItem 
		name="Cut7"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}
		description="This is a testfunction for cut 7"
	/>
	<ToolBarItem 
		name="Cut8"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}
		description="This is a testfunction for cut 8"
	/>
	<ToolBarItem 
		name="Cut9"
		icon={Content_cut}	
		onClick={() => {
			// Your custom logic here
			console.log('Button pressed!');
		}}
		description="This is a testfunction for cut 9"
	/>
</div>


<style>
	.tool-bar-style{
		font-size: 0; /* This removes the space between buttons*/ 
		margin-right: -2px;
		margin-bottom: 2px;
	}
	nav {
		height: 5em;
		background-color: slategrey;
		flex-shrink: 0;
	}
	#tools-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
		margin-bottom: 2px;
	}
	.collapsible {
		background-color: lightslategrey;
		float: right;
		position: relative;
		box-shadow: 0 3px 11px rgba(28, 28, 28, 0.55);
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-bottom: 0.4em;
		padding-top: 0.4em;
	}

	.collapsible:hover {
		background-color: slategrey;
	}
	
</style>