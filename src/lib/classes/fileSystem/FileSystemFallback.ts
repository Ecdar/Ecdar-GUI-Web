import type { IProjectAccess } from "../projectHandler/ProjectAccess";
import {
	FileSystemImplementation,
	type DirectoryGetHandleOptions,
	type FileSystemPickerOptions,
	type FileSystemQueryState,
	type IDirectoryHandle,
	type IFileHandle,
	type IFileSystemHandle,
	type IFileSystemWriteable,
	type FileSystemRequestState,
} from "./FileSystemImplementation";

class FileSystemWritableFallback implements IFileSystemWriteable {
	constructor(
		private name: string,
		existingData?: string,
	) {
		if (existingData) this.#data = existingData;
	}

	#closed = false;
	#data = "";

	async write(data: string) {
		return new Promise<void>((resolve) => {
			if (this.#closed) {
				throw new Error("Cannot write to a closed file");
			}
			this.#data += data;
			resolve();
		});
	}

	async close() {
		return new Promise<void>((resolve) => {
			if (this.#closed) {
				throw new Error("Cannot close a file that is already closed");
			}
			downloadFile(this.name, this.#data);
			this.#closed = true;
			resolve();
		});
	}
}

abstract class FileSystemHandleFallback implements IFileSystemHandle {
	constructor(readonly name: IFileSystemHandle["name"]) {}

	abstract readonly kind: IFileSystemHandle["kind"];

	async queryPermission(): Promise<{ state: FileSystemQueryState }> {
		return new Promise((resolve) => {
			resolve({ state: "granted" });
		});
	}

