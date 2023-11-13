import { describe, it, expect } from "vitest";
import { ToolStorage } from "$lib/classes/tools/toolStorage";
import { DefaultTool } from "$lib/classes/tools/defaultTool";
import { LocationTool } from "$lib/classes/tools/locationTool";

describe("Success Tools test", () => {
	const toolStorage = new ToolStorage();

	it("Add tool", () => {
		toolStorage.addTool(new LocationTool());
		expect(toolStorage.toolArray.find((element) => element._name === "Location")).toEqual(new LocationTool());
	});

	it("Get selected tool and select tool", () => {
		expect(toolStorage.selected).toEqual(new DefaultTool());

		toolStorage.selectTool("Location");
		expect(toolStorage.selected).toEqual(new LocationTool());

	});

	
});
