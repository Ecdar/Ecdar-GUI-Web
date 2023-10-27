<svelte:options accessors />

<script lang="ts">
	import Node from "./Node.svelte";
	import type { iPoint } from "$lib/interfaces/iPoint";
	import type { iNickname } from "$lib/interfaces/iNickname";
	import Label from "./Label.svelte";
	import { contextMenu } from "$lib/components/contextMenu/contextMenu";
	import LocationMenu from "$lib/components/contextMenu/contentTypes/locationMenu/LocationMenu.svelte";

	export let position: iPoint;
	export let locationID: string;
	export let nickname: iNickname;

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
	<Label
		bind:position={nickname.position}
		bind:parentPosition={position}
		bind:text={nickname.name}
	/>
	<Node text={locationID} radius={20} bind:position />
</g>
