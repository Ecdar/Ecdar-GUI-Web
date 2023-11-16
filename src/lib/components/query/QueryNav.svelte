<script lang="ts">
	import { Add, Arrow_right, Menu } from "svelte-google-materialdesign-icons";
	import { queries } from "$lib/globalState/activeProject";
	import { Backend } from "$lib/classes/automaton/Backend";
	import { Query } from "$lib/classes/automaton/Query";

	function addQuery() {
		$queries?.arr.push(
			new Query("specification:", "", false, Backend.REVEAAL),
		);
		$queries = $queries;
	}
</script>

<div id="query-nav">
	<div>
		<h1>Queries</h1>
	</div>
	<div>
		<button on:click={addQuery}>
			<Add color="currentColor" id="add-query" tabindex="-1" />
		</button>
		<button>
			<Arrow_right color="currentColor" tabindex="-1" />
		</button>
		<button>
			<Menu color="currentColor" tabindex="-1" />
		</button>
	</div>
</div>

<style>
	button {
		color: var(--navigationbar-text-color);
		background: none;
		border: none;
	}

	#query-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
	}
</style>
