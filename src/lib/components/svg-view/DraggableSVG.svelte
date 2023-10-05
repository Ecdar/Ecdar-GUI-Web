<script lang="ts">
	export let updatePos: Function;

	function onMouseDown() {
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function onMouseMove(e: MouseEvent) {
		updatePos(e.movementX, e.movementY);
	}

	function onMouseUp() {
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	}
</script>

<svg on:mousedown={onMouseDown} role="none" class="draggable">
	<slot />
</svg>
