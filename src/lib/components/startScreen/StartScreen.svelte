<script lang="ts">
	import SvgButton from "../buttons/SvgButton.svelte";
	import { Add, File_open } from "svelte-google-materialdesign-icons";
	import { onMount } from "svelte";
	import type { projectHandler as ProjectHandler } from "$lib/classes/projectHandler/ProjectHandler";
	import { projectExamples } from "$lib/projectExamples";
	import { recentProjects } from "$lib/globalState/recentProjects";
	import TimeStamp from "./TimeStamp.svelte";

	function startNewProject() {
		projectHandler.openNewProject();
	}

	let projectHandler: typeof ProjectHandler;

	onMount(async () => {
		projectHandler = (
			await import("$lib/classes/projectHandler/ProjectHandler")
		).projectHandler;
	});

	const relativeTimeFormat = new Intl.RelativeTimeFormat();
</script>

<div style="display: flex; flex-direction: column; width: 100%">
	<h1 style="text-align: center;">Welcome to Ecdar</h1>
	<div
		style="display: flex; width: 100%; height: 100vh; justify-content: center;"
	>
		<div class="flex-column">
			<div class="bottom-border">
				<SvgButton
					click={startNewProject}
					icon={Add}
					id={`new-project`}
					color="var(--sidebar-text-color)"
					justifyContend="center"
					><p style="font-size: 1.7em">
						New Blank Project
					</p></SvgButton
				>
			</div>

			<h2>Example projects</h2>
			<div class="scrollable">
				{#each Object.entries(projectExamples) as [exampleName, exampleLoader]}
					<SvgButton
						icon={File_open}
						id={`open-example-${exampleName.replaceAll(" ", "-")}`}
						color="var(--text-color)"
						justifyContend="center"
						click={async () => {
							await projectHandler.openExampleProject(
								exampleLoader,
							);
						}}>{exampleName}</SvgButton
					>
				{/each}
			</div>
		</div>
		<div class="flex-column">
			<div class="bottom-border">
				<SvgButton
					click={async () => {
						await projectHandler.openProject();
					}}
					icon={File_open}
					id={`open-project`}
					color="var(--sidebar-text-color)"
					justifyContend="center"
					><p style="font-size: 1.7em">Open A Project</p></SvgButton
				>
			</div>

			<h2>Recent Projects</h2>
			<div class="scrollable">
				{#each $recentProjects as recentProject}
					<SvgButton
						icon={File_open}
						id={`open-project`}
						color="var(--sidebar-text-color)"
						justifyContend="center"
						click={async () => {
							await projectHandler.openRecentProject(
								recentProject,
							);
						}}
					>
						<p>
							{recentProject.directoryHandle.name}
						</p>
						<p class="accessed-text">
							Accessed <TimeStamp
								timeStamp={recentProject.lastAccessed}
							/>
						</p>
					</SvgButton>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		color: var(--text-color);
	}

	h2 {
		color: var(--text-color);
		text-align: center;
	}

	.bottom-border {
		border-bottom: 1px solid var(--text-color);
	}

	.accessed-text {
		margin-left: 1.5%;
		color: var(--text-secondary-color);
		font-size: 0.7em;
	}

	.scrollable {
		overflow-y: auto;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		width: 50%;
		margin-bottom: 50%;
		margin: 5%;
	}
</style>
