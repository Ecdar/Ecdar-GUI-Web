<script lang="ts">
	import DraggableSVG from './DraggableSVG.svelte';

	export let x: number;
	export let y: number;
	export let locationID: string;
	export let radius: number;

	function updatePos(_x: number, _y: number) {
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
