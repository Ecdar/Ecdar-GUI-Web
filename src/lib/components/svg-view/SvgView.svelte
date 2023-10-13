<script lang="ts">
	import { activeModel } from "$lib/globalState/activeModel";
	import Location from "$lib/components/svg-view/Location.svelte";
	import Edge from "./Edge.svelte";
</script>

<svg height="100%" width="100%">
	<!--All edges gets drawn with their reference to their source location-->

	{#each $activeModel.edges as edge}
		<Edge
			bind:sourcePoint={$activeModel.locations[edge.sourceLocation]
				.position}
			bind:targetPoint={$activeModel.locations[edge.targetLocation]
				.position}
			nails={edge.nails}
		/>
	{/each}

	<!--All locations gets drawn-->
	{#each Object.values({ ...$activeModel.locations }) as location}
		<Location
			locationID={location.id}
			bind:position={location.position}
			bind:nickname={location.nickname}
		/>
	{/each}
</svg>
