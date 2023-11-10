<script lang="ts">
    import { getContext, setContext, type ComponentType} from "svelte";
    export let icon: ComponentType;
    export let name: string;
    export let onClick: () => void;

    let groupBind = "";
    let isSelected: boolean = getContext("selectedItem") === name;
    
    function handleClick() {
        if (onClick) {
            onClick(); 
        }
    }
    
    function handleRadioChange() {
        if(getContext("selectedItem") === name){
            isSelected = false;
            setContext("selectedItem", undefined);
        }
        else if (getContext("selectedItem") === undefined){
            isSelected = true;
            setContext("selectedItem", name);
        }
        else{
            isSelected = true;
            setContext("selectedItem", name);
        }
    }



    const iconCtx = {
        strokeWidth: "1.5",
        size: "100%",
        variation: "filled",
        color: "black",
    };
    setContext("iconCtx", iconCtx);
</script>


<label class="tool-bar-item" class:selected={isSelected}>
    <input
        type="radio"
        name="tools"
        value={name}
        on:change={handleRadioChange}
        on:click={handleClick}
        style="display: none;"
    />
    <svelte:component this={icon}></svelte:component>
</label>

<style>
    .tool-bar-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px; /* Set your desired width */
        height: 40px; /* Set your desired height */
        border: 2px solid #007bff; /* Set your desired border properties */
        cursor: pointer;
        margin: 0px; /* Adjust margin as needed */
        background-color: transparent;
    }
    input[type="radio"]:checked::before{background-color: green
    }
    .selected {
        background-color: #007bff; /* Set your desired background color for the selected button */
        color: white; /* Set the text color for the selected button */
    }

</style>