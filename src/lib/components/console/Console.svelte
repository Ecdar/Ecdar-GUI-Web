<script lang="ts">
	import ConsoleLine from "./ConsoleLine.svelte";
	import { Tabs } from "$lib/classes/Tabs";
	import {
		Arrow_downward,
		Arrow_upward,
	} from "svelte-google-materialdesign-icons";

	let currentlyCollapsed: boolean = true;
	let currentTab: Tabs = Tabs.Frontend;
	let consoleContainer: HTMLElement;
	let consoleBar: HTMLElement;

	let frontEndErrors: string[] = [];
	let backEndErrors: string[] = [];

	const consoleInitialSize: string = "20em";
	let consoleExtendedSize: string = consoleInitialSize;
	let consoleCollapsedSize: string = "3.25em";
	let consoleSize = consoleCollapsedSize;

	let consoleButtonColorOff: string = "slategrey";
	let consoleButtonColorOn: string = "rgb(159, 174, 189)";

	/**
	 * Function for resizing the console
	 * @param event
	 */
	function resizeConsolePanel(event: PointerEvent) {
		event.preventDefault();
		consoleSize = (window.innerHeight - event.y).toString() + "px";
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

<div
	class="outerOverflow"
	style="height: {consoleSize};"
	bind:this={consoleContainer}
>
	<div bind:this={consoleBar}>
		<div
			role="button"
			id="consoleResizer"
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
				<Arrow_upward size="18" />
			{:else}
				<Arrow_downward size="18" />
			{/if}
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
	</div>
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
		height: 100%;
		overflow-y: scroll;
		min-height: 2.5em;
	}

	#consoleResizer {
		background-color: black;
		height: 0.3em;
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
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-bottom: 0.4em;
		padding-top: 0.4em;
		margin-top: 0.3em;
		margin-right: 0.5em;
	}

	.collapsible:hover {
		background-color: slategrey;
	}

	.outerOverflow {
		display: flex;
		margin: 0%;
		padding: 0%;
		flex-direction: column;
		background-color: slategrey;
		overflow: hidden;
	}

	.consoleTab {
		position: relative;
		height: 3.8em;
		margin: auto;
		padding: 0 1em;
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
