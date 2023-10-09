<script lang="ts">
	import type { Point } from "$lib/classes/draw";
	import DraggableSVG from "./DraggableSVG.svelte";

	export let position: Point;
	export let locationID: string | null;
	export let radius: number;
</script>

<DraggableSVG bind:position>
	<circle
		cx={position.x}
		cy={position.y}
		r={radius}
		fill="gray"
		role="none"
	/>
	<text x={position.x} y={position.y} text-anchor="middle" role="none"
		>{locationID ?? "Nail"}</text
	>
</DraggableSVG>
