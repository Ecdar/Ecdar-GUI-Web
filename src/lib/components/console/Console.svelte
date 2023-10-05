<script lang="ts">
	import ConsoleLine from './ConsoleLine.svelte';
	export let consoleSize: number;
	
	enum Tabs {
		Frontend,
		Backend
	}
	
	let consoleCollapsableText: string = '↑';
	let currentTab: Tabs = Tabs.Frontend;

	/**
	*Function for changing between the status of the console
	*/
	function changeConsoleCollapsableTextAndHeight() {
		if (consoleCollapsableText == '↑') {
			consoleCollapsableText = '↓';
			consoleSize = 17;
		} else {
			consoleCollapsableText = '↑';
			consoleSize = 3.25;
		}
	}

	/**
	*Function for changing the current tab of the console
	*@param tab
	*/
	function changeTab(tab:Tabs){
		currentTab = tab;
	}
</script>

<div class="outerOverflow">
	<button type="button" class="collapsible" on:click={changeConsoleCollapsableTextAndHeight}>
		{consoleCollapsableText}
	</button>

	<button type="button" class="consoleTab frontEndButton" on:click={() => { changeTab(Tabs.Frontend) }}
		>Frontend</button
	>
	<button type="button" class="consoleTab" on:click={() => {changeTab(Tabs.Backend)}}>Backend</button>
	<div class="console">
		{#if currentTab == Tabs.Frontend}
			<ConsoleLine componentText="Frontend Errors!" />
		{:else if currentTab == Tabs.Backend}
			{#each { length: 50 } as _, i}
				<ConsoleLine componentText="Backend Error" />
			{/each}
		{/if}
	</div>
</div>

<style>
	.console {
		background-color: rgb(159, 174, 189);
		width: 100%;
		height: 70%;
		overflow-y: scroll;
		overflow-wrap: break-word;
	}

	.console::-webkit-scrollbar {
		width: 1rem;
	}

	.console::-webkit-scrollbar-track {
		box-shadow: inset 0 0 1em grey;
		background: lightslategray;
	}

	.console::-webkit-scrollbar-thumb {
		background: rgb(48, 54, 61);
	}

	.console::-webkit-scrollbar-thumb:hover {
		background: rgb(33, 37, 42);
	}

	.collapsible {
		background-color: lightslategrey;
		float: right;
		position: relative;
		box-shadow: 0 3px 11px rgba(28, 28, 28, 0.55);
		padding-left: 1em;
		padding-right: 1em;
		padding-bottom: 0.75em;
		padding-top: 0.75em;
		margin-top: 0.3em;
		margin-right: 0.5em;
	}

	.collapsible:hover {
		background-color: slategrey;
	}

	.outerOverflow {
		margin: 0%;
		padding: 0%;
		height: 100%;
	}

	.consoleTab {
		background-color: slategrey;
		position: relative;
		height: 3.8em;
		margin: auto;
		border-top: 0em;
		border-bottom: 0em;
		border-style: solid;
		float: left;
	}

	.consoleTab:hover {
		background-color: lightslategrey;
	}

	.frontEndButton {
		border-left: 0;
		border-right: 0;
	}
</style>
