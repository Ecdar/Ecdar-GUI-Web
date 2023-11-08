import type { Tool } from "$lib/classes/tools/tool";
import { DefaultTool } from "$lib/classes/tools/defaultTool";

export class ToolStorage {
	toolArray: Array<Tool>;
	#selected: Tool;

	constructor() {
		this.toolArray = [];
		this.toolArray.push(new DefaultTool());
		this.#selected = new DefaultTool();
	}

	//Get set selected
	get selected(): Tool {
		return this.#selected;
	}

	set selected(selected: Tool) {
		const selectedIndex = this.toolArray.findIndex((tool) => {
			return tool === selected;
		});

		if (selectedIndex > -1) {
			this.#selected = this.toolArray[selectedIndex];
		} else throw new Error("Invalid selected");
	}

    //Add new tool
	addTool(tool: Tool) {
		this.toolArray.push(tool);
	}

    //Select a tool, if the tool does not exist, select default tool
	selectTool(tool: string): Tool {
		return (this.#selected =
			this.toolArray.find((element) => element._name === tool) ??
			new DefaultTool());
	}
}
