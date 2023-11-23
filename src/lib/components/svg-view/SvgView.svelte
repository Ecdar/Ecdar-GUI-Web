<script lang="ts">
	import { onMount } from "svelte";
	import {
		activeView,
		type TActiveView,
	} from "$lib/globalState/activeProject";
	import { locationRecord } from "$lib/components/svg-view/state";
	import { scale } from "$lib/globalState/scaleStore";
	import Location from "$lib/components/svg-view/Location.svelte";
	import Edge from "./Edge.svelte";
	import Panzoom, {
		type CurrentValues,
		type PanzoomChangeEvent,
	} from "./panzoom/panzoom";
	import {
		SystemEdge,
		Edge as AutomatonEdge,
		Component,
	} from "$lib/classes/automaton";

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

	function filterSystemEdges(
		edges: SystemEdge[] | AutomatonEdge[] | undefined,
	): AutomatonEdge[] {
		if (!edges) return [];
		return edges.filter(
			(edge): edge is AutomatonEdge => edge instanceof AutomatonEdge,
		);
	}

	function locationsAsArray(view: TActiveView) {
		if (view instanceof Component) {
			// TODO: support more than just components
			return Object.values(view.locations);
		} else {
			return [];
		}
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
		{#each filterSystemEdges($activeView?.edges) as edge}
			{#if "sourceLocation" in edge}
				<Edge
					bind:sourcePoint={$locationRecord[edge.sourceLocation]
						.position}
					bind:targetPoint={$locationRecord[edge.targetLocation]
						.position}
					nails={edge.nails}
					edgeType={edge.status}
				/>
			{/if}
		{/each}

		<!--All locations are drawn-->
		{#each locationsAsArray($activeView) as location}
			<Location
				locationID={location.id}
				bind:position={location.position}
				bind:nickname={location.nickname}
			/>
		{/each}

		<!-- Arrowhead used at the end of edges -->
		<defs>
			<marker
				class="arrowhead"
				id="arrowhead"
				viewBox="0 0 15 15"
				refX="10"
				refY="5"
				markerWidth="6"
				markerHeight="6"
				orient="auto-start-reverse"
			>
				<path d="M 5 0 L 15 5 L 5 10 z" />
			</marker>
		</defs>
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

	.arrowhead {
		fill: var(--canvas-action-color);
	}
</style>
