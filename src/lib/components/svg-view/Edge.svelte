<script lang="ts">
	import type { Point } from "$lib/classes/draw/Point";
	import type { iNail } from "$lib/interfaces/iNail";
	import Nail from "./Nail.svelte";

	export let sourcePoint: Point;
	export let targetPoint: Point;
	export let nails: iNail[];
	let points: Point[] = [];

	//Add the source and target points to the array
	$: points = [
		sourcePoint,
		...nails.map((nail) => nail.position),
		targetPoint,
	];

	// logic that calculates the lines from the source to the target
	let lines: { from: Point; to: Point }[] = [];
	$: updateLines(points);
	function updateLines(_points: Point[]) {
		lines = [];
		for (let i = 0; i < _points.length - 1; i++) {
			lines.push({ from: _points[i], to: _points[i + 1] });
		}
	}
</script>

<!--make lines update-->
{#each lines as line}
	<line
		x1={line.from.x}
		y1={line.from.y}
		x2={line.to.x}
		y2={line.to.y}
		stroke="black"
		stroke-width="2"
	/>
{/each}

{#each nails as nail}
	<Nail position={nail.position} text="nail" />
{/each}
