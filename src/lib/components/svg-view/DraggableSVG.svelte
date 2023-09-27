<script lang="ts">

	export let updatePost: Function
	export let offsetX = 0;
	export let offsetY = 0;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			offsetX += e.movementX;
			offsetY += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
        
		updatePost(offsetX, offsetY)

        offsetX = 0;
        offsetY = 0;
	}
	
</script>

<svg on:mousedown={onMouseDown} role='none' x={offsetX} y={offsetY} class="draggable">
	<slot></slot>
</svg>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
