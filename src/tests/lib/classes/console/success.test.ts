import { Tabs } from "$lib/classes/Tabs";
import { describe, it, expect } from "vitest";
import Console from "../../../../lib/classes/console/Console";

describe("Console class", () => {
	describe("stores are correct when", () => {
		it("adds elements to the different stores", () => {
			let arrays = getArrays();
			let backendArray = arrays[0];
			let frontendArray = arrays[1];
			expect(backendArray.length).toBe(0);
			expect(frontendArray.length).toBe(0);

			Console.writeLineBackend("test");

			arrays = getArrays();
			backendArray = arrays[0];
			frontendArray = arrays[1];
			expect(backendArray.length).toBe(1);
			expect(frontendArray.length).toBe(0);

			Console.writeLineFrontend("test2");

			arrays = getArrays();
			backendArray = arrays[0];
			frontendArray = arrays[1];
			expect(backendArray.length).toBe(1);
			expect(frontendArray.length).toBe(1);

			Console.sendErrorToTab("test3", Tabs.All);

			arrays = getArrays();
			backendArray = arrays[0];
			frontendArray = arrays[1];
			expect(backendArray.length).toBe(2);
			expect(frontendArray.length).toBe(2);
		});

		it("Adds specefic line to the store", () => {
			const string = "syntaxTest";
			const string2 = "syntaxTest2";
			Console.writeLineBackend(string);
			Console.writeLineFrontend(string2);
			const arrays = getArrays();
			const backendArray = arrays[0];
			const frontendArray = arrays[1];

			expect(backendArray[backendArray.length - 1].split(" - ")[1]).toBe(
				string,
			);
			expect(
				frontendArray[frontendArray.length - 1].split(" - ")[1]).toBe(string2);
		});
	});
});

function getArrays() {
	return [Console.getBackendArray(), Console.getFrontendArray()];
}
