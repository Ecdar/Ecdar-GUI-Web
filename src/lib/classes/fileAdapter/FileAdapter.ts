import { Project } from "../automaton";
import { ZodRawSystem } from "../automaton/system/raw/RawSystem";
import { ZodRawComponent } from "../automaton/component/raw/RawComponent";
import { deserializeRaw } from "../jsonAdapter/zodSerializers";
import {
	writeProjectRecursive,
	readProjectRecursive,
	type IFileElement,
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
import { FileSystemTauri } from "./FileSystemTauri";
import { FileSystemFallback } from "./FileSystemFallback";

export class FileAdapter {
	rawProject: RawProject;
	fs: FileSystem;
	savePath: string;

	constructor(fs?: FileSystem) {
		this.rawProject = {
			systems: [],
			components: [],
		};
		this.savePath = "";

		if (fs) {
			this.fs = fs;
			return;
		}

		if (FileSystemTauri.supported) {
			this.fs = new FileSystemTauri();
		} else {
			this.fs = new FileSystemFallback();
		} // TODO: add universal after implementing it
	}

	async openDialog(): Promise<string> {
		const path = await this.fs.openDialog();

		if (!path) throw new Error("No path selected");

		return path + "/";
	}

	async saveDialog(): Promise<string> {
		const path = await this.fs.saveDialog(this.savePath);

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
		if (!path && !this.savePath)
			throw new Error("Unable to save: No path selected");
		path = path
			? path.split("/").slice(0, -2).join("/")
			: this.savePath.split("/").slice(0, -2).join("/");
		await writeProjectRecursive(fileProject, path + "/", this.fs);
	}

	async load(path: string): Promise<Project> {
		this.savePath = path;
		const FileElements = await readProjectRecursive(path, this.fs);

		// reset rawProject
		this.rawProject = {
			systems: [],
			components: [],
		};

		if (!FileElements.children)
			throw new Error("Unable to load project (no files)");

		for (const file of FileElements.children) {
			if (file.type === "directory") this.loadDirectory(file);
			else this.loadFile(file);
		}

		return Project.fromRaw(this.rawProject, {
			id: new ProjectId(path.split("/").slice(-2)[0]),
		});
	}

	setFS(newFS: FileSystem): void {
		this.fs = newFS;
	}

	private loadFile(file: IFileElement): void {
		switch (file.filename) {
			case "GlobalDeclarations.json":
				console.log("Loading global declarations ... ");
				this.rawProject.globalDeclarations = deserializeRaw(
					ZodRawGlobalDeclarations,
					file.content ?? "",
				);

				console.log("Done");
				break;

			case "Queries.json":
				console.log("Loading queries ... ");
				this.rawProject.queries = deserializeRaw(
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
			this.rawProject.components?.push(component);
		}
	}

	private loadSystem(files: IFileElement[]): void {
		for (const file of files) {
			if (file.type === "directory") continue;
			const system = deserializeRaw(ZodRawSystem, file.content ?? "");
			this.rawProject.systems?.push(system);
		}
	}
}

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
