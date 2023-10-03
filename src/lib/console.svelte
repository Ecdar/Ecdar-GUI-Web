<script lang="ts">
	enum Tabs {
		Frontend,
		Backend
	}
	let consoleCollapsableText: string = '↑';
	let currentTab: Tabs = Tabs.Frontend;

	import ConsoleLine from './consoleLine.svelte';

	export let value: number;

	function changeConsoleCollapsableTextAndHeight() {
		if (consoleCollapsableText == '↑') {
			consoleCollapsableText = '↓';
			value = 17;
		} else {
			consoleCollapsableText = '↑';
			value = 3.25;
		}
	}
	function changeTabToFrontend() {
		currentTab = Tabs.Frontend;
	}

	function changeTabToBackend() {
		currentTab = Tabs.Backend;
	}
</script>

<div class="outerOverflow">
	<button type="button" class="collapsible" on:click={changeConsoleCollapsableTextAndHeight}>
		{consoleCollapsableText}
	</button>
	<button type="button" class="consoleTab" on:click={changeTabToFrontend}> Frontend </button>
	<button type="button" class="consoleTab" on:click={changeTabToBackend}> Backend </button>
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
		height: 12em;
		overflow-y: scroll;
		overflow-wrap: break-word;
		box-shadow: inset 0 0 1em grey;
		margin-top: 1em;
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
		left: 98%;
		position: relative;
		box-shadow: 0 3px 11px rgba(28, 28, 28, 0.55);
	}

	.collapsible:hover {
		background-color: slategrey;
	}

	.outerOverflow {
		margin-top: 1em;
	}
</style>
