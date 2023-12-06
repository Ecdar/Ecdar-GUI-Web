import type {
	FileSystemImplementation,
	IDirectoryHandle,
	IFileHandle,
	IFileSystemHandle,
} from "./FileSystemImplementation";
import { FileSystemFSAA } from "./FileSystemFSAA";
import { FileSystemTauri } from "./FileSystemTauri";
import { FileSystemFallback } from "./FileSystemFallback";

/**
 * This implementation is used when nothing else is supported.
 * It is the only one that is allowed to have missing features, since it is better than nothing.
 */
export const fileSystemFallbackImplementation = FileSystemFallback;

/**
 * A list of all FileSystem implementations. They are prioritized from most preferred to least preferred.
 */
export const fileSystemImplementations = [
	FileSystemTauri,
	FileSystemFSAA,
	fileSystemFallbackImplementation,
];

/**
 * @returns the most preferred FileSystem implementation that the environment supports.
 */
export function getBestFileSystemImplementation(): FileSystemImplementation<
	IFileSystemHandle,
	IFileHandle,
	IDirectoryHandle<IFileSystemHandle, IFileHandle>
> {
	for (const implementation of fileSystemImplementations) {
		if (!implementation.supported) continue;
		localStorage.setItem("fileSystemName", implementation.name);
		return new implementation();
	}

	// Theoretically the fallback should always be supported, but just in case:
	localStorage.setItem("fileSystemName", "Fallback-FSLoopError");
	return new fileSystemFallbackImplementation();
}
