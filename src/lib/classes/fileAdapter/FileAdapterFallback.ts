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
} from "$lib/classes/automaton";
import { Project } from "../project/Project";
import type { IFileAdapterImplementation } from "./FileAdapterImplementation";
export class FileAdapterFallback implements IFileAdapterImplementation {
	/**
	 * This is our last-ditch effort to support file loading, so it will always be "supported".
	 */
	supported() {
		return true;
	}

	load() {
		return new Promise<Project>((resolve, reject) => {
			const input = document.createElement("input");
			if (!("webkitdirectory" in input)) {
				alert("Sorry, your browser does not support loading projects");
				reject(new Error(ProjectError.LoadUnsupported));
			}
			input.type = "file";
			input.webkitdirectory = true;
			input.addEventListener("change", () => {
				if (input.files != null) {
					const project = new Project();
					for (const file of input.files) {
						const [projectName, type] =
							file.webkitRelativePath.split(/[\\/]/gv);
						const reader = new FileReader();
						reader.addEventListener(
							"load",
							() => {
								switch (type) {
									case PROJECT_FOLDER_NAME_COMPONENTS:
										project.components.push(
											Component.deserializeRaw(
												reader.result as string,
											),
										);
										break;
									case PROJECT_FOLDER_NAME_SYSTEMS:
										project.systems.push(
											System.deserializeRaw(
												reader.result as string,
											),
										);
										break;
									case PROJECT_FILE_NAME_QUERIES:
										project.queries =
											Queries.deserializeRaw(
												reader.result as string,
											);
										break;
									case PROJECT_FILE_NAME_SYSTEM_DECLARATIONS:
										project.systemDeclarations =
											Declaration.deserializeRaw(
												reader.result as string,
											);
										break;
									case PROJECT_FILE_NAME_GLOBAL_DECLARATIONS:
										project.globalDeclarations =
											Declaration.deserializeRaw(
												reader.result as string,
											);
										project.name = projectName;
										break;
								}
							},
							{ once: true },
						);
						reader.readAsText(file);
					}
					resolve(project);
				}
				reject(new Error(ProjectError.DialogClosed));
			});
			input.click();
		});
	}

	save() {
		return new Promise<void>((resolve) => {
			// TODO: Make some sort of fallback file downloader
			alert("Sorry, your browser does not support saving projects");
			resolve();
		});
	}

	quickSave() {
		return new Promise<void>((resolve) => {
			// TODO: Make a better error message for this
			alert("Sorry, your browser does not support saving projects");
			resolve();
		});
	}
}
