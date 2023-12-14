<script lang="ts">
	import Panzoom, {
		type CurrentValues,
		type PanzoomChangeEvent,
	} from "./panzoom/panzoom";
	import { onMount } from "svelte";
	import { scale } from "$lib/globalState/scaleStore";
	import { activeView } from "$lib/globalState/activeProject";
	import { Component } from "$lib/classes/automaton/component/Component";
	import Edge from "./Edge.svelte";
	import Location from "$lib/components/svgView/Location.svelte";
	import { System } from "$lib/classes/automaton";

	export let isHidden: boolean;

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
</script>

<svg
	bind:this={parent}
	on:pointerdown={(event) => panzoom?.handleDown(event)}
	on:wheel={(event) => panzoom?.zoomWithWheel(event)}
	class="panzoom-parent"
	style={isHidden ? "visibility:hidden; height:0px;" : "visibility:visible;"}
>
	<g
		bind:this={scaler}
		on:panzoomchange={scaleChange}
		class="panzoom-element"
		style:transform
		style:transition
	>
		{#if $activeView instanceof Component}
			{@const component = $activeView}
			<!--All edges are drawn with their reference to their source location-->
			{#each $activeView.edges as edge}
				<Edge
					sourcePoint={component.locations.getSure(edge.source)
						.position}
					targetPoint={component.locations.getSure(edge.target)
						.position}
					nails={edge.nails}
					edgeType={edge.status}
				/>
			{/each}

			<!--All locations are drawn-->
			{#each $activeView.locations as location}
				<Location
					locationId={location.id}
					bind:position={location.position}
					bind:nickname={location.nickname}
				/>
			{/each}
		{:else if $activeView instanceof System}
			<text>TODO: Not implemented yet</text>
		{/if}

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
