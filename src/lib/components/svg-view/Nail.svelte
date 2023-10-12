<svelte:options accessors />

<script lang="ts">
	import type { Point } from "$lib/classes/draw";
	import Node from "./Node.svelte";

	export let position: Point;
	export let text: string;
</script>

<Node {text} radius={10} bind:position />
