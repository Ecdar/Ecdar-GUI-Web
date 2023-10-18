<script>
    import DropDownBtn from "../topBar/DropDownBtn.svelte"

</script>

<div class="dropdown-content">
    <slot></slot>
</div>

<style>

div {
    position: absolute;
    width: max-content;
    height: 1.5em;
}  

.dropdown-content {
        float: left;
        position: absolute;
    }

</style>