import { ProjectError } from "../ProjectError";
import * as Automata from "$lib/classes/automaton";
import { Project } from "../Project";
import {
	PROJECT_FILE_NAME_QUERIES,
	PROJECT_FOLDER_NAME_COMPONENTS,
	PROJECT_FILE_NAME_SYSTEM_DECLARATIONS,
	PROJECT_FILE_NAME_GLOBAL_DECLARATIONS,
	PROJECT_FOLDER_NAME_SYSTEMS,
} from "../Project";
import type { Features } from "../features/Feature";
export class WebkitDirProject extends Project {
	constructor(
		name = "New Project",
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
	}

	static create(
		name?: string,
		components?: Automata.Component[],
		systems?: Automata.System[],
		queries?: Automata.Queries,
		systemDeclarations?: Automata.Declaration,
		globalDeclarations?: Automata.Declaration,
	) {
		return new WebkitDirProject(
			name,
			components,
			systems,
			queries,
			systemDeclarations,
			globalDeclarations,
		);
	}

	static override readonly load: () => Promise<WebkitDirProject> = () => {
		return new Promise((resolve, reject) => {
			const input = document.createElement("input");
			input.type = "file";
			input.webkitdirectory = true;
			input.onchange = () => {
				if (input.files != null) {
					const project = new WebkitDirProject();
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
	override readonly features: Features = {};
}

/*
 */
