<script lang="ts">

    import TopBarBtn from "$lib/components/topBar/TopBarBtn.svelte";
    import DropDownBtn from "$lib/components/topBar/DropDownBtn.svelte";


</script>

<!--File top bar button-->
<div>   
    <TopBarBtn name = "File">
        <DropDownBtn name="New Project" on:click={() => {console.log("New Project")}}/>
        <DropDownBtn name="Open Project" on:click={() => {console.log("Open Project")}}/>
        <DropDownBtn name="Recent Projects" on:click={() => {console.log("Recent Projects")}}/>
        <DropDownBtn name="Save Project" on:click={() => {console.log("Save Project")}}/>
        <DropDownBtn name="Save Project as" on:click={() => {console.log("Save Project as")}}/>
        <DropDownBtn name="New Test Plan" on:click={() => {console.log("New Test Plan")}}/>
        <DropDownBtn name="Export as Png" on:click={() => {console.log("Export as Png")}}/>
        <DropDownBtn name="Export without border as Png" on:click={() => {console.log("Export without border as Png")}}/>
    </TopBarBtn>
</div>

<!--Edit top bar button-->
<div>       
    <TopBarBtn name = "Edit">
        <DropDownBtn name="Move All Nodes Left" on:click={() => {console.log("Move All Nodes Left")}}/>
        <DropDownBtn name="Move All Nodes Right" on:click={() => {console.log("Move All Nodes Right")}}/>
        <DropDownBtn name="Move All Nodes Up" on:click={() => {console.log("Move All Nodes Up")}}/>
        <DropDownBtn name="Move All Nodes Down" on:click={() => {console.log("Move All Nodes Down")}}/>
    </TopBarBtn>
</div>

<!--View top bar button-->
<div>
    <TopBarBtn name = "View">
        <DropDownBtn name="Project Panel" on:click={() => {console.log("Project Panel")}}/>
        <DropDownBtn name="Query Panel" on:click={() => {console.log("Query Panel")}}/>
        <DropDownBtn name="Autoscaling" on:click={() => {console.log("Autoscaling")}}/>
        <DropDownBtn name="Scalling" on:click={() => {console.log("Scalling")}}/>
        <DropDownBtn name="Split canvas" on:click={() => {console.log("Split canvas")}}/>
    </TopBarBtn>
</div>

<!--Options top bar button-->
<div>
    <TopBarBtn name = "Options">
        <DropDownBtn name="UI cache" on:click={() => {console.log("UI cache")}}/>
        <DropDownBtn name="Periodic query execution" on:click={() => {console.log("Periodic query execution")}}/>
        <DropDownBtn name="Engine Options" on:click={() => {console.log("Engine Options")}}/>
    </TopBarBtn>
</div>

<!--Help top bar button-->
<div>
    <TopBarBtn name = "Help">
        <DropDownBtn name="Modelling Help" on:click={() => {console.log("Modelling Help")}}/>
        <DropDownBtn name="Testing Help" on:click={() => {console.log("Testing Help")}}/>
        <DropDownBtn name="About" on:click={() => {console.log("About")}}/>
    </TopBarBtn>
</div>

<style>

div{
    height:100%;
    display: block;
    float: left;
}

</style>