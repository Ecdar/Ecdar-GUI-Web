import type { Project } from "../project/Project";
import type { IFileAdapterImplementation } from "./FileAdapterImplementation";
import { FileAdapterTauri } from "./FileAdapterTauri";
import { FileAdapterFallback } from "./FileAdapterFallback";

export interface IFileAdapter {
	/**
	 * Opens a file explorer and prompts you to choose a folder
	 * containing an Ecdar project file structure
	 */
	load: () => Promise<Project>;

	/**
	 * Saves the project to a new location.
	 */
	save: (project: Project) => Promise<void>;

	/**
	 * Saves the project to the same location as it was last saved to or loaded from.
	 */
	quickSave: (project: Project) => Promise<void>;
}

class FileAdapter implements IFileAdapter {
	constructor() {
		for (const AdapterImplementation of [
			FileAdapterTauri,
			FileAdapterFallback,
		]) {
			const adapterImplementation = new AdapterImplementation();
			if (adapterImplementation.supported()) {
				this.adapterImplemenation = adapterImplementation;
				break;
			}
		}
	}

	private adapterImplemenation!: IFileAdapterImplementation;

	get load() {
		return this.adapterImplemenation.load;
	}

	get save() {
		return this.adapterImplemenation.save;
	}

	get quickSave() {
		return this.adapterImplemenation.quickSave;
	}
}

export const fileAdapter = new FileAdapter();
