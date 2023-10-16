<svelte:options accessors />

<script lang="ts">
	import Node from "./Node.svelte";
	import type { iPoint } from "$lib/interfaces/iPoint";
	import type { iNickname } from "$lib/interfaces/iNickname";
	import Label from "./Label.svelte";

	export let position: iPoint;
	export let locationID: string;
	export let nickname: iNickname;
</script>

<!--Location consists of both a Node with a label-->
<Label
	bind:position={nickname.position}
	bind:parentPosition={position}
	bind:text={nickname.name}
/>
<Node text={locationID} radius={20} bind:position />
