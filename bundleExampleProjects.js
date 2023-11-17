import fs from "fs-extra";
import path from "node:path";
import { format } from "prettier";

const sourcePath = "./Ecdar-Common/Project-Examples/";
const bundlePath = "./src/lib/projectExamples";

console.log("Removing old project example bundle");
await fs.emptyDir(bundlePath);
await fs.remove(`${bundlePath}.ts`);

const projects = [];

console.log("Discovering project examples");
const projectNames = await fs.readdir(sourcePath);
await Promise.all(
	projectNames.map(async (name) => {
		const project = {
			name,
		};

		const componentsPath = getDirPath("components");
		if (await fs.pathExists(componentsPath)) {
			project.components = [];
			for (const componentName of await fs.readdir(componentsPath)) {
				project.components.push(
					await fs.readJson(path.join(componentsPath, componentName)),
				);
			}
		}

		const systemsPath = getDirPath("systems");
		if (await fs.pathExists(systemsPath)) {
			project.systems = [];
			for (const systemName of await fs.readdir(systemsPath)) {
				project.systems.push(
					await fs.readJson(path.join(systemsPath, systemName)),
				);
			}
		}

		const queriesPath = getDirPath("queries.json");
		if (await fs.pathExists(queriesPath)) {
			project.queries = await fs.readJson(queriesPath);
		}

		const systemDeclarationsPath = getDirPath("systemDeclarations.json");
		if (await fs.pathExists(systemDeclarationsPath)) {
			project.systemDeclarations = await fs.readJson(
				systemDeclarationsPath,
			);
		}

		const globalDeclarationsPath = getDirPath("globalDeclarations.json");
		if (await fs.pathExists(globalDeclarationsPath)) {
			project.globalDeclarations = await fs.readJson(
				globalDeclarationsPath,
			);
		}

		projects.push(project);

		function getDirPath(...localPaths) {
			return path.join(sourcePath, name, ...localPaths);
		}
	}),
);

console.log("Writing project example bundle to lib");
projects.sort((a, b) => {
	a.name.localeCompare(b.name, "en");
});
for (const project of projects) {
	let bong = await format(`export default ${JSON.stringify(project)}`, {parser: "typescript"});
	fs.writeFile(path.join(bundlePath, `${project.name}.js`), bong);
}

let bing = `export default {`;
for (const project of projects) {
	bing += `
	"${project.name}": () => import("./projectExamples/${project.name}.ts"),`;
}
bing += `\n};\n`;
bing = await format(bing, {parser: "typescript"});

await fs.writeFile(`${bundlePath}.ts`, bing);
