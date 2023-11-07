<script lang="ts">
	import {
		Arrow_downward,
		Arrow_upward,
	} from "svelte-google-materialdesign-icons";
    let currentlyCollapsed: boolean = true;

    function expandOrCollapse(){
        console.log("ExpandOrCollapse() not implemented yet");
    }
	
</script>

<div id="tools-nav">
	<div>
		<h1>Tools</h1>
	</div>
	<div>
		<Arrow_downward on:click={expandOrCollapse} />
	</div>
</div>

<style>
	#tools-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1em;
	}
</style>