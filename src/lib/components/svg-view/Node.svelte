<script lang="ts">
	import type { Point } from "$lib/classes/draw";
	import { activeModel } from "$lib/globalState/activeModel";
	import DraggableSVG from "./DraggableSVG.svelte";

	export let position: Point;
	export let locationID: string;
	export let radius: number;

	function updatePos(_x: number, _y: number) {
		$activeModel.locations[locationID].position.x += _x;
		$activeModel.locations[locationID].position.y += _y;

		// Update the position of the active model
		activeModel.set($activeModel);
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
