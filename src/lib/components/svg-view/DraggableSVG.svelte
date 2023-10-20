<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import { activeModel } from "$lib/globalState/activeModel";
	import { scale } from "$lib/globalState/scaleStore";

	export let position: iPoint;

	let controller: AbortController;
	let signal: AbortSignal;

	//Sets up eventlisteners when the mouse is pressed down on the svg
	function onPointerDown() {
		controller = new AbortController();
		signal = controller.signal;
		window.addEventListener("pointermove", onPointerMove, { signal });
		window.addEventListener("pointerup", onPointerUp, { signal });
	}

	//Updates the position of the svg
	function onPointerMove(event: PointerEvent) {
		position.x += event.movementX / $scale;
		position.y += event.movementY / $scale;

		// Update the active model
		activeModel.set($activeModel);
	}

	//Removes the eventlisteners when the mouse is released using abortcontroller
	function onPointerUp() {
		controller.abort();
	}
</script>

<!-- The svg element that is draggable -->
<g on:pointerdown={onPointerDown} role="none" class="draggable panzoom-exclude">
	<slot />
</g>
