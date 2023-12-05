<svelte:options accessors />

<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import Node from "./Node.svelte";

	export let position: iPoint;
	export let text: string;

	let radius: number;
	$: radius = text == "" ? 5 : 10;
</script>

<Node {text} {radius} bind:position />
