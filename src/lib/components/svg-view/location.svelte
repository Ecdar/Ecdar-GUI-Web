<svelte/>

<script lang="ts">
	import DraggableSVG from "./DraggableSVG.svelte";

	export let x: number;
	export let y: number;
	export let locationID: string;

	$: locationID;
	$: x;
	$: y;

	function updatePos(_x: number, _y:number){		
		x += _x;
		y += _y;
	}
</script>

<DraggableSVG updatePost={updatePos}>
		<g id="CircleGroup" >
			<circle cx={x} cy={y} r="20" fill="gray" role='none'/>
			<text x={x} y={y} text-anchor="middle" role='none'>{locationID}</text>
		</g>
</DraggableSVG>


