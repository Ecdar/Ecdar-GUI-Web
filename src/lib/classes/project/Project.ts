import * as Automata from "../automaton";
import type { SerializeRaw, Named } from "../automaton";
import { ProjectError } from "./ProjectError";
import { inTauri } from "$lib/tauri";
export type LoadFn = () => Promise<Project>;

const PROJECT_FOLDER_NAME_SYSTEMS = "Systems";
const PROJECT_FOLDER_NAME_COMPONENTS = "Components";
const PROJECT_FILE_NAME_QUERIES = "Queries.json";
const PROJECT_FILE_NAME_SYSTEM_DECLARATIONS = "SystemDeclarations.json";
const PROJECT_FILE_NAME_GLOBAL_DECLARATIONS = "GlobalDeclarations.json";

/**
 * Includes all the information needed to make an Ecdar Project
 * */
export class Project implements Named {
	/**
	 * The name of the project, and the name of the save folder
	 * */
	name: string;

	/**
	 * Tauri ONLY, the directory of the saved files
	 * */
	srcDir?: string;

	/**
	 * All components in the project
	 * */
	components: Automata.Component[];

	/**
	 * All systems in the project
	 * */
	systems: Automata.System[];

	/**
	 * All queries of the project
	 * */
	queries: Automata.Queries;

	/**
	 * The system declaration of the project
	 * */
	systemDeclarations: Automata.Declaration;

