<svelte:options accessors />

<script lang="ts">
	import type { Point } from '$lib/classes/draw';
	import Node from './Node.svelte';

	export let position: Point;
	export let locationID: string;
</script>

<Node {locationID} radius={10} bind:position />
