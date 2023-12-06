import type { FileEntry } from "@tauri-apps/api/fs";
import type { DialogFilter, OpenDialogOptions } from "@tauri-apps/api/dialog";
import { inTauri } from "../../tauri";
import {
	FileSystemImplementation,
	type DirectoryGetHandleOptions,
	type FileSystemQueryState,
	type IDirectoryHandle,
	type IFileHandle,
	type IFileSystemHandle,
	type FileSystemPickerOptions,
	type FileSystemSaveDirectoryPickerOptions,
	FileSystemWellKnownDirectory,
	type FileSystemSaveTypes,
	type FileSystemFilePickerOptions,
	type IFileSystemWriteable,
	type FileSystemOpenFilePickerOptions,
	type FileSystemRequestState,
} from "./FileSystemImplementation";
import type {
	ISerializedProjectAccess,
	IProjectAccess,
} from "../projectHandler/ProjectAccess";

class FileSystemWritableTauri implements IFileSystemWriteable {
	constructor(
		private path: string,
		private keepExistingData: boolean,
	) {}

	#closed = false;
	#data = "";

	write(data: string) {
		if (this.#closed) {
			throw new Error("Cannot write to a closed file");
		}
		return new Promise<void>((resolve) => {
			this.#data += data;
			resolve();
		});
	}

	async close() {
		if (this.#closed) {
			throw new Error("Cannot close a file that is already closed");
		}
		const { writeTextFile } = await import("@tauri-apps/api/fs");
		await writeTextFile(this.path, this.#data, {
			append: this.keepExistingData,
		});
		this.#closed = true;
	}
}

abstract class FileSystemHandleTauri implements IFileSystemHandle {
	constructor(
		readonly name: IFileSystemHandle["name"],
		readonly path: string,
	) {}

	abstract readonly kind: IFileSystemHandle["kind"];

	queryPermission(): Promise<{ state: FileSystemQueryState }> {
		return new Promise((resolve) => {
			resolve({ state: "granted" });
		});
	}

	requestPermission(): Promise<FileSystemRequestState> {
		return new Promise((resolve) => {
			resolve("granted");
		});
	}
}

class FileHandleTauri extends FileSystemHandleTauri implements IFileHandle {
	constructor(
		readonly name: IFileSystemHandle["name"],
		readonly path: string,
	) {
		super(name, path);
	}

	readonly kind: IFileHandle["kind"] = "file";

	async getFile() {
		const { readTextFile } = await import("@tauri-apps/api/fs");
		const fileContents = await readTextFile(this.path);
		return new File([fileContents], this.name);
	}

	createWritable(options?: FileSystemCreateWritableOptions) {
		return new Promise<FileSystemWritableTauri>((resolve) => {
			resolve(
				new FileSystemWritableTauri(
					this.path,
					Boolean(options?.keepExistingData),
				),
			);
		});
	}
}

class DirectoryHandleTauri
	extends FileSystemHandleTauri
	implements IDirectoryHandle<FileSystemHandleTauri, FileHandleTauri>
{
	constructor(
		readonly name: IFileSystemHandle["name"],
		readonly path: string,
	) {
		super(name, path);
	}

	readonly kind: IDirectoryHandle<
		FileSystemHandleTauri,
		FileHandleTauri
	>["kind"] = "directory";

	async *values() {
		const { readDir } = await import("@tauri-apps/api/fs");
		const entries = await readDir(this.path, {
			recursive: true,
		});
		for (const entry of entries) {
			if (!entry.name) continue;
			if (await isFile(entry)) {
				yield new FileHandleTauri(entry.name, entry.path);
			} else {
				yield new DirectoryHandleTauri(entry.name, entry.path);
			}
		}
	}

	async *entries(): AsyncIterableIterator<
		[IFileSystemHandle["name"], FileSystemHandleTauri]
	> {
		for await (const handle of this.values()) {
			yield [handle.name, handle];
		}
	}

	async getDirectoryHandle(
		name: string,
		options?: DirectoryGetHandleOptions,
	): Promise<DirectoryHandleTauri | undefined> {
		let foundHandle: DirectoryHandleTauri | undefined;
		search: for await (const handle of this.values()) {
			if (handle.name === name) {
				if (handle instanceof DirectoryHandleTauri) {
					foundHandle = handle;
				}
				break search;
			}
		}
		if (foundHandle) {
			return foundHandle;
		} else {
			if (options?.create) {
				const { join } = await import("@tauri-apps/api/path");
				const { createDir } = await import("@tauri-apps/api/fs");

				const newPath = await join(this.path, name);
				await createDir(newPath);

				return new DirectoryHandleTauri(name, newPath);
			} else {
				return undefined;
			}
		}
	}

	async getFileHandle(
		name: string,
		options?: DirectoryGetHandleOptions,
	): Promise<FileHandleTauri | undefined> {
		let foundHandle: FileHandleTauri | undefined;
		search: for await (const handle of this.values()) {
			if (handle.name === name) {
				if (handle instanceof FileHandleTauri) {
					foundHandle = handle;
				}
				break search;
			}
		}
		if (foundHandle) {
			return foundHandle;
		} else {
			if (options?.create) {
				const { join } = await import("@tauri-apps/api/path");

				const newPath = await join(this.path, name);

				return new FileHandleTauri(name, newPath);
			} else {
				return undefined;
			}
		}
	}

	async removeEntry(name: string, options?: FileSystemRemoveOptions) {
		const { join } = await import("@tauri-apps/api/path");
		let foundHandle: FileHandleTauri | DirectoryHandleTauri | undefined;
		search: for await (const handle of this.values()) {
			if (handle.name === name) {
				foundHandle = handle;
				break search;
			}
		}
		if (!foundHandle) return;
		const entryPath = await join(this.path, name);
		if (foundHandle instanceof FileHandleTauri) {
			const { removeFile } = await import("@tauri-apps/api/fs");
			await removeFile(entryPath);
			return;
		} else if (foundHandle instanceof DirectoryHandleTauri) {
			const { removeDir } = await import("@tauri-apps/api/fs");
			await removeDir(entryPath, { recursive: options?.recursive });
			return;
		}
	}
}

