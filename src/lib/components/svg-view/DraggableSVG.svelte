<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import { activeView } from "$lib/globalState/activeProject";
	import { scale } from "$lib/globalState/scaleStore";

	export let position: iPoint;

	let element: SVGElement;
	let controller: AbortController;
	let signal: AbortSignal;

	/**
	 * Function for setting up event listeners when the mouse is pressed down on the svg
	 * @param event
	 */
	function onPointerDown(event: PointerEvent) {
		controller = new AbortController();
		signal = controller.signal;

		event.preventDefault();
		event.stopPropagation();

		element.setPointerCapture(event.pointerId);
		element.addEventListener("pointermove", onPointerMove, { signal });
		element.addEventListener("pointerup", onPointerUp, { signal });
		element.addEventListener("pointercancel", onPointerUp, { signal });
	}

	/**
	 * Function for updating the position of the svg
	 * @param event
	 */
	function onPointerMove(event: PointerEvent) {
		position.x += event.movementX / $scale;
		position.y += event.movementY / $scale;

		// Update the active view partially
		activeView.fastUpdate();
	}

	/**
	 * Function for removing the event listeners when the mouse is released using AbortController
	 * @param event
	 */
	function onPointerUp(event: PointerEvent) {
		element.releasePointerCapture(event.pointerId);
		controller.abort();

		// Update the active view properly
		$activeView = $activeView;
	}
</script>

<!-- The svg element that is draggable -->
<g
	bind:this={element}
	on:pointerdown={(event) => {
		onPointerDown(event);
	}}
	role="none"
	class="draggable panzoom-exclude"
>
	<slot />
</g>
