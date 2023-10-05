<svelte:options accessors/>

<script lang="ts">
	import Node from "./Node.svelte";
	import type { Point } from "$lib/classes/draw";

	export let position: Point;
	export let locationID: string;
	let rad: number = 20;

	$: position;
	$: locationID;

	
</script>

<Node locationID={locationID} radius={rad} position={position}/>
