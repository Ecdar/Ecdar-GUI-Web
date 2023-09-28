<svelte:options accessors/>

<script lang="ts">

	export let x: number;
	export let y: number;
	export let locationID: string;
	let rad: number = 10;

	$: x;
	$: y;
	$: locationID;

	import Node from "./Node.svelte";
</script>

<Node locationID={locationID} radius={rad} x={x} y={y}/>
