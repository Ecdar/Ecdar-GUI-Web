<script lang="ts">

	export let updatePost: Function
	export let offsetX = 0;
	export let offsetY = 0;
	
	
	function onMouseDown() {
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}
	
	function onMouseMove(e: MouseEvent) {
		offsetX += e.movementX;
		offsetY += e.movementY;
	}
	
	function onMouseUp() {
		updatePost(offsetX, offsetY)

        offsetX = 0;
        offsetY = 0;
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	}
	
</script>

<svg on:mousedown={onMouseDown} role='none' x={offsetX} y={offsetY} class="draggable">
	<slot></slot>
</svg>

