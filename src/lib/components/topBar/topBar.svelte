<script lang="ts">

import {NewProject, OpenProject, RecentProjects, SaveProject, SaveProjectAs, NewTestPlan, ExportAsPng, ExportWithoutBorderAsPng} from "../topBar/FileTab"
import {MoveAllNodesRight, MoveAllNodesLeft, MoveAllNodesDown, MoveAllNodesUp} from "../topBar/EditTab"
import {ProjectPanel,QueryPanel,Autoscalling,Scalling,SplitCanvas} from "../topBar/ViewTab"
import {UICache,PeriodicQueryExecution,EngineOptions} from "../topBar/OptionsTab"
import {ModellingHelp, TestingHelp, About} from "../topBar/HelpTab"
import {clickOutside} from './clickOutside.js';


const fileMenu = {
    items: [["🖿","New Project","Ctrl+Shift+N"], ["🗁"," Open Project", "Ctrl+O"], ["🗁","Recent Projects", ""], 
    ["🖪","Save Project", "Ctrl+S"], ["🖪","Save Project As", "Ctrl+Shift+S"], ["🗹","New Test Plan", "Ctrl+T"], 
    ["🖼","Export As Png", "Ctrl+L"], ["🖼","Export Without Border As Png", ""]],
    name: "File",
    open: false
};


const editMenu = {
    items: [["→","Move All Nodes Right", "Ctrl+→"], ["←","Move All Nodes Left", "Ctrl+←"], ["↑","Move All Nodes Up", "Ctrl+↑"],["↓","Move All Nodes Down", "Ctrl+↓"]],
    name: "Edit",
    open: false
};


const viewMenu = {
    items: [["","Project Panel","Ctrl+P"], ["","Query Panel","Ctrl+G"], ["","Autoscalling",""], ["","Scalling",""], ["⊞","Split Canvas",""]],
    name: "View",
    open: false,
};


const optionsMenu = {
    items: [["","UI Cache",""], ["","Periodic Query Execution",""], ["","Engine Options",""]],
    name: "Options",
    open: false
};

const helpMenu = {
    items: [["?","Modelling Help",""], ["?","Testing Help",""], ["!","About",""]],
    name: "Help",
    open: false
};


let topbarItem = [fileMenu, editMenu, viewMenu, optionsMenu, helpMenu];


</script>
<div>
{#each topbarItem as item}
		<section class="dropdown">
			<button class = "dropdown-btn" on:click={() => {
                item.open = !item.open;
            }} >{item.name}</button>

			<div class:show={item.open} class="dropdown-content">		
				{#each item.items as menuItem}
                    <button class="dropdown-item" on:click={()=> {
                        let functionName = menuItem[1].replace(/\s/g, "");
                        functionName = functionName+"()";
                        eval(functionName);
                    }}>
                        <div class="grid">
                            <p class="grid-item">{menuItem[0]}</p>
                            <p class="grid-item">{menuItem[1]}</p>
                            <p class="grid-item">{menuItem[2]}</p>                                
                        </div>
                    </button>

                {/each}
			</div>	
		</section>
    {/each}
</div>







<style>
 
    .grid{
        display: grid;
        grid-template-columns: 15% auto max-content;
    }

    .grid-item{
        text-align: left;
    }

    .dropdown {
        position: relative;
        display: inline-block;
        height: inherit;
    }

    .dropdown-btn{
        background-color: slategrey;
        border-color: transparent;
        color:white;
    }

    .dropdown-btn:hover{
        background-color: rgb(67, 150, 181);
    }


    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f6f6f6;
        width: max-content;

    }

    .dropdown-item {
        display: block;
        width: 100%;
        border-color:transparent ;
    }

    .dropdown-item:hover {
        background-color: #ddd
    }
        
    .show {
        width: max-content;
        display:block;
    }
</style>