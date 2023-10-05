<script lang="ts">
	import { onMount } from 'svelte';
	import Location from '$lib/components/svg-view/Location.svelte';
	import type { Point } from '$lib/classes/draw';

	const Locations: Record<string, Location> = {};


	onMount(() => {
		Locations["1"] = new Location({
			target: document.getElementById("svg-container")?? document.body,
			props: {
				position: {x: 100, y: 100},
				locationID: "1"
			}
		});

		Locations["2"] = new Location({
			target: document.getElementById("svg-container")?? document.body,
			props: {
				position: {x: 100, y: 150},
				locationID: "2"
			}
		});
	});

	export function move(id: string) {
		console.log(Locations[id].x);
		Locations[id].position.x += 10;
		Locations[id].position.y += 10;
	}
</script>

<!-- create a flexbox for zooming -->




<button on:click={()=>move("1")}>Draw</button>
<svg id="svg-container" width="100vw" height="100vh" >
</svg>
