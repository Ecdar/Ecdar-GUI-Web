<script lang="ts">
	import type { Point } from '$lib/classes/draw/point';
	import type { iNail } from '$lib/interfaces/iNail';
	import Nail from './Nail.svelte';

	export let sourcePoint: Point;
	export let targetPoint: Point;
	export let nails: iNail[];
	let points: Point[] = [];

	//Add the source and target points to the array
	points.push(sourcePoint);
	points.push(...nails.map((nail) => nail.position));
	points.push(targetPoint);

	console.log('Edge: ', sourcePoint, targetPoint);

	// logic that calculates the lines from the source to the target

	let lines: { from: Point; to: Point }[] = [];
	for (let i = 0; i < points.length - 1; i++) {
		lines.push({ from: points[i], to: points[i + 1] });
	}
</script>

<!--make lines update-->
{#each nails as nail}
	<Nail position={nail.position} locationID={nail.property.type} />
{/each}

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
