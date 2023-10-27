<script lang="ts">
	import { Arrow_right } from "svelte-google-materialdesign-icons";
	import { Backend } from "$lib/classes/automaton/Backend";
	import QueryDropDownMenu from "./QueryDropDownMenu.svelte";

	export let query: string;
	export let comment: string;
	export let isPeriodic: boolean;
	export let backend: Backend;
	export let index: number;

	let [type, name] = query.split(":");

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

	function onTypeChange(event: Event) {
		type = (event.target as HTMLSelectElement).value;
		query = `${type}:${name}`;
	}

	function onNameChange(event: Event) {
		name = (event.target as HTMLInputElement).value;
		query = `${type}:${name}`;
	}

	function onCommentChange(event: Event) {
		comment = (event.target as HTMLInputElement).value;
	}

	function onBackendChange(event: Event) {
		backend = serverOptions[(event.target as HTMLSelectElement).value];
	}
</script>

<div class="query" id="query-{index}">
	<div class="column">
		<div class="left-column">
			<select on:change={onTypeChange}>
				{#each Object.entries(typeOptions) as [full, short]}
					{#if full === type}
						<option value={full} selected>{short}</option>
					{:else}
						<option value={full}>{short}</option>
					{/if}
				{/each}
			</select>
		</div>
	</div>
	<div class="column grow">
		<input
			type="text"
			placeholder="Query"
			value={name || ""}
			on:change={onNameChange}
		/>
		<input
			type="text"
			placeholder="Comment"
			value={comment || ""}
			on:change={onCommentChange}
		/>
	</div>
	<div class="column">
		<div class="group">
			<Arrow_right />
			<QueryDropDownMenu bind:isPeriodic {index} />
		</div>
		<select on:change={onBackendChange}>
			{#each Object.keys(serverOptions) as serverOption, index}
				{#if index === backend}
					<option selected>{serverOption}</option>
				{:else}
					<option>{serverOption}</option>
				{/if}
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
