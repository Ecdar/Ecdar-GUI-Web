<script lang="ts">
	import DraggableSVG from './DraggableSVG.svelte';
	import type Location from './Location.svelte';
	import type Nail from './Nail.svelte';

	export let x: number;
	export let y: number;
	export let locationID: string;
	export let radius: number;

	$: locationID;
	$: radius;

	function updatePos(_x: number, _y: number) {
		console.log('updatePos');

		x += _x;
		y += _y;
	}
</script>

<DraggableSVG {updatePos}>
	<g id="CircleGroup">
		<circle cx={x} cy={y} r={radius} fill="gray" role="none" />
		<text {x} {y} text-anchor="middle" role="none">{locationID}</text>
	</g>
</DraggableSVG>
