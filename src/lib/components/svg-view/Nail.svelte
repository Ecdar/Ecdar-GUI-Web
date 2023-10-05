<svelte:options accessors />

<script lang="ts">
	import Node from './Node.svelte';

	export let x: number;
	export let y: number;
	export let locationID: string;

	$: x;
	$: y;
	$: locationID;
</script>

<Node {locationID} radius={10} {x} {y} />
