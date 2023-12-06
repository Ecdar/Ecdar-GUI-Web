import type {
	IProjectAccess,
	ISerializedProjectAccess,
} from "../projectHandler/ProjectAccess";
import {
	FileSystemImplementation,
	type FileSystemSaveDirectoryPickerOptions,
	type FileSystemPickerOptions,
} from "./FileSystemImplementation";

/**
 * This is the file system when running in a browser that supports the File System Access API described here: https://developer.chrome.com/articles/file-system-access/
 * It is the best solution there is, but it is not very well supported, so we cannot rely on it: https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker
 *
 * As of 2023, this is what will run in Chrome and Edge.
 */
export class FileSystemFSAA extends FileSystemImplementation<
	FileSystemHandle,
	FileSystemFileHandle,
	FileSystemDirectoryHandle
> {
	static supported =
		"showDirectoryPicker" in globalThis &&
		"showOpenFilePicker" in globalThis &&
		"showSaveFilePicker" in globalThis &&
		"FileSystemHandle" in globalThis;

	static name = "FSAA";

	async showDirectoryPicker(
		options: FileSystemPickerOptions<
			FileSystemHandle,
			FileSystemFileHandle,
			FileSystemDirectoryHandle
		>,
	) {
		return showDirectoryPicker(options);
	}

	async showSaveDirectoryPicker(
		options: FileSystemSaveDirectoryPickerOptions<
			FileSystemHandle,
			FileSystemFileHandle,
			FileSystemDirectoryHandle
		>,
	) {
		const directoryHandle = await showDirectoryPicker(options);
		if (
			!options.enforceName ||
			directoryHandle.name === options.suggestedName
		) {
			return directoryHandle;
		} else {
			if (options.suggestedName && options.suggestedName !== "") {
				const subDirectoryHandle = directoryHandle.getDirectoryHandle(
					options.suggestedName,
					{ create: true },
				);
				return subDirectoryHandle;
			} else {
				return directoryHandle;
			}
		}
	}

	async showFilePicker(
		options: FileSystemPickerOptions<
			FileSystemHandle,
			FileSystemFileHandle,
			FileSystemDirectoryHandle
		>,
	) {
		return showOpenFilePicker(options);
	}

	async showSaveFilePicker(
		options: FileSystemPickerOptions<
			FileSystemHandle,
			FileSystemFileHandle,
			FileSystemDirectoryHandle
		>,
	) {
		return showSaveFilePicker(options);
	}

	deserializeProjectAccess(
		projectAccess: ISerializedProjectAccess,
	): IProjectAccess<
		FileSystemHandle,
		FileSystemFileHandle,
		FileSystemDirectoryHandle
	> {
		const serializedHandle = projectAccess.directoryHandle;
		if (isDirectoryHandle(serializedHandle)) {
			return { ...projectAccess, directoryHandle: serializedHandle };
		} else {
			throw new TypeError(
				`Cannot deserialize incompatible project access: ${projectAccess.directoryHandle.name}`,
			);
		}
	}
}

function isDirectoryHandle(
	serialized: ISerializedProjectAccess["directoryHandle"],
): serialized is FileSystemDirectoryHandle {
	if (!("kind" in serialized) || typeof serialized.kind !== "string") {
		return false;
	}
	if (
		!("getDirectoryHandle" in serialized) ||
		typeof serialized.getDirectoryHandle !== "function"
	) {
		return false;
	}
	if (
		!("getFileHandle" in serialized) ||
		typeof serialized.getFileHandle !== "function"
	) {
		return false;
	}
	return true;
}
