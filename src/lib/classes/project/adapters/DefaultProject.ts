import { ProjectError } from "../ProjectError";
import * as Automata from "$lib/classes/automaton";
import type { Project } from "../Project";
import {
	PROJECT_FILE_NAME_QUERIES,
	PROJECT_FOLDER_NAME_COMPONENTS,
	PROJECT_FILE_NAME_SYSTEM_DECLARATIONS,
	PROJECT_FILE_NAME_GLOBAL_DECLARATIONS,
	PROJECT_FOLDER_NAME_SYSTEMS,
} from "../Project";
import type { Features } from "../features/Feature";
export class DefaultProject implements Project {
	/**
	 * The name of the project, and the name of the save folder
	 * */
	name: string;

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
		this.components = components;
		this.systems = systems;
		this.queries = queries;
		this.systemDeclarations = systemDeclarations;
		this.globalDeclarations = globalDeclarations;
	}

	static create(
		name?: string,
		components?: Automata.Component[],
		systems?: Automata.System[],
		queries?: Automata.Queries,
		systemDeclarations?: Automata.Declaration,
		globalDeclarations?: Automata.Declaration,
	) {
		return new DefaultProject(
			name,
			components,
			systems,
			queries,
			systemDeclarations,
			globalDeclarations,
		);
	}

	static readonly load: () => Promise<DefaultProject> = () => {
		return new Promise((resolve, reject) => {
			const input = document.createElement("input");
			input.type = "file";
			input.webkitdirectory = true;
			input.onchange = () => {
				if (input.files != null) {
					const project = new DefaultProject();
					for (const file of input.files) {
						const [projectName, type] =
							file.webkitRelativePath.split(/[\\/]/g);
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
	readonly features: Features = {};
}

/*
 */
