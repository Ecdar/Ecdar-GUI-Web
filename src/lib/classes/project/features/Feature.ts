import type { Project } from "../Project.ts";

export type LoadFn = () => Promise<Project>;
export type SaveFn = () => Promise<void>;
export type QuickSave = SaveFn;

export type Features = {
	/** Saves the project may depend on implementation */
	save?: SaveFn;

	/** Saves the project with no user interaction may depend on implementation */
	quickSave?: QuickSave;
};

export interface HasFeatures {
	/**
	 * Optional features of a project all sub values may be undefined
	 * */
	features: Features;
}
