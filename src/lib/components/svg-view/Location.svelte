<svelte:options accessors />

<script lang="ts">
	import Node from './Node.svelte';
	import type { iLocation } from '$lib/interfaces/iLocation';
	import type { Point } from '$lib/classes/draw';
	import { activeModel } from '$lib/globalState/activeModel';

	export let position: Point;
	export let locationID: string;
</script>

<Node {locationID} radius={20} bind:position />
