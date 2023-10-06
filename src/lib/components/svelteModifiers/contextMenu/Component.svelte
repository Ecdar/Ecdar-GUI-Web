<script lang="ts">
	import { browser } from "$app/environment";
	import { afterUpdate, onDestroy } from "svelte";
	import { menuItems, position, open } from "./state";
	import { Point, type PointLike } from "$lib/classes/draw";
	import { PositionElement } from "./MouseElement";
	import { computePosition, shift } from "@floating-ui/dom";

	let contextMenuPopover: HTMLElement;
	let contextMenu: HTMLElement;

	/**
	 * The absolute position of the context menu.
	 * The `position` store is the suggested position of the menu, but the real (adjusted) position might be different to make the menu more visible.
	 */
	let adjustedPosition: PointLike = new Point(0, 0);

	/**
	 * Used to unregister the event listeners that close the context menu. They should only be active when it is open.
	 */
	let closeListenersController: AbortController;

	$: updatePosition($position); // Update the adjusted position when the `position` store changes
	afterUpdate(() => updatePosition($position)); // Update the adjusted position when the contents of the menu changes

	/**
	 * Ensures that the real open state changes when the state of the `open` store changes
	 */
	$: if ($open) {
		openContextMenu();
	} else {
		closeContextMenu();
	}

	/**
	 * Ensures that the `open` store state changes when the real open state changes
	 */
	function updateOpenState(event: ToggleEvent) {
		$open = Boolean(event.newState === "open");
	}

	/**
	 * Opens the context menu (Right-click menu)
	 */
	async function openContextMenu() {
		if (!contextMenuPopover) return;

		// Show the menu
		if (!contextMenuPopover.matches(":popover-open"))
			contextMenuPopover.showPopover();

		// Set up event listeners for closing the menu
		closeListenersController?.abort();
		closeListenersController = new AbortController();
		window.addEventListener("blur", () => ($open = false), {
			// disable this one to make debugging a lot easier
			passive: true,
			signal: closeListenersController.signal,
		});
		window.addEventListener("click", () => ($open = false), {
			passive: true,
			signal: closeListenersController.signal,
		});
		window.addEventListener(
			"keydown",
			(event) => {
				if (event.key === "Escape") {
					$open = false;
				}
			},
			{
				passive: true,
				signal: closeListenersController.signal,
			},
		);
	}

	/**
	 * Closes the context menu (Right-click menu)
	 */
	function closeContextMenu() {
		if (contextMenuPopover?.matches(":popover-open")) {
			contextMenuPopover.hidePopover();
		}
		closeListenersController?.abort();
	}

	onDestroy(() => {
		closeListenersController?.abort();
	});

	/**
	 * Determines the optimal position for the context menu.
	 * In cases where some of the context menu would be shown outside of the window, it will be moved inwards until it is fully visible.
	 *
	 * Ideally this should be replaced with CSS anchors in the future.
	 * Unfortunately, the spec is not supported in any browsers yet: https://www.w3.org/TR/css-anchor-position-1/
	 */
	export async function updatePosition(mousePoint: PointLike) {
		if (!browser || !contextMenu) return;

		// API docs: https://floating-ui.com/docs/computePosition
		const newPosition = await computePosition(
			new PositionElement(mousePoint),
			contextMenu,
			{
				strategy: "absolute",
				placement: "bottom-start",
				middleware: [
					shift({
						mainAxis: true,
						crossAxis: true,
						padding: 10,
					}),
				],
			},
		);

		// We only update the value if it has changed, because otherwise we trigger a full svelte update which triggers this function again
		if (
			adjustedPosition.x !== newPosition.x ||
			adjustedPosition.y !== newPosition.y
		) {
			adjustedPosition = newPosition;
		}
	}
</script>

<div
	popover="manual"
	id="context-menu-popover"
	bind:this={contextMenuPopover}
	on:toggle={updateOpenState}
>
	<div
		id="context-menu"
		bind:this={contextMenu}
		style:left={`${adjustedPosition.x}px`}
		style:top={`${adjustedPosition.y}px`}
	>
		{#each $menuItems as item}
			{#if item.isHorizontalRule}
				<hr />
			{:else}
				<!-- Context Menu Button -->
				<button
					on:click={() => {
						item.onClick();
					}}
					class={item.cssClass}
				>
					<!-- Setting the content of the context menu item. svelte:component is used to dynamically reference the icon -->
					<svelte:component
						this={item.icon}
						ariaLabel=""
						class="icon"
					/>
					<p>{item.displayText}</p>
				</button>
			{/if}
		{/each}
	</div>
</div>

<!--
	Styling for the context menu and classed for different types of buttons
-->
<style>
	#context-menu-popover {
		border: none;
		background: none;
	}

	/* Styling for the context menu */
	#context-menu {
		border: 0.1em #999 solid;
		background-color: #fff;
		border-radius: 0.75em;
		margin: 0;
		padding: 0.2em;

		position: fixed;
		display: flex;
		flex-direction: column;
		gap: 0.2em;

		/* We set these to ensure the `floating ui` placer can calculate the size of the element correctly */
		width: max-content;
		top: 0;
		left: 0;
	}

	/* Icon styling */
	.icon {
		padding: 0.5em;
	}

	/* Context menu button styling */
	button {
		border: 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		height: 2em;
		border-radius: 0.5em;
		width: 100%;
	}

	button:hover {
		background-color: #eee;
	}

	/* Danger button color */
	button.danger {
		background-color: #f30000;
	}

	button.danger:hover {
		background-color: #e30000;
	}

	/* Warning button color */
	button.warning {
		background-color: yellow;
	}

	button.warning:hover {
		background-color: rgb(255, 225, 0);
	}

	/* Success button color */
	button.success {
		background-color: rgb(0, 165, 0);
	}

	button.success:hover {
		background-color: rgb(0, 137, 0);
	}

	button p {
		padding: 0 0.5em;
		font-size: 1em;
	}

	/* Horizontal rule (Context menu line splitter) */
	hr {
		border: none;
		border-bottom: 0.1em solid #ccc;
		margin: 0.25em 0;
	}
</style>
