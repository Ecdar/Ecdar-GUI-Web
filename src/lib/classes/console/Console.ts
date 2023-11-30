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
		const timeStamp = this.createTimeStamp();
		this.frontendConsoleLines.update((items) => [
			...items,
			`${timeStamp} - ${textLine}`,
		]);
	}

	/**
	 *Function for sending an error to a specific tab in the console
	 *@param textLine - The textline to be printed by the Console
	 */
	writeLineBackend(textLine: string) {
		const timeStamp = this.createTimeStamp();
		this.backendConsoleLines.update((items) => [
			...items,
			`${timeStamp} - ${textLine}`,
		]);
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

	createTimeStamp() {
		const dateObject = new Date(Date.now());

		return dateObject.toLocaleString(); //Output: 2/20/2023, 7:41:42 AM
	}
}

const instance: Console = new Console();
export default instance;
