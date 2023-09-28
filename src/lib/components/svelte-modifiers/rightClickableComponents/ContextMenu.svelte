<script lang="ts">
	import type { ContextMenuItem } from './contextMenuItem';

	// Variables for the menu items to be shown and style to be set
	export let menuItems: ContextMenuItem[];
	export let style: string;
	export let originalRightClickable: HTMLElement;
</script>

<nav {style} class="contextmenu">
	<ul>
		{#each menuItems as item}
			{#if item.isHorizontalRule}
				<hr />
			{:else}
				<li>
					<!-- Context Menu Button -->
					<button
						on:click={() => {
							item.onClick(originalRightClickable);
						}}
						class={item.cssClass}
					>
						<!-- Setting the content of the context menu item. svelte:component is used to dynamically reference the icon -->
						<div class="icon">
							<svelte:component this={item.icon} />
						</div>
						<p>{item.displayText}</p>
					</button>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<!--
	Styling for the context menu and classed for different types of buttons
-->
<style>
	* {
		padding: 0;
		margin: 0;
	}

	/* Styling for the context menu */
	.contextmenu {
		border: 1px #999 solid;
		background-color: #fff;
		border-radius: 0.75rem;
		overflow-x: hidden;
		overflow-y: scroll;
		white-space: nowrap;
		max-width: 12.5rem;
		max-height: 25rem;
	}

	/* List element styling */
	ul {
		margin: 0.25rem;
		width: fit-content;
	}

	li {
		list-style-type: none;
		display: flex;
		padding: 0.1rem 0;
	}

	/* Icon styling */
	.icon {
		padding: 0.5rem;
	}

	/* Context menu button styling */
	button {
		border: 0px;
		background-color: #fff;
		display: flex;
		align-items: center;
		height: 2rem;
		border-radius: 5px;
		width: 100%;
	}

	button:hover {
		background-color: #eee;
	}

	/* Danger button color */
	button.danger {
		background-color: #f30000;
	}

	button.danger:hover {
		background-color: #e30000;
	}

	/* Warning button color */
	button.warning {
		background-color: yellow;
	}

	button.warning:hover {
		background-color: rgb(255, 225, 0);
	}

	/* Success button color */
	button.success {
		background-color: rgb(0, 165, 0);
	}

	button.success:hover {
		background-color: rgb(0, 137, 0);
	}

	button p {
		padding: 0 0.5rem;
		font-size: 1rem;
	}

	/* Horizontal rule (Context menu line splitter) */
	hr {
		border: none;
		border-bottom: 1px solid #ccc;
		margin: 0.25rem 0px;
	}
</style>
