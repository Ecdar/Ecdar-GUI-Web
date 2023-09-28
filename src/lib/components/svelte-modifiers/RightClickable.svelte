<!--
	Modifier for making svelte components right clickable
-->
<script lang="ts">
	import ContextMenu from './rightClickableComponents/ContextMenu.svelte';
	import type { ContextMenuItem } from './rightClickableComponents/contextMenuItem';
	import type { Point } from '$lib/classes/draw/point';

	export let menuItems: ContextMenuItem[];
	let showContextMenu = false;
	let contextMenuPosition: Point = { x: 0, y: 0 };
	let originalRightClickable: HTMLElement;

	/**
	 * Function for opening the context menu (Right-click menu)
	 * @param event
	 */
	function openContextMenu(event: MouseEvent) {
		event.preventDefault();

		// Setting the right clicked element on which the context menu is opened
		originalRightClickable = event.target as HTMLElement;

		// Prevent context menus opening on themselves
		if (showContextMenu) {
			showContextMenu = false;
			return;
		}

		showContextMenu = true;
		contextMenuPosition.x = event.clientX;
		contextMenuPosition.y = event.clientY;
	}

	/**
	 * Function for closing the context menu (Right-click menu)
	 */
	function closeContextMenu() {
		showContextMenu = false;
	}
</script>

<div
	on:contextmenu={openContextMenu}
	on:click={closeContextMenu}
	on:keydown={closeContextMenu}
	on:mouseleave={closeContextMenu}
	role="button"
	tabindex="-1"
>
	{#if showContextMenu}
		<ContextMenu
			{menuItems}
			{originalRightClickable}
			style={`position: absolute; left: ${contextMenuPosition.x}px; top: ${contextMenuPosition.y}px;`}
		/>
	{/if}

	<!-- Right clickable content is slotted here -->
	<slot />
</div>

<!-- 
	Style specifying that that right clickable content should not be selectable. 
	To make content selectable anyways the following style could be applied on the selectable content:
	-webkit-user-select: text !important; user-select: text !important;
	
	Usage example:
		<RightClickable menuItems={listOfMenuItems}>
			<h1 style="-webkit-user-select: text !important; user-select: text !important;">Selectable content</h1>
		</RightClickable>
-->
<style>
	* {
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
