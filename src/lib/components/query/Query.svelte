<script lang="ts">
	import {
		Question_mark,
		Arrow_right,
		More_vert,
	} from "svelte-google-materialdesign-icons";

	export let type: string;
	export let name: string;
	export let comment: string = "Comment";
	export let server: string;

	const typeOptions = ["Spec", "Imp", "Con"];
	const serverOptions = ["Reveaal"];
</script>

<div class="query">
	<div class="column">
		<Question_mark />
		<select>
			{#each typeOptions as typeOption}
				{#if typeOption === type}
					<option selected>{typeOption}</option>
				{:else}
					<option>{typeOption}</option>
				{/if}
			{/each}
		</select>
	</div>
	<div class="column grow">
		<input type="text" value={name} />
		<input type="text" placeholder="Comment" value={comment} />
	</div>
	<div class="column">
		<div class="group">
			<Arrow_right />
			<More_vert />
		</div>
		<select>
			{#each serverOptions as serverOption}
				{#if serverOption === server}
					<option selected>{serverOption}</option>
				{:else}
					<option>{serverOption}</option>
				{/if}
			{/each}
		</select>
	</div>
</div>

<style>
	.query {
		background-color: lightgrey;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1em;
		border-bottom: 1px solid black;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.grow {
		flex: 1;
	}

	.group {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	input[type="text"] {
		width: 100%;
		min-width: 5em;
	}
</style>
