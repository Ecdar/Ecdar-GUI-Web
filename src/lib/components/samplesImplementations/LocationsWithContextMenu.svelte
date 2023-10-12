<script lang="ts">
	import { contextMenu } from "$lib/components/contextMenu/contextMenu";
	import LocationMenu from "$lib/components/contextMenu/contentTypes/locationMenu/LocationMenu.svelte";

	let circle1: SVGElement;
	let circle2: SVGElement;

	const props1 = {
		get location() {
			return circle1;
		},
	};
	const props2 = {
		get location() {
			return circle2;
		},
	};
</script>

<svg
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
	width="50px"
	height="50px"
>
	<circle
		use:contextMenu={{ content: LocationMenu, props: props1 }}
		bind:this={circle1}
		cx="20"
		cy="50"
		r="20"
	/>
	<circle
		use:contextMenu={{ content: LocationMenu, props: props2 }}
		bind:this={circle2}
		cx="80"
		cy="50"
		r="20"
	/>
</svg>
