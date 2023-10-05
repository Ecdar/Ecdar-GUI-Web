<svelte:options accessors/>

<script lang="ts">
	import type { Point } from "$lib/classes/draw";

	export let position: Point;
	export let locationID: string;
	let rad: number = 10;

	$: position.x;
	$: position.y;
	$: locationID;

	import Node from "./Node.svelte";
</script>

<Node locationID={locationID} radius={rad} position={position}/>
