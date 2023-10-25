<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import DraggableSVG from "./DraggableSVG.svelte";

	export let position: iPoint;
	export let text: string;
	export let radius: number;

	const centerOffset = 5;
</script>

<DraggableSVG bind:position>
	<circle
		cx={position.x}
		cy={position.y}
		r={radius}
		fill="gray"
		role="none"
		id={"node" + text}
	/>
	<text
		x={position.x}
		y={position.y + centerOffset}
		text-anchor="middle"
		role="none">{text}</text
	>
</DraggableSVG>