	/**
	 * The global declarations of the project
	 * */
	globalDeclarations: Automata.Declaration;
	constructor(
		name = "New Project",
		srcDir: string | undefined = inTauri ? "" : undefined,
		components: Automata.Component[] = [],
		systems: Automata.System[] = [],
		queries = new Automata.Queries(),
		systemDeclarations = new Automata.Declaration(
			Automata.DeclarationType.SYSETEM,
		),
		globalDeclarations = new Automata.Declaration(
			Automata.DeclarationType.GLOBAL,
		),
	) {
		this.name = name;
		this.srcDir = srcDir;
		this.components = components;
		this.systems = systems;
		this.queries = queries;
		this.systemDeclarations = systemDeclarations;
		this.globalDeclarations = globalDeclarations;
	}
	/**
	 * Opens a file explore and prompts you to choose a folder
	 * containing an Ecdar project file structure
	 * */
	static load: LoadFn = inTauri
		? async () => {
				// IN TAURI
				const { dialog, fs } = await import("@tauri-apps/api");

				let d = (await dialog.open({
					title: "Choose an Ecdar project directory",
					directory: true,
					recursive: true,
					multiple: false,
				})) as string | null;

				if (d === null) {
					throw new Error(ProjectError.DialogClosed);
				}

				let project = new Project();

				let path = d.split(/[\/\\]/g);
				project.name = path.at(-1) as string;
				project.srcDir = path.slice(0, -1).join("/");

				let dir = await fs.readDir(d, { recursive: true });

				async function mapChildren<T>(
					children: Awaited<ReturnType<typeof fs.readDir>>,
					fn: Automata.DeserializeRaw<T>,
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
								project.queries =
									Automata.Queries.deserializeRaw(
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
		  }
		: // IN THE BROWSER
		  () => {
				console.log(inTauri);
				return new Promise((resolve, reject) => {
					let input = document.createElement("input");
					input.type = "file";
					input.webkitdirectory = true;
					input.onchange = () => {
						if (input.files != null) {
							let project = new Project();
							for (let file of input.files) {
								const [projectName, type] =
									file.webkitRelativePath.split(/[\\\/]/g);
								const reader = new FileReader();
								reader.readAsText(file);
								reader.addEventListener("load", () => {
									switch (type) {
										case PROJECT_FOLDER_NAME_COMPONENTS:
											project.components.push(
												Automata.Component.deserializeRaw(
													reader.result as string,
												),
											);
											break;
										case PROJECT_FOLDER_NAME_SYSTEMS:
											project.systems.push(
												Automata.System.deserializeRaw(
													reader.result as string,
												),
											);
											break;
										case PROJECT_FILE_NAME_QUERIES:
											project.queries =
												Automata.Queries.deserializeRaw(
													reader.result as string,
												);
											break;
										case PROJECT_FILE_NAME_SYSTEM_DECLARATIONS:
											project.systemDeclarations =
												Automata.Declaration.deserializeRaw(
													reader.result as string,
												);
											break;
										case PROJECT_FILE_NAME_GLOBAL_DECLARATIONS:
											project.globalDeclarations =
												Automata.Declaration.deserializeRaw(
													reader.result as string,
												);
											project.name = projectName;
											break;
									}
								});
							}
							resolve(project);
						}
						reject(new Error(ProjectError.DialogClosed));
					};
					input.click();
				});
		  };

	/**
	 * # TAURI:
	 * Saves the project in a folder
	 * Will throw an error if the file explore was canceled
	 *
	 * # BROWSER (NOT IMPLEMENTED)
	 * Will download a zip of all files
	 * */
	readonly save = inTauri
		? async () => {
				const { dialog, fs } = await import("@tauri-apps/api");
				let dir = (await dialog.open({
					title: "Choose an directory",
					defaultPath: this.srcDir !== "" ? this.srcDir : undefined,
					directory: true,
					recursive: true,
					multiple: false,
				})) as string;

				if (dir === null) {
					throw new Error(ProjectError.SaveCanceled);
				}

				let split = dir.split(/[\/\\]/g);
				let lastFolder = split.at(-1) as string;
				if (lastFolder === this.name) {
					dir = split.slice(0, -1).join("/");
				}

				this.srcDir = dir;

				let saveDir = `${dir}/${this.name}`;

				let dirExist = await fs.exists(saveDir);
				if (dirExist) {
					let dialogAnswer = await dialog.confirm(
						`There already exists a directory named ${this.name} in that directory, would you like to over write`,
					);
					if (!dialogAnswer) {
						throw new Error(ProjectError.SaveCanceled);
					}
				} else {
					fs.createDir(saveDir);
				}

				// Its fine because of the inTauri check done on both functions
				(this.writeToDir as any)(saveDir);
		  }
		: async () => {
				/* DOWNLOAD FILES AS ZIP */
		  };

	/**
	 * TAURI ONLY
	 * Saves the project in {srcDir}/{name}
	 * */
	readonly quickSave = inTauri
		? async () => {
				const { fs } = await import("@tauri-apps/api");
				const dir = `${this.srcDir}/${this.name}`;
				if (!fs.exists(dir)) {
					throw Error(ProjectError.NoDir);
				}

				// Its fine because of the inTauri check done on both functions
				(this.writeToDir as any)(dir);
		  }
		: undefined;

	/**
	 * TAURI ONLY
	 * DESTRUCTIVE FUNCTION
	 * Writes the project into the directory
	 * */
	readonly writeToDir = inTauri
		? async (dir: string) => {
				const { fs } = await import("@tauri-apps/api");

				async function mapNamedArr<T extends SerializeRaw & Named>(
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
					let filenames = obj.map((o) => `${o.name}.json`);
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

				await Promise.all(
					Object.entries(this).map(async ([k, v]) => {
						switch (k) {
							case "systems":
								const systemDir = `${dir}/${PROJECT_FOLDER_NAME_SYSTEMS}`;
								if (!(await fs.exists(systemDir))) {
									fs.createDir(systemDir);
								}
								await Promise.all([
									mapNamedArr(
										v as typeof this.systems,
										systemDir,
									),
									deleteUnneededFiles(
										v as typeof this.systems,
										systemDir,
									),
								]);
								break;
							case "components":
								const componentDir = `${dir}/${PROJECT_FOLDER_NAME_COMPONENTS}`;
								if (!(await fs.exists(componentDir))) {
									fs.createDir(componentDir);
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
		  }
		: undefined;
}
