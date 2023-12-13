import { describe, it, expect } from "vitest";
import EngineStorage from "$lib/classes/engine/EngineStorage";
import type { Engine } from "$lib/classes/engine/Engine";

describe("succeed Engine test", () => {
	it("Id increment", () => {
		expect(EngineStorage.engineId).toBe(1);
		expect(EngineStorage.engineId).toBe(2);
		expect(EngineStorage.engineId).toBe(3);
	});

	it("Create and push engine", () => {
		expect(EngineStorage.engineArray.length).toBe(0);

		EngineStorage.createEngine("test", "8.8.8.8", 1, 2, false);
		expect(EngineStorage.engineArray.length).toBe(5);
	});

	it("Set default", () => {
		//testEngine mirror
		EngineStorage.createEngine("test2", "123.213.123.123", 1, 2, false);
		EngineStorage.defaultEngine = testEngineWithId;
		expect(EngineStorage.defaultEngine).toBe(testEngineWithId);
	});

	it("Get engine", () => {
		expect(
			//convert to JSON to remove private fields
			JSON.stringify(EngineStorage.getEngine("test2")),
		).toBe(JSON.stringify(testEngineWithId));
		expect(JSON.stringify(EngineStorage.getEngine(6))).toBe(
			JSON.stringify(testEngineWithId),
		);
	});

	it("Get all engines", () => {
		expect(EngineStorage.engineArray.length).toBe(
			EngineStorage.getEngineArray().length,
		);
		expect(EngineStorage.engineArray).toBe(EngineStorage.getEngineArray());
	});
});

/*******************************\
 *           DATA              * 
\*******************************/

const testEngineWithId: Engine = {
	name: "test2",
	address: "123.213.123.123",
	portRangeStart: 1,
	portRangeEnd: 2,
	id: 6,
	useBundle: false,
} as Engine;
