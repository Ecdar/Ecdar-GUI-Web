<script lang="ts">

import TopBarDropDown from "../topBar/TopBarDropDown.svelte"

export let name:string = "Default"

let visible:boolean = false;

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class = "unselectable"
    on:mouseenter={()=>{visible = true;}} 
    on:mouseleave={()=>{visible = false;}}
    >
    <button >
        {name}
    </button>
    <div style="position: absolute; height: 0px">
        {#if visible}
        <TopBarDropDown>
            <slot/>
        </TopBarDropDown>
        {/if} 
    </div>
</div>



<style>

    div{
        height:100%;
    }

    button{
        height: 100%;
        background-color: slategrey;
        border-color: black;
        color:rgb(0, 0, 0);
    }

    button:hover{
        filter: brightness(0.9);
    }

    .unselectable{
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

</style>

