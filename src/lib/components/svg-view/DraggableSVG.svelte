<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import { activeModel } from "$lib/globalState/activeModel";
	import { scale } from "$lib/globalState/scaleStore";

	export let position: iPoint;

	//Sets up eventlisteners when the mouse is pressed down on the svg
	function onMouseDown() {
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}

	//Updates the position of the svg
	function onMouseMove(event: MouseEvent) {
		position.x += event.movementX / $scale;
		position.y += event.movementY / $scale;

		// Update the active model
		activeModel.set($activeModel);
	}

	//Removes the eventlisteners when the mouse is released
	function onMouseUp() {
		window.removeEventListener("mousemove", onMouseMove);
		window.removeEventListener("mouseup", onMouseUp);
	}
</script>

<!-- The svg element that is draggable -->
<g on:mousedown={onMouseDown} role="none" class="draggable panzoom-exclude">
	<slot />
</g>
