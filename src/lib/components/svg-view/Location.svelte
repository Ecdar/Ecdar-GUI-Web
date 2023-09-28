<svelte:options accessors/>

<script lang="ts">

export let x: number;
	export let y: number;
	export let locationID: string;

	$: x;
	$: y;
	$: locationID;

	import Node from "./Node.svelte";
</script>

<Node locationID={locationID} radius={10} x={x} y={y}/>
