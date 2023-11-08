<svelte:options accessors />

<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import Node from "./Node.svelte";

	export let position: iPoint;
	export let text: string;
</script>

<Node {text} radius={10} bind:position />
