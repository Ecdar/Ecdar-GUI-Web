import type { IFileAdapter } from "./FileAdapter";

export interface IFileAdapterImplementation extends IFileAdapter {
	supported: () => boolean;
}
