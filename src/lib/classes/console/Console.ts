import { Tabs } from "$lib/classes/Tabs";
import { writable, type Writable } from "svelte/store";

class Console {
	frontendConsoleLines: Writable<string[]> = writable([]);
	backendConsoleLines: Writable<string[]> = writable([]);

	writeLineFrontend(textLine: string) {
		this.frontendConsoleLines.update((items) => [...items, textLine]);
	}

	writeLineBackend(textLine: string) {
		this.backendConsoleLines.update((items) => [...items, textLine]);
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
