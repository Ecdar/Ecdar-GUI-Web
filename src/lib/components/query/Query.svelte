<script lang="ts">
	import { Arrow_right } from "svelte-google-materialdesign-icons";
	import { Backend } from "$lib/classes/automaton/Backend";
	import QueryDropDownMenu from "./QueryDropDownMenu.svelte";

	export let query: string;
	export let type: string;
	export let name: string;
	export let comment: string;
	export let isPeriodic: boolean;
	export let backend: Backend;
	export let index: number;

	const typeOptions: Record<string, string> = {
		specification: "Spec",
		implementation: "Imp",
		consistency: "Con",
		reachability: "E<>",
		refinement: "<=",
		"local-consistensy": "LCon",
		"bisim-minim": "Bsim",
		"get-component": "Get",
	};

	const serverOptions: Record<string, Backend> = {
		"J-Ecdar": Backend.J_ECDAR,
		Reveaal: Backend.REVEAAL,
	};

	$: query = `${type}:${name}`;
</script>

<div class="query" id="query-{index}">
	<div class="column">
		<div class="left-column">
			<select bind:value={type}>
				{#each Object.entries(typeOptions) as [full, short]}
					<option value={full}>{short}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="column grow">
		<input type="text" placeholder="Query" bind:value={name} />
		<input type="text" placeholder="Comment" bind:value={comment} />
	</div>
	<div class="column">
		<div class="group">
			<Arrow_right />
			<QueryDropDownMenu bind:isPeriodic {index} />
		</div>
		<select bind:value={backend}>
			{#each Object.keys(serverOptions) as serverOption, serverIndex}
				<option value={serverIndex}>{serverOption}</option>
			{/each}
		</select>
	</div>
</div>

<style>
	.query {
		background-color: lightgrey;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-bottom: 1px solid black;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: 1em;
	}

	.left-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1em;
	}

	.grow {
		flex: 1;
	}

	.group {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	input[type="text"] {
		width: 100%;
		min-width: 5em;
	}
</style>
