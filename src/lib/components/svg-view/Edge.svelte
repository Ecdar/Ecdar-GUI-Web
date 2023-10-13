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

	// Function to calculate x2
	function calculateX2(line: { from: Point; to: Point }): number {
		return (
			line.to.x -
			20 *
				Math.cos(
					Math.atan2(
						line.to.y - line.from.y,
						line.to.x - line.from.x,
					),
				)
		);
	}

	// Function to calculate y2
	function calculateY2(line: { from: Point; to: Point }): number {
		return (
			line.to.y -
			20 *
				Math.sin(
					Math.atan2(
						line.to.y - line.from.y,
						line.to.x - line.from.x,
					),
				)
		);
	}
</script>

<!-- Lines -->
{#each lines as line, index}
	<line
		x1={line.from.x}
		y1={line.from.y}
		x2={index === lines.length - 1 ? calculateX2(line) : line.to.x}
		y2={index === lines.length - 1 ? calculateY2(line) : line.to.y}
		stroke="black"
		stroke-width="2"
		marker-end={index === lines.length - 1 ? "url(#arrowhead)" : ""}
	/>
{/each}

<!-- Arrowhead Marker -->
<defs>
	<marker
		id="arrowhead"
		viewBox="0 0 10 10"
		refX="10"
		refY="5"
		markerWidth="6"
		markerHeight="6"
		orient="auto-start-reverse"
	>
		<path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
	</marker>
</defs>

<!-- Nails -->
{#each nails as nail}
	<Nail position={nail.position} text=":" />
{/each}
