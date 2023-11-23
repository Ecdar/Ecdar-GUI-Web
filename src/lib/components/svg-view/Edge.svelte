<script lang="ts">
	import { PropertyType, Status } from "$lib/classes/automaton";
	import type { iPoint } from "$lib/interfaces/iPoint";
	import type { iNail } from "$lib/interfaces/iNail";
	import Nail from "./Nail.svelte";
	import { scale } from "$lib/globalState/scaleStore";

	export let sourcePoint: iPoint;
	export let targetPoint: iPoint;
	export let edgeType: Status;
	export let nails: iNail[];
	let points: iPoint[] = [];

	function nailSymbol(nail: iNail): string {
		switch (nail.property.type) {
			case PropertyType.GUARD:
				return "<";
			case PropertyType.SYNCHRONIZATION:
				return edgeType === Status.INPUT ? "?" : "!";
			case PropertyType.UPDATE:
				return "=";
			case PropertyType.SELECTION:
				return ":";
			case PropertyType.NONE:
			default:
				return "";
		}
	}

	//Add the source and target points to the array
	$: points = [
		sourcePoint,
		...nails.map((nail) => nail.position),
		targetPoint,
	];

	// logic that calculates the lines from the source to the target
	let lines: { from: iPoint; to: iPoint }[] = [];
	$: updateLines(points);
	function updateLines(_points: iPoint[]) {
		lines = [];
		for (let i = 0; i < _points.length - 1; i++) {
			lines.push({ from: _points[i], to: _points[i + 1] });
		}
	}

	// Function to calculate x2
	function calculateX2(line: { from: iPoint; to: iPoint }): number {
		return (
			line.to.x -
			25 *
				Math.cos(
					Math.atan2(
						line.to.y - line.from.y,
						line.to.x - line.from.x,
					),
				)
		);
	}

	// Function to calculate y2
	function calculateY2(line: { from: iPoint; to: iPoint }): number {
		return (
			line.to.y -
			25 *
				Math.sin(
					Math.atan2(
						line.to.y - line.from.y,
						line.to.x - line.from.x,
					),
				)
		);
	}

	$: dashedStroke =
		edgeType === Status.INPUT ? `${2 * 8 - $scale},${2 * 8 - $scale}` : "";
</script>

<!-- Lines -->
{#each lines as line, index}
	<line
		x1={line.from.x}
		y1={line.from.y}
		x2={index === lines.length - 1 ? calculateX2(line) : line.to.x}
		y2={index === lines.length - 1 ? calculateY2(line) : line.to.y}
		marker-end={index === lines.length - 1 ? "url(#arrowhead)" : ""}
		stroke-dasharray={dashedStroke}
		id="edge-{edgeType}-{index}"
	/>
{/each}

<!-- Nails -->
{#each nails as nail}
	<Nail position={nail.position} text={nailSymbol(nail)} />
{/each}

<style>
	line {
		stroke: var(--canvas-action-color);
		stroke-width: 2;
	}
</style>
