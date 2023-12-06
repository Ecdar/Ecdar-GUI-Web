<script lang="ts">
	import { Add, Arrow_right, Menu } from "svelte-google-materialdesign-icons";
	import { queries } from "$lib/globalState/activeProject";
	//import { Backend } from "$lib/classes/automaton/Backend";
	import { Query } from "$lib/classes/automaton/Query";

	import SvgButton from "$lib/components/buttons/SvgButton.svelte";

	function addQuery() {
		$queries?.push(new Query("specification:", "", false));
		$queries = $queries;
	}

	function runAllQueries() {
		console.log("Run all queries");
	}

	function resetAllStatus() {
		console.log("Reset all status");
	}
</script>

<div id="query-nav">
	<div>
		<h1>Queries</h1>
	</div>
	<div class="buttons">
		<SvgButton icon={Add} click={addQuery} size={30} id="add-query" />
		<SvgButton
			icon={Arrow_right}
			click={runAllQueries}
			size={30}
			id="run-all-queries"
		/>
		<SvgButton
			icon={Menu}
			click={resetAllStatus}
			size={30}
			id="reset-all-status"
		/>
	</div>
</div>

<style>
	.buttons {
		color: var(--navigationbar-text-color);
		background: none;
		border: none;
		display: flex;
	}

	#query-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
	}
</style>
