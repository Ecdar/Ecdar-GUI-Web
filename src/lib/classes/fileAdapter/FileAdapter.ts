import { ZodRawSystem } from "../automaton/system/raw/RawSystem";
import { ZodRawComponent } from "../automaton/component/raw/RawComponent";
import { deserializeRaw, serializeRaw } from "../jsonAdapter/zodSerializers";
import {
	writeProjectRecursive,
	readProjectRecursive,
	type IFileElement,
} from "./RecursiveFilesSystem";
import type { RawProject } from "../automaton/raw/RawProject";
import { ZodRawGlobalDeclarations } from "../automaton/raw/RawGlobalDeclarations";
import { ZodRawSystemDeclarations } from "../automaton/raw/RawSystemDeclarations";
import { ZodRawQuery } from "../automaton/raw/RawQuery";
import { z } from "zod";
import type { RawComponents } from "../automaton/component/raw/RawComponents";
import type { RawSystems } from "../automaton/system/raw/RawSystems";
import type { FileSystem } from "./FileSystem";
import { FileSystemTauri } from "./FileSystemTauri";
import { FileSystemFallback } from "./FileSystemFallback";

export class FileAdapter {
	fs: FileSystem;
	savePath: string = "";

	constructor(fs?: FileSystem) {
		if (fs) {
			this.fs = fs;
		} else if (FileSystemTauri.supported) {
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

	async save(
		rawProject: RawProject,
		path: string | undefined,
	): Promise<void> {
		if (!rawProject) throw new Error("No project loaded");

		const fileProject: IFileElement = {
			type: "directory",
			filename:
				path?.split("/").slice(-2)[0] ||
				rawProject.name ||
				"Ecdar project",
			children: [],
		};
		if (rawProject.components) {
			fileProject.children?.push({
				type: "directory",
				filename: "Components/",
				children: mapFiles(rawProject.components),
			});
		}
		if (rawProject.systems) {
			fileProject.children?.push({
				type: "directory",
				filename: "Systems/",
				children: mapFiles(rawProject.systems),
			});
		}
		if (rawProject.globalDeclarations) {
			fileProject.children?.push({
				type: "file",
				filename: "GlobalDeclarations.json",
				content: serializeRaw(rawProject.globalDeclarations),
			});
		}
		if (rawProject.systemDeclarations) {
			fileProject.children?.push({
				type: "file",
				filename: "SystemDeclarations.json",
				content: serializeRaw(rawProject.systemDeclarations),
			});
		}
		if (rawProject.queries) {
			fileProject.children?.push({
				type: "file",
				filename: "Queries.json",
				content: serializeRaw(rawProject.queries),
			});
		}

		if (!path && !this.savePath)
			throw new Error("Unable to save: No path selected");
		path = path
			? path.split("/").slice(0, -2).join("/")
			: this.savePath.split("/").slice(0, -2).join("/");
		await writeProjectRecursive(fileProject, path + "/", this.fs);
	}

	async load(path: string): Promise<RawProject> {
		this.savePath = path;
		const FileElements = await readProjectRecursive(path, this.fs);

		const rawProject: RawProject = {
			name: path.split("/").slice(-2)[0],
		};

		if (!FileElements.children)
			throw new Error("Unable to load project (no files)");

		for (const file of FileElements.children) {
			if (file.type === "directory") this.loadDirectory(rawProject, file);
			else this.loadFile(rawProject, file);
		}

		return rawProject;
	}

	private loadFile(rawProject: RawProject, file: IFileElement): void {
		switch (file.filename) {
			case "GlobalDeclarations.json":
				//console.log("Loading global declarations ... ");
				rawProject.globalDeclarations = deserializeRaw(
					ZodRawGlobalDeclarations,
					file.content ?? "",
				);

				//console.log("Done");
				break;

			case "SystemDeclarations.json":
				//console.log("Loading system declarations ... ");
				rawProject.systemDeclarations = deserializeRaw(
					ZodRawSystemDeclarations,
					file.content ?? "",
				);

				//console.log("Done");
				break;

			case "Queries.json":
				//console.log("Loading queries ... ");
				rawProject.queries = deserializeRaw(
					z.array(ZodRawQuery),
					file.content ?? "",
				);

				//console.log("Done");
				break;

			default:
				break;
		}
	}

	private loadDirectory(rawProject: RawProject, file: IFileElement): void {
		switch (file.filename) {
			case "Components":
				//console.log("Loading components ... ");
				this.loadComponents(rawProject, file.children ?? []);

				//console.log("Done");
				break;
			case "Systems":
				//console.log("Loading systems ... ");
				this.loadSystems(rawProject, file.children ?? []);

				//console.log("Done");
				break;

			default:
				break;
		}
	}

	private loadComponents(
		rawProject: RawProject,
		files: IFileElement[],
	): void {
		for (const file of files) {
			if (file.type === "directory") continue;
			//console.log("loading component" + file.filename);
			//console.log(file.content);
			const component = deserializeRaw(
				ZodRawComponent,
				file.content ?? "",
			);
			rawProject.components ??= [];
			rawProject.components.push(component);
		}
	}

	private loadSystems(rawProject: RawProject, files: IFileElement[]): void {
		for (const file of files) {
			if (file.type === "directory") continue;
			const system = deserializeRaw(ZodRawSystem, file.content ?? "");
			rawProject.systems ??= [];
			rawProject.systems.push(system);
		}
	}
}

function mapFiles<T extends RawComponents | RawSystems>(
	items: T,
): IFileElement[] {
	const output: IFileElement[] = [];
	if (items) {
		for (const item of items) {
			output.push({
				type: "file",
				filename: `${item.name}.json`,
				content: serializeRaw(item),
			});
		}
	}
	return output;
}
