<script lang="ts">

//Top-bar menu items
let fileMenuOpen = false;
	const fileMenuItems = ["New project", "Open Project", "Recent Projects", "Save Project", "Save Project as", "New Test Plan", "Export as Png", "Export without border as Png"];
	let editMenuOpen = false;
	const editMenuItems = ["Move All Nodes Left", "Move All Nodes Up", "Move All Nodes Right", "Move All Nodes Right", "Move All Nodes Down"];
	let viewMenuOpen = false;
	const viewMenuItems = ["Project Panel", "Query Panel", "Autoscalling", "Scalling", "Split canvas"];
	let optionsMenuOpen = false;
	const optionsMenuItems = ["UI Cache", "Periodic query execution", "Engine Options"];
	let helpMenuOpen = false;
	const helpMenuItems = ["Modelling Help", "Testing Help", "About"];
	export let topbar = [["File",fileMenuOpen,fileMenuItems], ["Edit",editMenuOpen, editMenuItems], ["View", viewMenuOpen,viewMenuItems],["Options",optionsMenuOpen, optionsMenuItems], ["Help",helpMenuOpen,helpMenuItems]];


</script>

<div>
    {#each topbar as bar}
		<section class="dropdown">
			<button class = "dropdown-btn" on:click={() => bar[1] = !bar[1]} >{bar[0]}</button>
			<div class:show={bar[1]} class="dropdown-content">		
				{#each bar[2] as item}
					<div class="dropdown-item">{item}</div>
				{/each}
			</div>	
		</section>
	{/each}
</div>


<style>
    .dropdown {
        position: relative;
        display: inline-block;
        height: inherit;
    }

    .dropdown-btn{
        background-color: slategrey;
        border-color: transparent;
        color:white;
        height: 95%;
    }

    .dropdown-btn:hover{
        background-color: rgb(67, 150, 181);
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f6f6f6;
        width: max-content;
        z-index: 1;
    }

    .dropdown-item {
        color: black;
        padding: 5px 16px;
        text-decoration: none;
        display: block;
        width: 100%;
    }

    .dropdown-item:hover {
        background-color: #ddd
    }
        
    .show {
        display:block;
    }
</style>