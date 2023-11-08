import { Tool } from "$lib/classes/tools/tool";

//Default tool, when nothing is selected
export class DefaultTool extends Tool {
	constructor() {
		super("Default");
	}
}
