<script lang="ts">
	import DraggableSvg from "./DraggableSVG.svelte";
	import type { Point } from "$lib/classes/draw";

	export let parentPosition: Point;
	export let position: Point;
	export let text: string;
</script>

<DraggableSvg bind:position>
	<!-- line from parent to text label-->
	<line
		x1={parentPosition.x}
		y1={parentPosition.y}
		x2={position.x}
		y2={position.y}
		stroke="black"
		stroke-width="2"
	/>

	<!-- text label background -->
	<rect
		x={position.x - 10}
		y={position.y - 10}
		width={text.length * 10}
		height="20"
		fill="gray"
		stroke-width="2"
	/>

	<!-- text label -->
	<text x={position.x} y={position.y} text-anchor="middle" role="none">
		{text}
	</text>
</DraggableSvg>
