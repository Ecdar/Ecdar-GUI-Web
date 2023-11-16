<script lang="ts">
	import ConsoleLine from "./ConsoleLine.svelte";
	import { Tabs } from "$lib/classes/Tabs";
	import {
		Arrow_downward,
		Arrow_upward,
	} from "svelte-google-materialdesign-icons";
	import { Console } from "$lib/classes/console/Console";

	let currentlyCollapsed: boolean = true;
	let currentTab: Tabs = Tabs.Frontend;
	let consoleContainer: HTMLElement;
	let consoleBar: HTMLElement;

	const consoleInitialSize: number = 300;
	let consoleExtendedSize: number = consoleInitialSize;
	let consoleCollapsedSize: number = 0;
	let consoleSize = consoleCollapsedSize;

	let consoleButtonColorOff: string = "var(--console-unselectedtab-color)";
	let consoleButtonColorOn: string = "var(--console-selectedtab-color)";

	/**
	 * Function for resizing the console
	 * @param event
	 */
	function resizeConsolePanel(event: PointerEvent) {
		event.preventDefault();
		consoleSize = window.innerHeight - event.y - consoleBar.offsetHeight;
		if (window.innerHeight - event.y < consoleBar.clientHeight) {
			consoleSize = consoleInitialSize;
			stopResizingConsolePanel(event);
			changeConsoleCollapsableTextAndHeight();
		}
	}

	/**
	 * Function for starting resizing the console
	 * @param event
	 */
	function startResizingConsolePanel(event: PointerEvent) {
		event.preventDefault();
		if (currentlyCollapsed) return;
		consoleContainer.setPointerCapture(event.pointerId);
		consoleContainer.addEventListener("pointermove", resizeConsolePanel);
		consoleContainer.addEventListener(
			"pointerup",
			stopResizingConsolePanel,
		);
		consoleContainer.addEventListener(
			"pointercancel",
			stopResizingConsolePanel,
		);
	}

	/**
	 * Function for stopping resizing the console
	 * @param event
	 */
	function stopResizingConsolePanel(event: PointerEvent) {
		consoleContainer.releasePointerCapture(event.pointerId);
		consoleContainer.removeEventListener("pointermove", resizeConsolePanel);
		consoleContainer.removeEventListener(
			"pointerup",
			stopResizingConsolePanel,
		);
		consoleContainer.removeEventListener(
			"pointercancel",
			stopResizingConsolePanel,
		);
		consoleExtendedSize = consoleSize;
	}

	/**
	 *Function for changing between the status of the console
	 */
	function changeConsoleCollapsableTextAndHeight() {
		if (currentlyCollapsed) {
			consoleSize = consoleExtendedSize;
			currentlyCollapsed = false;
		} else {
			consoleSize = consoleCollapsedSize;
			currentlyCollapsed = true;
		}
	}

	/**
	 *Function for changing the current tab of the console
	 *@param tab
	 */
	function changeTab(tab: Tabs) {
		currentTab = tab;
	}

	let frontendConsole = Console.frontendConsoleLines;
	let backendConsole = Console.backendConsoleLines;
</script>

<div class="outer-overflow" bind:this={consoleContainer}>
	<div bind:this={consoleBar} id="console-bar">
		<div
			role="button"
			id="console-resizer"
			class="resizer"
			tabindex="-1"
			on:pointerdown={(event) => {
				startResizingConsolePanel(event);
			}}
			style="cursor: {currentlyCollapsed ? 'auto' : 'row-resize'};"
		/>
		<button
			type="button"
			class="collapsible unselectable"
			on:click={changeConsoleCollapsableTextAndHeight}
		>
			{#if currentlyCollapsed}
				<Arrow_upward size="18" color="white" />
			{:else}
				<Arrow_downward size="18" color="white" />
			{/if}
		</button>

		<button
			type="button"
			class="console-tab front-end-button unselectable"
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
			class="console-tab unselectable"
			style="background-color: {currentTab == Tabs.Backend
				? consoleButtonColorOn
				: consoleButtonColorOff};"
			on:click={() => {
				changeTab(Tabs.Backend);
			}}
		>
			Backend
		</button>
	</div>
	<div class="console" style="height: {consoleSize}px;">
		{#if currentTab == Tabs.Frontend}
			{#each $frontendConsole as error}
				<ConsoleLine componentText={error} />
			{/each}
		{:else if currentTab == Tabs.Backend}
			{#each $backendConsole as error}
				<ConsoleLine componentText={error} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.console {
		background-color: var(--background-color);
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}

	#console-bar {
		min-height: 2.5em;
	}

	#console-resizer {
		background-color: black;
		height: 0.2em;
	}

	.console::-webkit-scrollbar {
		width: 1rem;
	}

	.console::-webkit-scrollbar-track {
		box-shadow: inset 0 0 1em grey;
		background: var(--sidebar-background-color);
	}

	.console::-webkit-scrollbar-thumb {
		background: var(--console-scrollbar-thumb-color);
	}

	.console::-webkit-scrollbar-thumb:hover {
		background: var(--console-scrollbar-thumbhover-color);
	}

	.collapsible {
		background-color: var(--console-topbar-background-color);
		float: right;
		position: relative;
		box-shadow: 0 3px 11px rgba(28, 28, 28, 0.55);
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-bottom: 0.4em;
		padding-top: 0.4em;
		margin-top: 0.3em;
		margin-right: 0.5em;
	}

	.collapsible:hover {
		background-color: var(--console-selectedtab-color);
	}

	.outer-overflow {
		display: flex;
		margin: 0%;
		padding: 0%;
		flex-direction: column;
		background-color: var(--console-topbar-background-color);
		overflow: hidden;
	}

	.console-tab {
		color: var(--navigationbar-text-color);
		position: relative;
		height: 3.8em;
		margin: auto;
		padding: 0 1em;
		border-top: 0em;
		border-bottom: 0em;
		border-style: solid;
		float: left;
	}

	.console-tab:hover {
		background-color: var(--console-tab-hover-color) !important;
	}

	.front-end-button {
		border-left: 0;
		border-right: 0;
	}
	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
