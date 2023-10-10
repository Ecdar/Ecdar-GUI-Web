import * as Automata from "$lib/classes/automaton";
import type { Named } from "$lib/classes/automaton";
import { ProjectError } from "../ProjectError";
import { Project } from "../Project";
import {
	PROJECT_FILE_NAME_QUERIES,
	PROJECT_FOLDER_NAME_COMPONENTS,
	PROJECT_FILE_NAME_SYSTEM_DECLARATIONS,
	PROJECT_FILE_NAME_GLOBAL_DECLARATIONS,
	PROJECT_FOLDER_NAME_SYSTEMS,
} from "../Project";
import type { Features } from "../features/Feature";

/**
 * Includes all the information needed to make an Ecdar Project
 * */
export class TauriProject extends Project {
	/**
	 * The directory of the saved files
	 * */
	srcDir: string;

	constructor(
		name = "New Project",
		srcDir: string = "",
		components: Automata.Component[] = [],
		systems: Automata.System[] = [],
		queries = new Automata.Queries(),
		systemDeclarations = new Automata.Declaration(
			Automata.DeclarationType.SYSTEM,
		),
		globalDeclarations = new Automata.Declaration(
			Automata.DeclarationType.GLOBAL,
		),
	) {
		super(
			name,
			components,
			systems,
			queries,
			systemDeclarations,
			globalDeclarations,
		);
		this.srcDir = srcDir;
	}

	static create(
		name?: string,
		components?: Automata.Component[],
		systems?: Automata.System[],
		queries?: Automata.Queries,
		systemDeclarations?: Automata.Declaration,
		globalDeclarations?: Automata.Declaration,
	) {
		return new TauriProject(
			name,
			undefined,
			components,
			systems,
			queries,
			systemDeclarations,
			globalDeclarations,
		);
	}
	/**
	 * Opens a file explore and prompts you to choose a folder
	 * containing an Ecdar project file structure
	 * */
	static override readonly load = async () => {
		// IN TAURI
		const { dialog, fs } = await import("@tauri-apps/api");

		const d = (await dialog.open({
			title: "Choose an Ecdar project directory",
			directory: true,
			recursive: true,
			multiple: false,
		})) as string | null;

		if (d === null) {
			throw new Error(ProjectError.DialogClosed);
		}

		const project = new TauriProject();

		const path = d.split(/[/\\]/g);
		project.name = path.at(-1) as string;
		project.srcDir = path.slice(0, -1).join("/");

		const dir = await fs.readDir(d, { recursive: true });

		async function mapChildren<T>(
			children: Awaited<ReturnType<typeof fs.readDir>>,
			fn: Automata.Raw.DeserializeRaw<T>,
		): Promise<T[]> {
			return Promise.all(
				children
					.map((c) => fs.readTextFile(c.path))
					.map(async (f) => fn(await f)),
			);
		}

		await Promise.all(
			dir.map(async (entry) => {
				switch (entry.name) {
					case PROJECT_FOLDER_NAME_COMPONENTS:
						if (entry.children !== undefined) {
							project.components = await mapChildren(
								entry.children,
								Automata.Component.deserializeRaw,
							);
						}
						break;
					case PROJECT_FOLDER_NAME_SYSTEMS:
						if (entry.children !== undefined) {
							project.systems = await mapChildren(
								entry.children,
								Automata.System.deserializeRaw,
							);
						}
						break;
					case PROJECT_FILE_NAME_QUERIES:
						project.queries = Automata.Queries.deserializeRaw(
							await fs.readTextFile(entry.path),
						);
						break;
					case PROJECT_FILE_NAME_SYSTEM_DECLARATIONS:
						project.systemDeclarations =
							Automata.Declaration.deserializeRaw(
								await fs.readTextFile(entry.path),
							);
						break;
					case PROJECT_FILE_NAME_GLOBAL_DECLARATIONS:
						project.globalDeclarations =
							Automata.Declaration.deserializeRaw(
								await fs.readTextFile(entry.path),
							);
				}
			}),
		);

		return project;
	};

	override readonly features: Features = {
		quickSave: async () => {
			const { fs } = await import("@tauri-apps/api");
			const dir = `${this.srcDir}/${this.name}`;
			if (!(await fs.exists(dir))) {
				await (this.features.save as () => Promise<void>)();
			}

			await (this.writeToDir as (dir: string) => Promise<void>)(dir);
		},

		save: async () => {
			const { dialog, fs } = await import("@tauri-apps/api");
			let dir = (await dialog.open({
				title: "Choose an directory",
				defaultPath: this.srcDir !== "" ? this.srcDir : undefined,
				directory: true,
				recursive: true,
				multiple: false,
			})) as string | null;

			if (dir === null) {
				throw new Error(ProjectError.SaveCanceled);
			}

			const split = dir.split(/[/\\]/g);
			const lastFolder = split.at(-1) as string;
			if (lastFolder === this.name) {
				dir = split.slice(0, -1).join("/");
			}

			this.srcDir = dir;

			const saveDir = `${dir}/${this.name}`;

			const dirExist = await fs.exists(saveDir);
			if (dirExist) {
				const dialogAnswer = await dialog.confirm(
					`There already exists a directory named ${this.name} in that directory, would you like to over write`,
				);
				if (!dialogAnswer) {
					throw new Error(ProjectError.SaveCanceled);
				}
			} else {
				await fs.createDir(saveDir);
			}

			await (this.writeToDir as (dir: string) => Promise<void>)(saveDir);
		},
	};

	/**
	 * DESTRUCTIVE FUNCTION
	 * Writes the project into the directory
	 * */
	readonly writeToDir = async (dir: string) => {
		const { fs } = await import("@tauri-apps/api");

		async function mapNamedArr<T extends Automata.Raw.SerializeRaw & Named>(
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
			Object.entries(this).map(async ([k, v]) => {
				switch (k) {
					case "systems":
						if (!(await fs.exists(systemDir))) {
							await fs.createDir(systemDir);
						}
						await Promise.all([
							mapNamedArr(v as typeof this.systems, systemDir),
							deleteUnneededFiles(
								v as typeof this.systems,
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
								v as typeof this.components,
								componentDir,
							),
							deleteUnneededFiles(
								v as typeof this.components,
								componentDir,
							),
						]);
						break;
					case "queries":
						await fs.writeTextFile(
							`${dir}/${PROJECT_FILE_NAME_QUERIES}`,
							(v as typeof this.queries).serializeRaw(),
						);
						break;
					case "systemDeclarations":
						await fs.writeFile(
							`${dir}/${PROJECT_FILE_NAME_SYSTEM_DECLARATIONS}`,
							(
								v as typeof this.systemDeclarations
							).serializeRaw(),
						);
						break;
					case "globalDeclarations":
						await fs.writeFile(
							`${dir}/${PROJECT_FILE_NAME_GLOBAL_DECLARATIONS}`,
							(
								v as typeof this.globalDeclarations
							).serializeRaw(),
						);
						break;
				}
			}),
		);
	};
}
