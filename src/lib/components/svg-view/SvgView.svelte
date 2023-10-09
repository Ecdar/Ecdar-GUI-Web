<script lang="ts">
	import { activeModel } from "$lib/globalState/activeModel";
	import { updateScale } from "$lib/globalState/scaleStore";
	import Location from "$lib/components/svg-view/Location.svelte";
	import Edge from "./Edge.svelte";
	import Label from "./Label.svelte";

	let svgContainer: SVGElement;
	let currentScale = 1;
	const maxScale = 2.5;
	const minScale = 0.5;

	function testingScrolling(event: WheelEvent) {
		event.preventDefault();

		const delta = Math.sign(event.deltaY);

		currentScale += delta * 0.05;

		if (currentScale > maxScale) {
			currentScale = maxScale;
		} else if (currentScale < minScale) {
			currentScale = minScale;
		}

		svgContainer.style.transform = `scale(${currentScale})`;
		updateScale(currentScale);
	}
</script>

<svg
	id="svg-container"
	height="100%"
	width="100%"
	bind:this={svgContainer}
	on:wheel={testingScrolling}
>
	<Label
		parrentPosition={{ x: 0, y: 0 }}
		position={{ x: 300, y: 300 }}
		text="test"
	/>
	<!--All edges gets drawn with their reference to their source location-->

	{#each $activeModel.edges as edge}
		<Edge
			bind:sourcePoint={$activeModel.locations[edge.sourceLocation]
				.position}
			bind:targetPoint={$activeModel.locations[edge.targetLocation]
				.position}
			nails={edge.nails}
		/>
	{/each}

	<!--All locations gets drawn-->
	{#each Object.values({ ...$activeModel.locations }) as location}
		<Location locationID={location.id} bind:position={location.position} />
	{/each}
</svg>

<style>
	#svg-container {
		/* Change height and width dynamically once zooming and panning is implemented */
		height: 100%;
		width: 100%;
		position: absolute;
	}
</style>
