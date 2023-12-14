<script lang="ts">
	import Modal from "$lib/components/modal/Modal.svelte";
	import { showAboutUI } from "./showAboutUI";
</script>

<Modal show={$showAboutUI}>
	<div>
		<div class="box">
			<h1>Ecdar v. 0.1</h1>
			<p>Made by:</p>
			<p>&nbsp; 5. Semester, Aalborg University 2023</p>
			<p>
				For more information, go to
				<a href="https://www.ecdar.net/" target="_blank">
					www.Ecdar.net</a
				>
			</p>
		</div>
		<button
			id="close-about-ui"
			on:click={() => {
				$showAboutUI = false;
			}}>Close</button
		>
	</div>
</Modal>

<style>
	.box {
		height: 10em;
		width: 30em;
		padding-left: 1em;
		color: var(--text-color);
	}

	button#close-about-ui {
		margin-left: 30em;
		margin-bottom: 1em;
	}
</style>
