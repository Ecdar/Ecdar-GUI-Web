<script lang="ts">
	import { Add, Arrow_right, Menu } from "svelte-google-materialdesign-icons";
</script>

<div id="query-nav">
	<div>
		<h1>Queries</h1>
	</div>
	<div>
		<Add color="currentColor" />
		<Arrow_right color="currentColor" />
		<Menu color="currentColor" />
	</div>
</div>

<style>
	#query-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
	}
</style>
