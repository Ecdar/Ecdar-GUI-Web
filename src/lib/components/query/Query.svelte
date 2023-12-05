<script lang="ts">
	import { Backend } from "$lib/classes/automaton/Backend";
	import SvgButton from "$lib/components/buttons/SvgButton.svelte";
	import QueryDropDownMenu from "./QueryDropDownMenu.svelte";
	import {
		Help,
		Done,
		Warning,
		Error,
		Arrow_right,
	} from "svelte-google-materialdesign-icons";

	export let query: string;
	export let type: string;
	export let name: string;
	export let isPeriodic: boolean;
	// TODO: pipe this in
	let backend = 0;
	export let index: number;
	export let comment: string = "Comment";
	export let color: string = "var(--queries-element-color)";

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

	function runQuery() {
		console.log("Run query");
	}
</script>

<div class="query" id="query-{index}">
	<div class="column">
		<div class="left-column" style="background-color: {color}">
			{#if color === "var(--query-success-color)"}
				<Done color="black" tabindex="-1" />
			{:else if color === "var(--query-warning-color)"}
				<Warning color="black" tabindex="-1" />
			{:else if color === "var(--query-error-color)"}
				<Error color="black" tabindex="-1" />
			{:else}
				<Help color="black" tabindex="-1" />
			{/if}
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
			<SvgButton
				icon={Arrow_right}
				click={runQuery}
				id="run-query"
				color="var(--sidebar-text-color)"
			/>
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
		background-color: var(--sidebar-element-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-bottom: 1px solid black;
		color: var(--sidebar-text-color);
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
		background-color: var(--queries-input-background-color);
		color: var(--sidebar-text-color);
	}
</style>
