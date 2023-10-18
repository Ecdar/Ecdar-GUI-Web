<script lang="ts">
import { createEventDispatcher } from "svelte";

export let name:string = "Default"

</script>

<button class = "dropdown-item" on:click>
    {name}
</button>

<style>

.dropdown-item {
    display: block;
    width: 100%;
    height: 100%;
}

.dropdown-item:hover {
    filter: brightness(0.9);
}
</style>
