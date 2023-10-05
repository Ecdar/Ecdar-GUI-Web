

<script lang="ts">
	import DraggableSVG from "./DraggableSVG.svelte";
	import type { Point } from "$lib/classes/draw";

	export let position: Point;
	export let locationID: string;
	export let radius: number;

	$: position;
	$: locationID;
	$: radius;

	function updatePos(_x: number, _y:number){		
		position.x += _x;
		position.y += _y;
		console.log(position);
	}
</script>

<DraggableSVG updatePost={updatePos}>
		<g id="CircleGroup" >
			<circle cx={position.x} cy={position.y} r={radius} fill="gray" role='none'/>
			<text x={position.x} y={position.y} text-anchor="middle" role='none'>{locationID}</text>
		</g>
</DraggableSVG>


