<script lang="ts">

import {NewProject, OpenProject, RecentProjects, SaveProject, SaveProjectAs, NewTestPlan, ExportAsPng, ExportWithoutBorderAsPng} from "../topBar/FileTab"
import {MoveAllNodesRight, MoveAllNodesLeft, MoveAllNodesDown, MoveAllNodesUp} from "../topBar/EditTab"
import {ProjectPanel,QueryPanel,Autoscalling,Scalling,SplitCanvas} from "../topBar/ViewTab"
import {UICache,PeriodicQueryExecution,EngineOptions} from "../topBar/OptionsTab"
import {ModellingHelp, TestingHelp, About} from "../topBar/HelpTab"
import {clickOutside} from './clickOutside.js';

let currentOpen;

const fileMenu = {
    items: ["New Project", "Open Project", "Recent Projects", "Save Project", "Save Project As", "New Test Plan", "Export As Png", "Export Without Border As Png"],
    name: "File",
    open: false
};


const editMenu = {
    items: ["Move All Nodes Right", "Move All Nodes Left", "Move All Nodes Up","Move All Nodes Down"],
    name: "Edit",
    open: false
};

const viewMenu = {
    items: ["Project Panel", "Query Panel", "Autoscalling", "Scalling", "Split Canvas"],
    name: "View",
    open: false,
};

const optionsMenu = {
    items: ["UI Cache", "Periodic Query Execution", "Engine Options"],
    name: "Options",
    open: false
};

const helpMenu = {
    items: ["Modelling Help", "Testing Help", "About"],
    name: "Help",
    open: false
};

function handleClickOutside(event) {
   topbarItem.forEach(item => {
        item.open = false;
   });
   console.log(topbarItem);
		
}


let topbarItem = [fileMenu, editMenu, viewMenu, optionsMenu, helpMenu];


</script>

<div use:clickOutside on:click_outside={handleClickOutside}>
{#each topbarItem as item}
		<section class="dropdown">
			<button class = "dropdown-btn" on:click={() => {
                item.open = !item.open;
            }} >{item.name}</button>

			<div class:show={item.open} class="dropdown-content">		
				{#each item.items as menuItem}
                    <button class="dropdown-item" on:click={()=> {
                        let functionName = menuItem.replace(/\s/g, "");
                        functionName = functionName+"()";
                        eval(functionName);
                    }}>
                        {menuItem}
                    </button>

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