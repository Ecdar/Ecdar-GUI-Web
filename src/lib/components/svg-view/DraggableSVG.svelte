<script lang="ts">
	export let updatePos: Function;

	//Sets up eventlisteners when the mouse is pressed down on the svg
	function onMouseDown() {
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	//Updates the position of the svg
	function onMouseMove(e: MouseEvent) {
		updatePos(e.movementX, e.movementY);
	}

	//Removes the eventlisteners when the mouse is released
	function onMouseUp() {
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	}
</script>

<!-- The svg element that is draggable -->
<svg on:mousedown={onMouseDown} role="none" class="draggable">
	<slot />
</svg>
