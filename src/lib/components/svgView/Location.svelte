<svelte:options accessors />

<script lang="ts">
	import type { iPoint } from "$lib/interfaces/iPoint";
	import type { Nickname } from "$lib/classes/automaton";
	import type { LocationId } from "$lib/classes/automaton/LocationId";
	import { contextMenu } from "$lib/components/contextMenu/contextMenu";
	import LocationMenu from "$lib/components/contextMenu/contentTypes/locationMenu/LocationMenu.svelte";
	import Label from "./Label.svelte";
	import Node from "./Node.svelte";

	export let position: iPoint;
	export let locationId: LocationId;
	export let nickname: Nickname | undefined;

	let group: SVGElement;
	let menuProps = {
		get location() {
			return group;
		},
	};
</script>

<!--Location consists of both a Node with a label-->
<g
	bind:this={group}
	use:contextMenu={{ content: LocationMenu, props: menuProps }}
>
	{#if nickname?.name}
		<Label
			bind:position={nickname.position}
			bind:parentPosition={position}
			bind:text={nickname.name}
		/>
	{/if}
	<Node text={locationId.rawId} radius={20} bind:position />
</g>
