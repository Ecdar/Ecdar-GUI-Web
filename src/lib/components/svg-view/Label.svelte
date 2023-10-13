<script lang="ts">
	import DraggableSvg from "./DraggableSVG.svelte";
	import type { Point } from "$lib/classes/draw";

	export let parentPosition: Point;
	export let position: Point;
	export let text: string;
</script>

<DraggableSvg bind:position>
	<!-- line from parrent to text label, make dotted-->
	<line
		stroke-dasharray="5,5"
		d="M5 20 l215 0"
		x1={parentPosition.x}
		y1={parentPosition.y}
		x2={position.x}
		y2={position.y}
		stroke="gray"
		stroke-width="2"
	/>

	<!-- text label background -->
	<rect
		x={position.x - text.length * 5}
		y={position.y - 10}
		width={text.length * 10}
		height="20"
		fill="darkgray"
		text-anchor="middle"
		stroke-width="2"
	/>

	<!-- text label -->
	<text x={position.x} y={position.y + 5} text-anchor="middle" role="none">
		{text}
	</text>
</DraggableSvg>
