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
		class="background stroke"
		d="M 0 {cutOff} L {cutOff} 0 L {width} 0 L {width} {height} L 0 {height} Z"
	/>
	<DraggableSvg bind:position>
		<path
			class="bar stroke"
			d="M {cutOff / 2} {cutOff /
				2} L {cutOff} 0 L {width} 0 L {width} {cutOff / 2} Z"
		/>
		<text x={cutOff} y={cutOff / 3} font-size="2rem">Hello</text>
		<g
			on:pointerup={() => {
				alert("Initiate Text Editor");
			}}
		>
			<rect
				x={width - 50}
				y="0"
				width={cutOff / 2}
				height={cutOff / 2}
				fill="pink"
				class="stroke"
			></rect>
			<text x={width - 44} y="34" fill="white" font-size="28px"
				>&lt; &gt;</text
			>
		</g>
		<slot />
	</DraggableSvg>
</g>

<style>
	.background {
		fill: blue;
		fill-opacity: 0.5;
	}

	.bar {
		fill: blue;
	}

	.stroke {
		stroke: black;
		stroke-width: 8;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
</style>
