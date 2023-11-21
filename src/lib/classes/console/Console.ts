import { Tabs } from "$lib/classes/Tabs";
import { writable, get, type Writable } from "svelte/store";

class Console {
	frontendConsoleLines: Writable<string[]> = writable([]);
	backendConsoleLines: Writable<string[]> = writable([]);

	/**
	 *Function for sending an error to a specific tab in the console
	 *@param textLine - The textline to be printed by the Console
	 */
	writeLineFrontend(textLine: string) {
		this.frontendConsoleLines.update((items) => [...items, textLine]);
	}

	/**
	 *Function for sending an error to a specific tab in the console
	 *@param textLine - The textline to be printed by the Console
	 */
	writeLineBackend(textLine: string) {
		this.backendConsoleLines.update((items) => [...items, textLine]);
	}

	/**
	 *Function for getting a copy of the frontend tab's store
	 *@returns Frontend tab's string array
	 */
	getFrontendArray(): string[] {
		return get(this.frontendConsoleLines);
	}

	/**
	 *Function for getting a copy of the backend tab's store
	 *@returns Backend tab's string array
	 */
	getBackendArray(): string[] {
		return get(this.backendConsoleLines);
	}

	/**
	 *Function for sending an error to a specific tab in the console
	 *@param error
	 *@param tab
	 */
	sendErrorToTab(error: string, tab: Tabs) {
		switch (tab) {
			case Tabs.Frontend:
				this.writeLineFrontend(error);

				break;
			case Tabs.Backend:
				this.writeLineBackend(error);

				break;
			case Tabs.All:
				this.writeLineBackend(error);
				this.writeLineFrontend(error);

				break;
			default:
				break;
		}
	}
}

const instance: Console = new Console();
export default instance;
