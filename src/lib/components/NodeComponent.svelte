<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

	// Width and Height properties
	export let width:string = "25rem";
	export let height:string = "25rem";
	export let contain_intrinsic_size:string = "25rem";
	export let left:number = 100;
	export let top:number = 100;

	let moving:boolean = false;
	
	function onMouseDown() {
		moving = true;
		console.log(moving);
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			console.log("moving");
			left = e.pageX;
			top = e.pageY;
		}
	}
	
	function onMouseUp() {
		moving = false;
		console.log(moving);
	}
</script>

<style>
	.circle {
		color: blue;
		background-color: blue;
		border-radius: 50%;
		user-select: none;
		cursor: move;
		border: solid 1px darkblue;
		position: absolute;
		display: flexbox;
		place-items: center;
		content-visibility: auto;
	}
</style>

<section on:mousedown={onMouseDown}
		class="circle"
		style="left: {left}px; top: {top}px;"
		style:width={width}
		style:height={height}
		style:contain-intrinsic-size={contain_intrinsic_size}
		draggable="true">
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
