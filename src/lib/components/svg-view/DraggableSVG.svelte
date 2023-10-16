<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import { activeModel } from "$lib/globalState/activeModel";

	export let position: iPoint;

	//Sets up eventlisteners when the mouse is pressed down on the svg
	function onMouseDown() {
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}

	//Updates the position of the svg
	function onMouseMove(e: MouseEvent) {
		position.x += e.movementX;
		position.y += e.movementY;

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
<svg on:mousedown={onMouseDown} role="none" class="draggable">
	<slot />
</svg>
