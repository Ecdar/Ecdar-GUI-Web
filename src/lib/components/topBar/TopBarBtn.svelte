<script lang="ts">

import TopBarDropDown from "../topBar/TopBarDropDown.svelte"
	import DropDownBtn from "./DropDownBtn.svelte";

export let name:string = "Default"

let visible:boolean = false;


function toggleVisible(tab:string){
    visible = !visible;
}

</script>

<button  on:click={()=>{
    toggleVisible(name);
}}>
    {name}
</button>


{#if visible}
    <TopBarDropDown>
        <slot/>
    </TopBarDropDown>
{/if}

<style>
    
    button{
        height:100%;
        width: max-content;
        background-color: slategrey;
        border-color: black;
        color:rgb(0, 0, 0);

        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    button:hover{
        filter: brightness(0.9);
    }

</style>

