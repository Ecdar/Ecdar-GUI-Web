import { get } from "svelte/store";
import {
	FileSystemHandlePermissionMode,
	type FileSystemImplementation,
	type IDirectoryHandle,
	type IFileHandle,
	type IFileSystemHandle,
	type FileSystemPickerOptions,
	FileSystemWellKnownDirectory,
} from "../fileSystem/FileSystemImplementation";
import { getBestFileSystemImplementation } from "../fileSystem/FileSystemImplementations";
import type { IProjectAccess, ISerializedProjectAccess } from "./ProjectAccess";
import { project } from "../../globalState/activeProject";
import { Project } from "../automaton/Project";
import { ProjectId } from "../automaton/ProjectId";
import { FileStructureProject } from "./FileStructure";
import { fileHandler } from "../fileHandler/FileHandler";
import { ZodRawProject, type RawProject } from "../automaton/raw/RawProject";
import { recentProjects } from "$lib/globalState/recentProjects";

/**
 * Responsible for loading, saving, exporting, importing projects.
 */
class ProjectHandler {
	fileSystem: FileSystemImplementation<
		IFileSystemHandle,
		IFileHandle,
		IDirectoryHandle<IFileSystemHandle, IFileHandle>
	> = getBestFileSystemImplementation();
	private projectStructure = new FileStructureProject();

	private currentProjectHandle:
		| IDirectoryHandle<IFileSystemHandle, IFileHandle>
		| undefined = undefined;

	/**
	 * Opens a new and clean project.
	 */
	openNewProject() {
		this.registerProjectAccess(undefined);
		project.set(new Project(new ProjectId("New project")));
	}

	/**
	 * Will load the provided example project and set it as the active project.
	 */
	async openExampleProject(exampleLoader: () => Promise<RawProject>) {
		const rawProject = await exampleLoader();
		rawProject.name ||= "Example project";
		this.registerProjectAccess(undefined);
		project.set(
			Project.fromRaw(rawProject, { id: new ProjectId(rawProject.name) }),
		);
	}

	/**
	 * Will ask the user to choose a saved project and load it as the active project.
	 */
	async openProject(
		options?: FileSystemPickerOptions<
			IFileSystemHandle,
			IFileHandle,
			IDirectoryHandle<IFileSystemHandle, IFileHandle>
		>,
	): Promise<boolean> {
		const projectHandle = await this.fileSystem.showDirectoryPicker({
			mode: FileSystemHandlePermissionMode.readwrite,
			...options,
		});
		if (!projectHandle) return false;
		// TODO: fix this manual "as" cast
		const rawProject = (await this.projectStructure.toRaw(
			projectHandle,
		)) as RawProject;
		rawProject.name ||= options?.suggestedName || "Opened project";
		this.registerProjectAccess(projectHandle);
		project.set(
			Project.fromRaw(rawProject, {
				id: new ProjectId(rawProject.name),
			}),
		);
		return true;
	}

	/**
	 * Will open a previously saved project again.
	 * This will be done with as little user interaction as possible, but it might be necessary to request permission from the user.
	 *
	 * @returns true if a project was succesfully found and loaded, false if anything went wrong.
	 */
	async openRecentProject(
		recentProject: IProjectAccess<
			IFileSystemHandle,
			IFileHandle,
			IDirectoryHandle<IFileSystemHandle, IFileHandle>
		>,
	): Promise<boolean> {
		// check if we have access, otherwise ask the user to grant it
		const mode = FileSystemHandlePermissionMode.readwrite;
		const query = await recentProject.directoryHandle.queryPermission({
			mode,
		});
		if (query.state !== "granted") {
			const request =
				await recentProject.directoryHandle.requestPermission({ mode });
			if (request !== "granted") return false;
		}

		// TODO: fix this manual "as" cast
		const rawProject = (await this.projectStructure.toRaw(
			recentProject.directoryHandle,
		)) as RawProject;
		rawProject.name ||= "Opened project";
		this.registerProjectAccess(recentProject.directoryHandle);
		project.set(
			Project.fromRaw(rawProject, {
				id: new ProjectId(rawProject.name),
			}),
		);
		return true;
	}

