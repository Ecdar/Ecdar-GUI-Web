import { dialog, fs } from "@tauri-apps/api";
import {
	PROJECT_FILE_NAME_QUERIES,
	PROJECT_FOLDER_NAME_COMPONENTS,
	PROJECT_FILE_NAME_SYSTEM_DECLARATIONS,
	PROJECT_FILE_NAME_GLOBAL_DECLARATIONS,
	PROJECT_FOLDER_NAME_SYSTEMS,
} from "../project/Project";
import { ProjectError } from "../project/ProjectError";
import {
	Component,
	System,
	Queries,
	Declaration,
	type Named,
	type Raw,
} from "$lib/classes/automaton";
import { Project } from "$lib/classes/project/Project";
import type { IFileAdapterImplementation } from "./FileAdapterImplementation";
export class FileAdapterTauri implements IFileAdapterImplementation {
	supported() {
		return Boolean("__TAURI__" in globalThis);
	}

	private projectPath: string | undefined;

	async load() {
		const dirPath = (await dialog.open({
			title: "Choose an Ecdar project directory",
			directory: true,
			recursive: true,
			multiple: false,
		})) as string | null;

		if (dirPath === null) {
			throw new Error(ProjectError.DialogClosed);
		}

		const project = new Project();

		const pathSegments = dirPath.split(/[/\\]/g);
		project.name = pathSegments.at(-1) as string;
		this.projectPath = pathSegments.slice(0, -1).join("/");

		const dirFiles = await fs.readDir(dirPath, { recursive: true });

		async function mapChildren<T>(
			children: Awaited<ReturnType<typeof fs.readDir>>,
			deserializer: Raw.DeserializeRaw<T>,
		): Promise<T[]> {
			return Promise.all(
				children
					.map((child) => fs.readTextFile(child.path))
					.map(async (file) => deserializer(await file)),
			);
		}

		await Promise.all(
			dirFiles.map(async (entry) => {
				switch (entry.name) {
					case PROJECT_FOLDER_NAME_COMPONENTS:
						if (entry.children !== undefined) {
							project.components = await mapChildren(
								entry.children,
								Component.deserializeRaw,
							);
						}
						break;
					case PROJECT_FOLDER_NAME_SYSTEMS:
						if (entry.children !== undefined) {
							project.systems = await mapChildren(
								entry.children,
								System.deserializeRaw,
							);
						}
						break;
					case PROJECT_FILE_NAME_QUERIES:
						project.queries = Queries.deserializeRaw(
							await fs.readTextFile(entry.path),
						);
						break;
					case PROJECT_FILE_NAME_SYSTEM_DECLARATIONS:
						project.systemDeclarations = Declaration.deserializeRaw(
							await fs.readTextFile(entry.path),
						);
						break;
					case PROJECT_FILE_NAME_GLOBAL_DECLARATIONS:
						project.globalDeclarations = Declaration.deserializeRaw(
							await fs.readTextFile(entry.path),
						);
				}
			}),
		);

		return project;
	}

	async save(project: Project) {
		let dirPath = (await dialog.open({
			title: "Choose a directory",
			defaultPath: this.projectPath !== "" ? this.projectPath : undefined,
			directory: true,
			recursive: true,
			multiple: false,
		})) as string | null;

		if (dirPath === null) {
			throw new Error(ProjectError.SaveCanceled);
		}

		const pathSegments = dirPath.split(/[/\\]/g);
		const lastFolder = pathSegments.at(-1) as string;
		if (lastFolder === project.name) {
			dirPath = pathSegments.slice(0, -1).join("/");
		}

		this.projectPath = dirPath;

		const saveDir = `${dirPath}/${project.name}`;

		const dirExist = await fs.exists(saveDir);
		if (dirExist) {
			const dialogAnswer = await dialog.confirm(
				`There already exists a directory named ${project.name} in that directory, would you like to overwrite`,
			);
			if (!dialogAnswer) {
				throw new Error(ProjectError.SaveCanceled);
			}
		} else {
			await fs.createDir(saveDir);
		}

		await (this.writeToDir as (dir: string) => Promise<void>)(saveDir);
	}

	async quickSave(project: Project) {
		if (!this.projectPath || this.projectPath === "") return;

		const dir = `${this.projectPath}/${project.name}`;
		if (!(await fs.exists(dir))) {
			await this.save(project);
		}

		await this.writeToDir(dir, project);
	}

	/**
	 * DESTRUCTIVE FUNCTION
	 * Writes the project into the directory
	 */
	private async writeToDir(dir: string, project: Project) {
		async function mapNamedArr<T extends Raw.SerializeRaw & Named>(
			obj: T[],
			dir: string,
		) {
			await Promise.all([
				obj.map(async (o) => {
					await fs.writeFile(
						`${dir}/${o.name}.json`,
						o.serializeRaw(),
					);
				}),
			]);
		}

		async function deleteUnneededFiles<T extends Named>(
			obj: T[],
			dir: string,
		) {
			const filenames = obj.map((o) => `${o.name}.json`);
			return Promise.all(
				(await fs.readDir(dir)).map((file) =>
					filenames.includes(file.name as string)
						? undefined
						: async () => {
								await fs.removeFile(file.path);
						  },
				),
			);
		}

		const systemDir = `${dir}/${PROJECT_FOLDER_NAME_SYSTEMS}`;
		const componentDir = `${dir}/${PROJECT_FOLDER_NAME_COMPONENTS}`;
		await Promise.all(
			Object.entries(this).map(async ([key, value]) => {
				switch (key) {
					case "systems":
						if (!(await fs.exists(systemDir))) {
							await fs.createDir(systemDir);
						}
						await Promise.all([
							mapNamedArr(
								value as typeof project.systems,
								systemDir,
							),
							deleteUnneededFiles(
								value as typeof project.systems,
								systemDir,
							),
						]);
						break;
					case "components":
						if (!(await fs.exists(componentDir))) {
							await fs.createDir(componentDir);
						}
						await Promise.all([
							mapNamedArr(
								value as typeof project.components,
								componentDir,
							),
							deleteUnneededFiles(
								value as typeof project.components,
								componentDir,
							),
						]);
						break;
					case "queries":
						await fs.writeTextFile(
							`${dir}/${PROJECT_FILE_NAME_QUERIES}`,
							(value as typeof project.queries).serializeRaw(),
						);
						break;
					case "systemDeclarations":
						await fs.writeFile(
							`${dir}/${PROJECT_FILE_NAME_SYSTEM_DECLARATIONS}`,
							(
								value as typeof project.systemDeclarations
							).serializeRaw(),
						);
						break;
					case "globalDeclarations":
						await fs.writeFile(
							`${dir}/${PROJECT_FILE_NAME_GLOBAL_DECLARATIONS}`,
							(
								value as typeof project.globalDeclarations
							).serializeRaw(),
						);
						break;
				}
			}),
		);
	}
}
