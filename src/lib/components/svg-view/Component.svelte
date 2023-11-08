<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import DraggableSvg from "./helpers/DraggableSVG.svelte";

	export let position: iPoint = { x: 10, y: 10 };
	let width = 800;
	let height = 1000;
	const cutOff = 100;
</script>

<g transform="translate({position.x}, {position.y})">
	<path
		class="component-background"
		d="M 0 {cutOff} L {cutOff} 0 L {width} 0 L {width} {height} L 0 {height} Z"
	/>
	<DraggableSvg bind:position>
		<path
			class="component-bar"
			d="M {cutOff / 2} {cutOff /
				2} L {cutOff} 0 L {width} 0 L {width} {cutOff / 2} Z"
		/>
		<text x={cutOff} y={cutOff / 3}>hello</text>
	</DraggableSvg>
</g>

<style>
	.component-background {
		fill: blue;
		fill-opacity: 0.5;
	}

	.component-bar {
		fill: blue;
	}

	path {
		stroke: black;
		stroke-width: 8;
	}
</style>
