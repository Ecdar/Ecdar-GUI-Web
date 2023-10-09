<script lang="ts">
	import type { Point } from "$lib/classes/draw";
	import { activeModel } from "$lib/globalState/activeModel";
	import DraggableSVG from "./DraggableSVG.svelte";

	export let position: Point;
	export let locationID: string;
	export let radius: number;

	function updatePos(_x: number, _y: number) {
		position.x += _x;
		position.y += _y;

		// Update the position of the location in the active model
		$activeModel.locations[locationID].position = position;
	}
</script>

<DraggableSVG {updatePos}>
	<g id="CircleGroup">
		<circle
			cx={position.x}
			cy={position.y}
			r={radius}
			fill="gray"
			role="none"
		/>
		<text x={position.x} y={position.y} text-anchor="middle" role="none"
			>{locationID}</text
		>
	</g>
</DraggableSVG>