	/**
	 * Will ask the user where to save the active project, then save it there.
	 */
	async saveProject(
		options?: FileSystemPickerOptions<
			IFileSystemHandle,
			IFileHandle,
			IDirectoryHandle<IFileSystemHandle, IFileHandle>
		>,
	): Promise<boolean> {
		const rawProject = get(project)?.toRaw();
		if (!rawProject) return false;
		const projectHandle = await this.fileSystem.showSaveDirectoryPicker({
			mode: FileSystemHandlePermissionMode.readwrite,
			enforceName: true,
			...options,
		});
		if (!projectHandle) return false;
		await this.projectStructure.fromRaw(projectHandle, rawProject);
		this.registerProjectAccess(projectHandle);
		return true;
	}

	/**
	 * Will save the active project in the passed directory.
	 * No user interaction required.
	 */
	async quickSaveProject(): Promise<boolean> {
		if (!this.currentProjectHandle) return false;
		const projectHandle = this.currentProjectHandle;
		if (
			(
				await projectHandle.queryPermission({
					mode: FileSystemHandlePermissionMode.readwrite,
				})
			).state !== "granted"
		) {
			return false;
		}
		const rawProject = get(project)?.toRaw();
		if (!rawProject) return false;
		await this.projectStructure.fromRaw(projectHandle, rawProject);
		this.registerProjectAccess(projectHandle);
		return true;
	}

	/**
	 * Will ask the user to pick a JSON file, then import it and set it as the active project.
	 */
	async importProject(options?: { suggestedName: string }): Promise<boolean> {
		const rawProject = (
			await fileHandler.openJsonFile(ZodRawProject, {
				multiple: false,
				startIn: FileSystemWellKnownDirectory.downloads,
			})
		)?.[0];
		if (!rawProject) return false;
		rawProject.name ||= options?.suggestedName || "Opened project";
		this.registerProjectAccess(undefined);
		project.set(
			Project.fromRaw(rawProject, {
				id: new ProjectId(rawProject.name),
			}),
		);
		return true;
	}

	/**
	 * Will ask the user where to save a JSON export of the active project.
	 */
	async exportProject() {
		const rawProject = get(project)?.toRaw();
		if (!rawProject) return false;
		await fileHandler.saveJsonFile(rawProject, {
			suggestedName: rawProject.name,
			startIn: FileSystemWellKnownDirectory.downloads,
		});
	}

	/**
	 * Takes a serialized project access DirectoryHandle and returns a deserialized version.
	 * @throws if the serialized version was made by an incompatible file system implementation.
	 */
	deserializeProjectAccess(
		projectAccess: ISerializedProjectAccess,
	): IProjectAccess<
		IFileSystemHandle,
		IFileHandle,
		IDirectoryHandle<IFileSystemHandle, IFileHandle>
	> {
		return this.fileSystem.deserializeProjectAccess(projectAccess);
	}

	private registerProjectAccess(
		directoryHandle:
			| IDirectoryHandle<IFileSystemHandle, IFileHandle>
			| undefined,
	) {
		// Remember it locally to enable quick save
		this.currentProjectHandle = directoryHandle;

		// Remember it in recent projects
		if (directoryHandle) {
			recentProjects.update((array) => {
				const recentProject = array.find((candidate) => {
					return (
						candidate.directoryHandle.name === directoryHandle.name
					);
				});
				if (recentProject) {
					recentProject.lastAccessed = Date.now();
				} else {
					array.unshift({
						lastAccessed: Date.now(),
						directoryHandle,
					});
				}
				return array;
			});
		}
	}
}

export const projectHandler = new ProjectHandler();
