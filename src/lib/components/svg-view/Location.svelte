<svelte:options accessors />

<script lang="ts">
	import Node from './Node.svelte';

	export let x: number;
	export let y: number;
	export let locationID: string;
</script>

<Node {locationID} radius={20} bind:x bind:y />
