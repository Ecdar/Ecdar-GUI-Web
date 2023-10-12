<svelte:options accessors />

<script lang="ts">
	import Node from "./Node.svelte";
	import type { iLocation } from "$lib/interfaces/iLocation";
	import type { Point } from "$lib/classes/draw";
	import { activeModel } from "$lib/globalState/activeModel";
	import { Nickname } from "$lib/classes/automaton";
	import type { iNickname } from "$lib/interfaces/iNickname";
	import Label from "./Label.svelte";

	export let position: Point;
	export let locationID: string;
	export let nickname: iNickname;
</script>

<Label
	bind:position={nickname.position}
	bind:parrentPosition={position}
	bind:text={nickname.name}
/>
<Node text={locationID} radius={20} bind:position />
