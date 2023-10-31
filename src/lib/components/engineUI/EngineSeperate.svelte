<script lang="ts">
    let formElement: HTMLFormElement;
</script>


<form bind:this={formElement}>
    <label for="name">Name:</label>
    <input type="text" placeholder="Name" name="name" /> <br>
    <label for="IP">IP Address:</label>
    <input type="text" placeholder="IP" name="IP" /> <br>
    <button type="button">Confirm</button>
</form>