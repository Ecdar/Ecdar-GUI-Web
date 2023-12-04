<script lang="ts">
	import DraggableSvg from "./DraggableSVG.svelte";
	import type { iPoint } from "$lib/interfaces/iPoint";

	export let parentPosition: iPoint;
	export let position: iPoint;
	export let text: string;

	const centerOffset = 5;
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
	<text
		x={position.x}
		y={position.y + centerOffset}
		text-anchor="middle"
		role="none"
	>
		{text}
	</text>
</DraggableSvg>

<style>
	line {
		stroke: gray;
		stroke-width: 2;
	}
</style>
