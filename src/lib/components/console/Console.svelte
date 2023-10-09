<script lang="ts">
	import ConsoleLine from "./ConsoleLine.svelte";
	import { Tabs } from "$lib/classes/Tabs";

	let consoleCollapsableText: string = "↑";
	let currentTab: Tabs = Tabs.Frontend;

	let frontEndErrors: string[] = [];
	let backEndErrors: string[] = [];

	let consoleExtendedSize: string = "100%";
	let consoleCollapsedSize: string = "3.25em";
	$: consoleSize = consoleCollapsedSize;

	let consoleButtonColorOff: string = "slategrey";
	let consoleButtonColorOn: string = "rgb(159, 174, 189)";

	/**
	 *Function for changing between the status of the console
	 */
	function changeConsoleCollapsableTextAndHeight() {
		if (consoleCollapsableText == "↑") {
			consoleCollapsableText = "↓";
			consoleSize = consoleExtendedSize;
		} else {
			consoleCollapsableText = "↑";
			consoleSize = consoleCollapsedSize;
		}
	}

	/**
	 *Function for changing the current tab of the console
	 *@param tab
	 */
	function changeTab(tab: Tabs) {
		currentTab = tab;
	}

	/**
	 *Function for sending an error to a specific tab in the console
	 *@param error
	 *@param tab
	 */
	export function sendErrorToTab(error: string, tab: Tabs) {
		switch (tab) {
			case Tabs.Frontend:
				frontEndErrors.push(error);
				frontEndErrors = frontEndErrors;
				break;
			case Tabs.Backend:
				backEndErrors.push(error);
				backEndErrors = backEndErrors;
				break;
			case Tabs.All:
				frontEndErrors.push(error);
				backEndErrors.push(error);
				frontEndErrors = frontEndErrors;
				break;
			default:
				break;
		}
	}
</script>

<div class="outerOverflow" style="height: {consoleSize};">
	<button
		type="button"
		class="collapsible unselectable"
		on:click={changeConsoleCollapsableTextAndHeight}
	>
		{consoleCollapsableText}
	</button>

	<button
		type="button"
		class="consoleTab frontEndButton unselectable"
		style="background-color: {currentTab == Tabs.Frontend
			? consoleButtonColorOn
			: consoleButtonColorOff}"
		on:click={() => {
			changeTab(Tabs.Frontend);
		}}
	>
		Frontend
	</button>
	<button
		type="button"
		class="consoleTab unselectable"
		style="background-color: {currentTab == Tabs.Backend
			? consoleButtonColorOn
			: consoleButtonColorOff};"
		on:click={() => {
			changeTab(Tabs.Backend);
		}}
	>
		Backend
	</button>
	<div class="console">
		{#if currentTab == Tabs.Frontend}
			{#each frontEndErrors as error}
				<ConsoleLine componentText={error} />
			{/each}
		{:else if currentTab == Tabs.Backend}
			{#each backEndErrors as error}
				<ConsoleLine componentText={error} />
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
		min-height: 5em;
		max-height: 15em;
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
	}

	.consoleTab {
		position: relative;
		height: 3.8em;
		margin: auto;
		border-top: 0em;
		border-bottom: 0em;
		border-style: solid;
		float: left;
	}

	.consoleTab:hover {
		filter: brightness(0.9);
	}

	.frontEndButton {
		border-left: 0;
		border-right: 0;
	}
	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
