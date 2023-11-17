<script lang="ts">
	import { browser } from "$app/environment";
	import { afterUpdate, onDestroy } from "svelte";
	import { Point, type PointLike } from "$lib/classes/draw";
	import { PointElement } from "./PointElement";
	import {
		computePosition,
		shift,
		type ReferenceElement,
	} from "@floating-ui/dom";

	/**
	 * The anchor that the menu will align to.
	 */
	export let anchor: ReferenceElement = new PointElement(0, 0);

	/**
	 * Whether or not the context menu is being shown.
	 * You can use this to control and/or get the current state of the context menu.
	 */
	export let open: boolean = false;

	/**
	 * The id of the popover element. You can use this to set a `popovertarget` on a button.
	 *
	 * WARNING: This ID is not scoped, make sure it is unique!
	 */
	export let id: string | undefined = undefined;

	/**
	 * A boolean value defining whether or not the overlay menu should close when the opening button is pressed while it is already open.
	 */
	export let closeOnReopen: boolean = false;

	let overlayMenuPopover: HTMLElement | undefined;
	let overlayMenu: HTMLElement | undefined;

	/**
	 * The absolute position of the context menu.
	 * `anchor` sets the suggested position of the menu, but the real position might be different to make the menu more visible.
	 */
	let position: PointLike = new Point(0, 0);

	/**
	 * Used to unregister the event listeners that close the context menu. They should only be active when it is open.
	 */
	let closeListenersController: AbortController | undefined;

	$: updatePosition(anchor).then(
		() => {},
		() => {},
	); // Update the position when the anchor changes
	afterUpdate(() => updatePosition(anchor)); // Update the position when the contents of the menu changes

	/**
	 * Ensures that the real open state changes when the state of `open` changes
	 */
	$: if (overlayMenuPopover && open) {
		openContextMenu();
	} else {
		closeContextMenu();
	}

	/**
	 * Ensures that `open` changes when the real open state changes
	 */
	function updateOpenState(event: ToggleEvent) {
		open = Boolean(event.newState === "open");
	}

	/**
	 * Opens the context menu (Right-click menu)
	 */
	function openContextMenu() {
		if (!overlayMenuPopover) return;

		// Show the menu
		if (!overlayMenuPopover.matches(":popover-open"))
			overlayMenuPopover.showPopover();

		// Set up event listeners for closing the menu
		closeListenersController?.abort();
		closeListenersController = new AbortController();
		window.addEventListener("blur", () => (open = false), {
			passive: true,
			signal: closeListenersController.signal,
		});
		window.addEventListener(
			"click",
			(event) => {
				if (closeOnReopen) event.preventDefault();
				event.stopPropagation();
				open = false;
			},
			{
				signal: closeListenersController.signal,
			},
		);
		window.addEventListener(
			"keydown",
			(event) => {
				if (event.key === "Escape") {
					open = false;
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
		if (overlayMenuPopover?.matches(":popover-open")) {
			overlayMenuPopover.hidePopover();
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
	export async function updatePosition(anchor: ReferenceElement) {
		if (!browser || !overlayMenu) return;

		// API docs: https://floating-ui.com/docs/computePosition
		const newPosition = await computePosition(anchor, overlayMenu, {
			strategy: "absolute",
			placement: "bottom-start",
			middleware: [
				shift({
					mainAxis: true,
					crossAxis: true,
					padding: 10,
				}),
			],
		});

		// We only update the value if it has changed, because otherwise we trigger a full svelte update which triggers this function again
		if (position.x !== newPosition.x || position.y !== newPosition.y) {
			position = newPosition;
		}
	}
</script>

<div
	popover="manual"
	{id}
	class="overlay-menu-popover"
	bind:this={overlayMenuPopover}
	on:toggle={updateOpenState}
>
	<div
		class="overlay-menu"
		bind:this={overlayMenu}
		style:left={`${position.x}px`}
		style:top={`${position.y}px`}
	>
		<slot />
	</div>
</div>

<style>
	.overlay-menu-popover {
		border: none;
		background: none;
	}

	.overlay-menu {
		border: 0.1em #999 solid;
		background-color: #fff;
		border-radius: 0.75em;
		margin: 0;
		padding: 0.5em;

		position: fixed;
		display: flex;
		flex-direction: column;
		gap: 0.2em;

		/* We set these to ensure the `floating ui` placer can calculate the size of the element correctly */
		width: max-content;
		top: 0;
		left: 0;
	}
</style>
