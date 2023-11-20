import { Project } from "../automaton";
import { ZodRawSystem } from "../automaton/system/raw/RawSystem";
import { ZodRawComponent } from "../automaton/component/raw/RawComponent";
import { deserializeRaw } from "../jsonAdapter/zodSerializers";
import {
	writeProjectRecursive,
	type IFileElement,
	readProjectRecursive,
} from "./RecursiveFilesSystem";
import type { RawProject } from "../automaton/raw/RawProject";
import { ZodRawGlobalDeclarations } from "../automaton/raw/RawGlobalDeclarations";
import { ZodRawQuery } from "../automaton/raw/RawQuery";
import { z } from "zod";
import { project } from "$lib/globalState/activeProject";
import { ProjectId } from "../automaton/ProjectId";
import { get } from "svelte/store";
import type { Components } from "../automaton/component/Components";
import type { Systems } from "../automaton/system/Systems";
import type { FileSystem } from "./FileSystem";
import { TauriFileSystem } from "./FileAdapterTauri";

let rawProject: RawProject;
let fs: FileSystem;
let savePath: string;

class FileAdapter {
	async openDialog(): Promise<string> {
		const path = await fs.openDialog();

		if (!path) throw new Error("No path selected");

		return path + "/";
	}

	async saveDialog(): Promise<string> {
		const path = await fs.saveDialog(savePath);

		if (!path) throw new Error("No path selected");

		return path + "/";
	}

	async save(path: string | undefined): Promise<void> {
		const currentProject: Project | undefined = get(project);

		if (!currentProject) throw new Error("No project loaded");

		const fileProject: IFileElement = {
			type: "directory",
			filename: path
				? path.split("/").slice(-2)[0]
				: currentProject.id.rawId,
			children: [
				{
					type: "directory",
					filename: "Components/",
					children: mapFiles(currentProject.components),
				},
				{
					type: "directory",
					filename: "System/",
					children: mapFiles(currentProject.systems),
				},
				{
					type: "file",
					filename: "GlobalDeclarations.json",
					content: JSON.stringify(
						currentProject.globalDeclarations.toRaw(),
					),
				},
				{
					type: "file",
					filename: "Queries.json",
					content: JSON.stringify(
						currentProject.queries.map((query) => query.toRaw()),
					),
				},
			],
		};
		if (!path && !savePath)
			throw new Error("Unable to save: No path selected");
		path = path
			? path.split("/").slice(0, -2).join("/")
			: savePath.split("/").slice(0, -2).join("/");
		await writeProjectRecursive(fileProject, path + "/", fs);
	}

	async load(path: string): Promise<void> {
		savePath = path;
		const FileElements = await readProjectRecursive(path, fs);

		// reset rawProject
		rawProject = {
			systems: [],
			components: [],
		};

		if (!FileElements.children)
			throw new Error("Unable to load project (no files)");

		for (const file of FileElements.children) {
			if (file.type === "directory") this.loadDirectory(file);
			else this.loadFile(file);
		}

		project.set(
			Project.fromRaw(rawProject, {
				id: new ProjectId(path.split("/").slice(-2)[0]),
			}),
		);
	}

	private loadFile(file: IFileElement): void {
		switch (file.filename) {
			case "GlobalDeclarations.json":
				console.log("Loading global declarations ... ");
				rawProject.globalDeclarations = deserializeRaw(
					ZodRawGlobalDeclarations,
					file.content ?? "",
				);

				console.log("Done");
				break;

			case "Queries.json":
				console.log("Loading queries ... ");
				rawProject.queries = deserializeRaw(
					z.array(ZodRawQuery),
					file.content ?? "",
				);

				console.log("Done");
				break;

			default:
				break;
		}
	}

	private loadDirectory(file: IFileElement): void {
		switch (file.filename) {
			case "Components":
				console.log("Loading components ... ");
				this.loadComponents(file.children ?? []);

				console.log("Done");
				break;
			case "System":
				console.log("Loading system ... ");
				this.loadSystem(file.children ?? []);

				console.log("Done");
				break;

			default:
				break;
		}
	}

	private loadComponents(files: IFileElement[]): void {
		for (const file of files) {
			if (file.type === "directory") continue;
			console.log("loading component" + file.filename);
			console.log(file.content);
			const component = deserializeRaw(
				ZodRawComponent,
				file.content ?? "",
			);
			rawProject.components?.push(component);
		}
	}

	private loadSystem(files: IFileElement[]): void {
		for (const file of files) {
			if (file.type === "directory") continue;
			const system = deserializeRaw(ZodRawSystem, file.content ?? "");
			rawProject.systems?.push(system);
		}
	}
}

if (TauriFileSystem.supported) {
	fs = new TauriFileSystem();
} // TODO: add universal after implementing it

function mapFiles<T extends Components | Systems>(input: T): IFileElement[] {
	const output: IFileElement[] = [];
	for (const component of input) {
		output.push({
			type: "file",
			filename: component.id.rawId + ".json",
			content: JSON.stringify(component.toRaw()),
		});
	}
	return output;
}

export const fileAdapter = new FileAdapter();
