import { describe, it, expect } from "vitest";
import EngineStorage from "$lib/classes/engine/EngineStorage";
import type { Engine } from "$lib/classes/engine/Engine";

describe("succeed Engine test", () => {
	const engine = new EngineStorage();

	it("Id increment", () => {
		expect(
			engine.engineId
        )
        .toBe(1)
        expect(
			engine.engineId
        )
        .toBe(2)
        expect(
			engine.engineId
        )
        .toBe(3)
	});

    it("Create and push engine", () => {

        expect(
			engine.engineArray.length
        )
        .toBe(0)

        engine.createEngine("test","123.213.123.123",1,2,1);
		expect(
			engine.engineArray.length
        )
        .toBe(1)
	});

    it("Set default", () => {
        //testEngine mirror
        engine.createEngine("test2","123.213.123.123",1,2,1);
        engine.defaultEngine = testEngine;
		expect(
			engine.defaultEngine
        )
        .toBe(testEngine);
	});

    it("Get engine", () => {
		expect(
            //convert to JSON to remove private fields
			JSON.stringify(engine.getEngine("test2"))
        )
        .toBe(JSON.stringify(testEngineWithId));
        expect(
			JSON.stringify(engine.getEngine(5))
        )
        .toBe(JSON.stringify(testEngineWithId));
	});

    it("Get all engines", () => {
		expect(
            //convert to JSON to remove private fields
			JSON.stringify(engine.getEngine("test2"))
        )
        .toBe(JSON.stringify(testEngineWithId));
        expect(
			JSON.stringify(engine.getEngine(5))
        )
        .toBe(JSON.stringify(testEngineWithId));
	});


});

/*******************************\
 *           DATA              * 
\*******************************/

const testEngine: Engine = {
    name: "test2",
    address: "123.213.123.123",
    portRangeStart: 1,
    portRangeEnd: 2,
    type: 1
} as Engine;

const testEngineWithId: Engine = {
    name: "test2",
    address: "123.213.123.123",
    portRangeStart: 1,
    portRangeEnd: 2,
    type: 1,
    id: 5,
} as Engine;