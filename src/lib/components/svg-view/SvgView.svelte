<script lang="ts">
	import { onMount } from "svelte";
	import { activeModel } from "$lib/globalState/activeModel";
	import { scale } from "$lib/globalState/scaleStore";
	import Location from "$lib/components/svg-view/Location.svelte";
	import Edge from "./Edge.svelte";
	import Panzoom, {
		type CurrentValues,
		type PanzoomChangeEvent,
	} from "./panzoom/panzoom";

	/**
	 * The parent svg element that the entire view is shown with.
	 */
	let parent: SVGSVGElement;
	/**
	 * The SVG group that we apply transforms to, in order to zoom and pan the view.
	 */
	let scaler: SVGElement;

	/**
	 * This is the library that deals with zooming and panning of the svg view.
	 */
	let panzoom: Panzoom | undefined;
	onMount(() => {
		panzoom = new Panzoom(scaler, parent, setTransform, setTransition, {
			canvas: true,
			pinchAndPan: true,
		});
	});

	/**
	 * When the svg is zoomed, we update the svelte store with the new scale.
	 * We need to know this value when we move stuff with the cursor, such as when moving locations.
	 */
	function scaleChange(event: PanzoomChangeEvent) {
		$scale = event.detail.scale;
	}

	/**
	 * This function is called by the panzoom class, to set the correct svg zoom.
	 */
	let transform: string | undefined;
	function setTransform({ x, y, scale }: CurrentValues) {
		transform = `scale(${scale}) translate(${x}px, ${y}px)`;
	}

	/**
	 * This function is called by the panzoom class, to enable or disable zoom animations.
	 */
	let transition: string = "none";
	function setTransition(active: boolean) {
		const duration = 200;
		const easing = "ease-out";
		transition = active ? `transform ${duration}ms ${easing}` : "none";
	}
</script>

<svg
	bind:this={parent}
	on:pointerdown={(event) => panzoom?.handleDown(event)}
	on:wheel={(event) => panzoom?.zoomWithWheel(event)}
	class="panzoom-parent"
>
	<g
		bind:this={scaler}
		on:panzoomchange={scaleChange}
		class="panzoom-element"
		style:transform
		style:transition
	>
		<!--All edges are drawn with their reference to their source location-->
		{#each $activeModel.edges as edge}
			<Edge
				bind:sourcePoint={$activeModel.locations[edge.sourceLocation]
					.position}
				bind:targetPoint={$activeModel.locations[edge.targetLocation]
					.position}
				nails={edge.nails}
				edgeType={edge.status}
			/>
		{/each}

		<!--All locations are drawn-->
		{#each Object.values({ ...$activeModel.locations }) as location}
			<Location
				locationID={location.id}
				bind:position={location.position}
				bind:nickname={location.nickname}
			/>
		{/each}
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	/* Extracted from the panzoom package */
	.panzoom-parent {
		overflow: hidden;
		user-select: none;
		touch-action: none;
		cursor: move;
	}
	.panzoom-element {
		user-select: none;
		touch-action: none;
	}
</style>
