import fs from "fs-extra";
import path from "node:path";
import { resolveConfig, format } from "prettier";
import type { RawProject } from "./src/lib/classes/automaton/raw/RawProject";
import { DirectoryHandleNodejs } from "./src/lib/classes/fileSystem/FileSystemNodejs";
import { FileStructureProject } from "./src/lib/classes/projectHandler/FileStructure";
import { serializeRaw } from "./src/lib/classes/projectHandler/zodSerializers";
import chalk from "chalk";

const sourcePath = "./Ecdar-Common/Project-Examples/examples/";
const bundlePath = "./src/lib/projectExamples";

export const bundleProjectExamples = {
	name: "Bundle project examples",
	async buildStart() {
		try {
			await fs.emptyDir(bundlePath);
			await fs.remove(`${bundlePath}.ts`);
		} catch (error) {
			throw new Error(
				`Could not remove old project example bundle: ${
					(error as Error).message
				}`,
			);
		}
		const projects: RawProject[] = [];
		try {
			const projectNames = await fs.readdir(sourcePath);
			await Promise.all(
				projectNames.map(async (name) => {
					const directoryHandle = new DirectoryHandleNodejs(
						name,
						path.join(sourcePath, name),
					);
					const project = await new FileStructureProject().toRaw(
						directoryHandle,
					);
					project.name = name;
					projects.push(project);
				}),
			);
		} catch (error) {
			throw new Error(
				`Could not load project examples: ${(error as Error).message}`,
			);
		}

		try {
			projects.sort((a, b): number =>
				(a.name ?? "").localeCompare(b.name ?? "", "en"),
			);
			for (const project of projects) {
				const filepath = path.join(bundlePath, `${project.name}.ts`);
				const projectCode = `export default ${serializeRaw(project)}`;
				await fs.writeFile(filepath, projectCode);
			}

			let projectsCode = `export const projectExamples = {`;
			for (const project of projects) {
				projectsCode += `"${project.name}": async () => {return (await import("./projectExamples/${project.name}")).default},`;
			}
			projectsCode += `}`;
			const filepath = `${bundlePath}.ts`;
			const prettierConfig = await resolveConfig(filepath, {
				editorconfig: true,
			});
			projectsCode = await format(projectsCode, {
				filepath,
				...prettierConfig,
			});

			await fs.writeFile(filepath, projectsCode);
		} catch (error) {
			throw new Error(
				`Writing project example bundle to lib: ${
					(error as Error).message
				}`,
			);
		}
    
		/* eslint-disable-next-line no-console -- It is okay to do this in the build phase to let the dev know what is happening */
		console.log(`${chalk.green("✔")} bundled project examples`);
	},
};
