<script lang="ts">
	import { onMount } from 'svelte';
	import Location from '$lib/components/svg-view/location.svelte';

	const Locations: Record<string, Location> = {};

	

	onMount(() => {
		Locations["1"] = new Location({
			target: document.getElementById("svg-container")?? document.body,
			props: {
				x: 100,
				y: 100,
				color: "gray",
				name: "Developer",
				locationID: "1"
			}
		});

		Locations["2"] = new Location({
			target: document.getElementById("svg-container")?? document.body,
			props: {
				x: 150,
				y: 100,
				color: "green",
				name: "Developer",
				locationID: "2"
			}
		});

		Locations["1"].draw();
		Locations["2"].draw();
	});

	export function draw() {}

	export function move(id: string, x: number, y: number) {
		Locations[id].x = x;
		Locations[id].y = y;
		Locations[id].draw();
	}
</script>

<!-- create a flexbox for zooming -->





<button on:click={()=>move("1",150,300)}>Draw</button>
<svg id="svg-container" width="100vw" height="100vh" >
</svg>
