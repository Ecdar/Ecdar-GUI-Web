import { describe, it, expect } from "vitest";
import { projectExamples } from "$lib/projectExamples";
import { ZodRawProject } from "$lib/classes/automaton/raw/RawProject";
import { Project } from "$lib/classes/automaton/Project";
import { ProjectId } from "$lib/classes/automaton/ProjectId";

describe("Project", async () => {
	for (const [exampleName, exampleLoader] of Object.entries(
		projectExamples,
	)) {
		const projectExample = ZodRawProject.parse(await exampleLoader());
		it(`can load project example ${exampleName}`, () => {
			const name = projectExample.name;
			expect(name).toBeTypeOf("string");
			if (typeof name !== "string")
				throw new Error("Make typescript happy");
			expect(name.length).toBeGreaterThan(0);
			expect(() =>
				Project.fromRaw(projectExample, { id: new ProjectId(name) }),
			).not.toThrowError();
		});
		it(`exports project example ${exampleName} to an equivalent raw project`, () => {
			const project = Project.fromRaw(projectExample, {
				id: new ProjectId(projectExample.name || ""),
			});
			const exportedExample = project.toRaw();
			expect(exportedExample).toStrictEqual(projectExample);
		});
	}
});
