import { Tabs } from "$lib/classes/Tabs";
import { writable, type Writable } from "svelte/store";

export class Console {
	static frontendConsoleLines: Writable<string[]> = writable([]);
	static backendConsoleLines: Writable<string[]> = writable([]);

	static writeLineFrontend(textLine: string) {
		Console.frontendConsoleLines.update((items) => [...items, textLine]);
	}

	static writeLineBackend(textLine: string) {
		Console.backendConsoleLines.update((items) => [...items, textLine]);
	}

	/**
	 *Function for sending an error to a specific tab in the console
	 *@param error
	 *@param tab
	 */
	static sendErrorToTab(error: string, tab: Tabs) {
		switch (tab) {
			case Tabs.Frontend:
				Console.writeLineFrontend(error);
				//this.frontEndErrors = this.frontEndErrors;
				break;
			case Tabs.Backend:
				Console.writeLineBackend(error);
				//backEndErrors = backEndErrors;
				break;
			case Tabs.All:
				Console.writeLineBackend(error);
				Console.writeLineFrontend(error);
				//frontEndErrors = frontEndErrors;
				break;
			default:
				break;
		}
	}
}