	async requestPermission(): Promise<FileSystemRequestState> {
		return new Promise((resolve) => {
			resolve("granted");
		});
	}
}

class FileHandleFallback
	extends FileSystemHandleFallback
	implements IFileHandle
{
	constructor(
		readonly name: IFileSystemHandle["name"],
		private file: File,
	) {
		super(name);
	}

	readonly kind: IFileHandle["kind"] = "file";

	async getFile() {
		return new Promise<File>((resolve) => {
			resolve(this.file);
		});
	}

	async createWritable(options?: FileSystemCreateWritableOptions) {
		let existingData: string | undefined;
		if (options?.keepExistingData) {
			existingData = await this.file.text();
		}
		return new FileSystemWritableFallback(this.name, existingData);
	}
}

/**
 * Represents a file and its relative position to the parent folder.
 */
type FileRelativeEntry = {
	/**
	 * The path segments that route from the parent directory to the file.
	 */
	pathSegments: string[];
	/**
	 * The file reference.
	 */
	file: File;
};

export class DirectoryHandleFallback
	extends FileSystemHandleFallback
	implements IDirectoryHandle<FileSystemHandleFallback, FileHandleFallback>
{
	constructor(
		readonly name: IFileSystemHandle["name"],
		readonly fileEntries: FileRelativeEntry[],
	) {
		super(name);
		for (const fileEntry of fileEntries) {
			if (!fileEntry.file.name) continue;
			const entryName = fileEntry.pathSegments[0];
			if (fileEntry.pathSegments.length === 0) {
				throw new TypeError("File entry must have a relative path");
			} else if (fileEntry.pathSegments.length === 1) {
				this.#files.set(entryName, fileEntry.file);
			} else {
				let directoryEntry = this.#directories.get(entryName);
				if (!directoryEntry) {
					directoryEntry = [];
					this.#directories.set(entryName, directoryEntry);
				}
				// note that we are saving a copy of the array, because we don't want other members tampering with our array
				directoryEntry.push({
					pathSegments: fileEntry.pathSegments.slice(1),
					file: fileEntry.file,
				});
			}
		}
	}

	#files = new Map<IFileSystemHandle["name"], File>();
	#directories = new Map<IFileSystemHandle["name"], FileRelativeEntry[]>();

	readonly kind: IDirectoryHandle<
		FileSystemHandleFallback,
		FileHandleFallback
	>["kind"] = "directory";

	async *values() {
		for await (const [, value] of this.entries()) {
			yield value;
		}
	}

	async *entries(): AsyncIterableIterator<
		[IFileSystemHandle["name"], FileSystemHandleFallback]
	> {
		for await (const [name, file] of this.#files) {
			yield [name, new FileHandleFallback(name, file)];
		}
		for await (const [name, fileEntries] of this.#directories) {
			yield [name, new DirectoryHandleFallback(name, fileEntries)];
		}
	}

	getDirectoryHandle(
		name: string,
		options?: DirectoryGetHandleOptions,
	): Promise<DirectoryHandleFallback | undefined> {
		return new Promise((resolve) => {
			const fileEntries = this.#directories.get(name);
			if (fileEntries) {
				resolve(new DirectoryHandleFallback(name, fileEntries));
			} else if (options?.create) {
				const newFileEntries: FileRelativeEntry[] = [];
				this.#directories.set(name, newFileEntries);
				resolve(new DirectoryHandleFallback(name, newFileEntries));
			} else {
				resolve(undefined);
			}
		});
	}

	getFileHandle(
		name: string,
		options?: DirectoryGetHandleOptions,
	): Promise<FileHandleFallback | undefined> {
		return new Promise((resolve) => {
			const file = this.#files.get(name);
			if (file) {
				resolve(new FileHandleFallback(name, file));
			} else if (options?.create) {
				const newFile = new File([], name);
				this.#files.set(name, newFile);
				resolve(new FileHandleFallback(name, newFile));
			} else {
				resolve(undefined);
			}
		});
	}

	removeEntry(name: string) {
		return new Promise<void>((resolve) => {
			this.#files.delete(name);
			this.#directories.delete(name);
			resolve();
		});
	}
}

/**
 * This is the file system when running in a browser that does not have a modern file system implementation.
 * This is not a very good adapter, but it is the best we can do.
 *
 * As of 2023, this is what will run in Firefox and Safari.
 *
 * WARNING: If you create a new file or directory, it will only be persisted in the local FileSystemHandle.
 * This is because there is no backing store to actually add the item to. You also cannot save a directory.
 */
export class FileSystemFallback extends FileSystemImplementation<
	FileSystemHandleFallback,
	FileHandleFallback,
	DirectoryHandleFallback
> {
	static supported = true;
	static name = "Fallback";

	async showDirectoryPicker() {
		const fileList = await uploadItem("directory");
		if (!fileList) return;
		const name = fileList[0].webkitRelativePath.split("/")[0];
		const fileEntries: FileRelativeEntry[] = [];
		for (const file of fileList) {
			if (!file.name) continue;
			fileEntries.push({
				pathSegments: file.webkitRelativePath.split("/").slice(1),
				file,
			});
		}
		return new DirectoryHandleFallback(name, fileEntries);
	}

	showSaveDirectoryPicker(): Promise<DirectoryHandleFallback | undefined> {
		alert(
			"Sorry, your browser does not support saving projects. Instead you can export the project as JSON.",
		);
		throw new Error("Saving in browser is not supported in fallback mode");
	}

	async showFilePicker() {
		const fileList = await uploadItem("file");
		if (!fileList?.[0]) return;
		return [...fileList].map((file) => {
			return new FileHandleFallback(file.name, file);
		});
	}

	async showSaveFilePicker(
		options: FileSystemPickerOptions<
			FileSystemHandleFallback,
			FileHandleFallback,
			DirectoryHandleFallback
		>,
	) {
		return new Promise<FileHandleFallback>((resolve) => {
			const name = options.suggestedName || "Ecdar file";
			const fileHandle = new FileHandleFallback(name, new File([], name));
			resolve(fileHandle);
		});
	}

	deserializeProjectAccess(): IProjectAccess<
		FileSystemHandleFallback,
		FileHandleFallback,
		DirectoryHandleFallback
	> {
		throw new TypeError(
			`Cannot deserialize project access when in fallback mode`,
		);
	}
}

/**
 * Opens a file or directory picker that lets the user pick an item to be "uploaded".
 */
async function uploadItem(
	kind: FileSystemHandle["kind"],
): Promise<FileList | null> {
	return new Promise((resolve) => {
		const input = document.createElement("input");
		input.type = "file";
		input.webkitdirectory = Boolean(kind === "directory");
		input.style.display = "none";
		input.addEventListener(
			"change",
			() => {
				resolve(input.files);
			},
			{ once: true },
		);
		input.click();
	});
}

/**
 * Downloads a file to the "downloads" folder.
 * This is the only way to save something to the file system.
 */
function downloadFile(name: string, contents: string): void {
	const link = document.createElement("a");
	link.style.display = "none";
	link.download = name;
	link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(contents)}`;
	link.click();
}