/**
 * This is the file system when running in a tauri native app.
 * We use this until there is a web standard that can replace it.
 *
 * This only works properly if Tauri has this plugin installed: https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/persisted-scope
 * It will ensure that Tauri can still load/save files after a restart.
 */
export class FileSystemTauri extends FileSystemImplementation<
	FileSystemHandleTauri,
	FileHandleTauri,
	DirectoryHandleTauri
> {
	static supported = inTauri;

	async showDirectoryPicker(
		options: FileSystemPickerOptions<
			FileSystemHandleTauri,
			FileHandleTauri,
			DirectoryHandleTauri
		>,
	) {
		const { join } = await import("@tauri-apps/api/path");
		const { open } = await import("@tauri-apps/api/dialog");
		const fsOptions: OpenDialogOptions = {
			multiple: false,
			directory: true,
			recursive: true,
			title: options.pickerTitle,
		};
		if (options.startIn) {
			fsOptions.defaultPath = await join(
				await wellKnownDirectoryToPath(options.startIn),
				options.suggestedName || "",
			);
		}
		const result = await open(fsOptions);
		if (typeof result !== "string") return;
		return new DirectoryHandleTauri(await pathToName(result), result);
	}

	async showSaveDirectoryPicker(
		options: FileSystemSaveDirectoryPickerOptions<
			FileSystemHandleTauri,
			FileHandleTauri,
			DirectoryHandleTauri
		>,
	) {
		const { join } = await import("@tauri-apps/api/path");
		const { open } = await import("@tauri-apps/api/dialog");
		const fsOptions: OpenDialogOptions = {
			multiple: false,
			directory: true,
			recursive: true,
			title: options.pickerTitle,
		};
		if (options.startIn) {
			fsOptions.defaultPath = await join(
				await wellKnownDirectoryToPath(options.startIn),
				options.suggestedName || "",
			);
		}
		const result = await open(fsOptions);
		if (typeof result !== "string") return;
		const directoryHandle = new DirectoryHandleTauri(
			await pathToName(result),
			result,
		);
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
		options: FileSystemOpenFilePickerOptions<
			FileSystemHandleTauri,
			FileHandleTauri,
			DirectoryHandleTauri
		> &
			FileSystemFilePickerOptions<
				FileSystemHandleTauri,
				FileHandleTauri,
				DirectoryHandleTauri
			>,
	) {
		const { open } = await import("@tauri-apps/api/dialog");
		const result = await open({
			multiple: options.multiple,
			directory: false,
			title: options.pickerTitle,
			defaultPath: await wellKnownDirectoryToPath(options.startIn),
			filters: saveTypesToFilters(options.types),
		});
		if (result === null) return;
		const pathList = Array.isArray(result) ? result : [result];
		const fileHandleList = await Promise.all(
			pathList.map(async (path) => {
				return new FileHandleTauri(await pathToName(path), path);
			}),
		);
		return fileHandleList;
	}

	async showSaveFilePicker(
		options: FileSystemFilePickerOptions<
			FileSystemHandleTauri,
			FileHandleTauri,
			DirectoryHandleTauri
		>,
	) {
		const { save } = await import("@tauri-apps/api/dialog");
		const result = await save({
			title: options.pickerTitle,
			defaultPath: await wellKnownDirectoryToPath(options.startIn),
			filters: saveTypesToFilters(options.types),
		});
		if (typeof result !== "string") return;
		return new FileHandleTauri(await pathToName(result), result);
	}

	deserializeProjectAccess(
		projectAccess: ISerializedProjectAccess,
	): IProjectAccess<
		FileSystemHandleTauri,
		FileHandleTauri,
		DirectoryHandleTauri
	> {
		const serializedHandle = projectAccess.directoryHandle;
		if (
			"path" in serializedHandle &&
			typeof serializedHandle.path === "string"
		) {
			return {
				...projectAccess,
				directoryHandle: new DirectoryHandleTauri(
					serializedHandle.name,
					serializedHandle.path,
				),
			};
		} else {
			throw new TypeError(
				`Cannot deserialize incompatible project access: ${projectAccess.directoryHandle.name}`,
			);
		}
	}
}

