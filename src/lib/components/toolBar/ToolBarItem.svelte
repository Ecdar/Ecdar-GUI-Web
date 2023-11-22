<script lang="ts">
    import { getContext, setContext, type ComponentType} from "svelte";
    import { tooltip } from 'svooltip';
	import 'svooltip/styles.css'; // Include default styling

    export let icon: ComponentType;
    export let name: string;
    export let onClick: () => void;
    export let description: string;

    let isSelected: boolean = getContext("selectedItem") === name;
    
    /**
     * Calls the on:Click function on the button
     */
    function handleClick() {
        if (onClick) {
            onClick(); 
        }
    }
    
    /**
     * Handles the function if the radio button is selected
     */
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

    const slugify = (str = "") =>
        str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>


<label class="tool-bar-item" for={slugify(name)} use:tooltip={{content: description}}>
    <input
        type="radio"
        name="tools"
        id={slugify(name)}
        value={name}
        on:change={handleRadioChange}
        on:click={onClick}
        style="display: none;"
    />
    <svelte:component this={icon}></svelte:component>
</label>

<style>
    .tool-bar-item {
        display: inline-flex;
        align-items: left;
        justify-content: space-evenly;
        width: calc(100%/9); /* adjusts the space evenly to the tools. In this case 9 buttons*/
        border-right: 2px solid black; /* Set your desired border properties */
        border-bottom: 2px solid black; 
        border-top: 2px solid black;
        cursor: pointer;
        margin-bottom: -2px;
        background-color: transparent;
    }
    label:has(input[type="radio"]:checked) {
		  background-color: grey;
    }   
    
</style>