/**
 * Get the item name from its path.
 */
async function pathToName(path: string): Promise<string> {
	const { sep } = await import("@tauri-apps/api/path");
	const segments = path.split(sep);
	while (segments.length > 0 && segments.at(-1) === "") {
		segments.pop();
	}
	const name = segments.at(-1);
	if (!name)
		throw new TypeError(
			"Received weird path, could not find a name in it.",
		);
	return name;
}

/**
 * Tauri does not have a way to kow if an entry is a file or a directory, so we have to do some magic here.
 * TODO: Is there a better way?
 *
 * @returns true if it is a file, false if it is a directory
 */
async function isFile(entry: FileEntry | string): Promise<boolean> {
	// Low cost checks that should be correct 99% of the time
	if (
		typeof entry !== "string" &&
		entry.children &&
		entry.children.length > 0
	) {
		return false;
	}
	const path = typeof entry === "string" ? entry : entry.path;
	if (path.match(/\..{1,10}$/gu)) return true;
	if (path.endsWith("/")) return false;

	//More costly checks
	try {
		const { readTextFile } = await import("@tauri-apps/api/fs");
		const contents = await readTextFile(path);
		if (contents && contents !== "") return true;
	} catch (error) {
		return false;
	}
	try {
		const { readDir } = await import("@tauri-apps/api/fs");
		const entries = await readDir(path);
		if (entries.length > 0) return true;
	} catch (error) {
		return false;
	}

	//Who knows man
	throw new Error(
		`Could not determine if entry is file or directory: ${path}`,
	);
}

/**
 * Converts a standard directory reference to a tauri-compatible reference.
 */
async function wellKnownDirectoryToPath(
	wellKnown: undefined,
): Promise<undefined>;
async function wellKnownDirectoryToPath(
	wellKnown: DirectoryHandleTauri | FileSystemWellKnownDirectory,
): Promise<string>;
async function wellKnownDirectoryToPath(
	wellKnown: DirectoryHandleTauri | FileSystemWellKnownDirectory | undefined,
): Promise<string | undefined>;
async function wellKnownDirectoryToPath(
	wellKnown: DirectoryHandleTauri | FileSystemWellKnownDirectory | undefined,
): Promise<string | undefined> {
	if (wellKnown instanceof DirectoryHandleTauri) {
		return wellKnown.path;
	}
	switch (wellKnown) {
		case undefined: {
			return undefined;
		}
		case FileSystemWellKnownDirectory.desktop: {
			const { desktopDir } = await import("@tauri-apps/api/path");
			return await desktopDir();
		}
		case FileSystemWellKnownDirectory.documents: {
			const { documentDir } = await import("@tauri-apps/api/path");
			return await documentDir();
		}
		case FileSystemWellKnownDirectory.downloads: {
			const { downloadDir } = await import("@tauri-apps/api/path");
			return await downloadDir();
		}
	}
}

/**
 * Converts a standard file picker filter to a tauri-compatible filter.
 */
function saveTypesToFilters(
	saveTypes: FileSystemSaveTypes | undefined,
): DialogFilter[] | undefined {
	if (!saveTypes) return undefined;
	const filters: DialogFilter[] = [];
	for (const saveType of saveTypes) {
		const extensions: string[] = [];
		for (const typeExtensions of Object.values(saveType.accept)) {
			for (const extension of typeExtensions) {
				extensions.push(extension.slice(1));
			}
		}
		filters.push({
			name: saveType.description,
			extensions,
		});
	}
	return filters;
}
