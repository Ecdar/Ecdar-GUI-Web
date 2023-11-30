/**
 * @file
 * This is only for use in the build step. It should not be used in the app.
 */

import {
	type FileHandle,
	access,
	constants,
	chmod,
	open,
	readFile,
	readdir,
	mkdir,
	rm,
} from "node:fs/promises";
import { join } from "node:path";
import type {
	DirectoryGetHandleOptions,
	FileSystemQueryState,
	FileSystemRequestState,
	IDirectoryHandle,
	IFileHandle,
	IFileSystemHandle,
	IFileSystemWriteable,
} from "./FileSystemImplementation";
import type { FileSystemHandlePermissionMode } from "./FSAA";

class FileSystemWritableNodejs implements IFileSystemWriteable {
	constructor(readonly fileHandle: FileHandle) {}

	async write(data: string) {
		await this.fileHandle.write(data);
	}

	async close() {
		await this.fileHandle.close();
	}
}

abstract class FileSystemHandleNodejs implements IFileSystemHandle {
	constructor(
		readonly name: IFileSystemHandle["name"],
		protected path: string,
	) {}

	abstract readonly kind: IFileSystemHandle["kind"];

	async queryPermission(options: {
		mode: FileSystemHandlePermissionMode;
	}): Promise<{ state: FileSystemQueryState }> {
		try {
			await access(
				this.path,
				fileSystemPermissionModeToNodejsFlags(options.mode),
			);
			return { state: "granted" };
		} catch {
			return { state: "prompt" };
		}
	}

	async requestPermission(options: {
		mode: FileSystemHandlePermissionMode;
	}): Promise<FileSystemRequestState> {
		try {
			await chmod(
				this.path,
				fileSystemPermissionModeToNodejsFlags(options.mode),
			);
			return "granted";
		} catch {
			return "denied";
		}
	}
}

class FileHandleNodejs extends FileSystemHandleNodejs implements IFileHandle {
	constructor(
		readonly name: IFileSystemHandle["name"],
		protected path: string,
	) {
		super(name, path);
	}

	readonly kind: IFileHandle["kind"] = "file";

	async getFile() {
		const fileContents = await readFile(this.path, "utf-8");
		return new File([fileContents], this.name);
	}

	async createWritable(options?: FileSystemCreateWritableOptions) {
		const fileHandle = await open(
			this.path,
			constants.R_OK | constants.W_OK | constants.O_CREAT,
			constants.O_RDWR,
		);
		if (!options?.keepExistingData) await fileHandle.truncate();
		return new FileSystemWritableNodejs(fileHandle);
	}
}

export class DirectoryHandleNodejs
	extends FileSystemHandleNodejs
	implements IDirectoryHandle<FileSystemHandleNodejs, FileHandleNodejs>
{
	constructor(
		readonly name: IFileSystemHandle["name"],
		protected path: string,
	) {
		super(name, path);
	}

	readonly kind: IDirectoryHandle<
		FileSystemHandleNodejs,
		FileHandleNodejs
	>["kind"] = "directory";

	async *values() {
		const entries = await readdir(this.path, { withFileTypes: true });
		for (const entry of entries) {
			if (!entry.name) continue;
			if (entry.isFile()) {
				yield new FileHandleNodejs(
					entry.name,
					join(this.path, entry.name),
				);
			} else if (entry.isDirectory()) {
				yield new DirectoryHandleNodejs(
					entry.name,
					join(this.path, entry.name),
				);
			}
		}
	}

	async *entries(): AsyncIterableIterator<
		[IFileSystemHandle["name"], FileSystemHandleNodejs]
	> {
		for await (const handle of this.values()) {
			yield [handle.name, handle];
		}
	}

	async getDirectoryHandle(
		name: string,
		options?: DirectoryGetHandleOptions,
	): Promise<DirectoryHandleNodejs | undefined> {
		let foundHandle: DirectoryHandleNodejs | undefined;
		search: for await (const handle of this.values()) {
			if (handle.name === name) {
				if (handle instanceof DirectoryHandleNodejs) {
					foundHandle = handle;
				}
				break search;
			}
		}
		if (foundHandle) {
			return foundHandle;
		} else {
			if (options?.create) {
				const newPath = join(this.path, name);
				await mkdir(newPath);
				return new DirectoryHandleNodejs(name, newPath);
			} else {
				return undefined;
			}
		}
	}

	async getFileHandle(
		name: string,
		options?: DirectoryGetHandleOptions,
	): Promise<FileHandleNodejs | undefined> {
		let foundHandle: FileHandleNodejs | undefined;
		search: for await (const handle of this.values()) {
			if (handle.name === name) {
				if (handle instanceof FileHandleNodejs) {
					foundHandle = handle;
				}
				break search;
			}
		}
		if (foundHandle) {
			return foundHandle;
		} else {
			if (options?.create) {
				const newPath = join(this.path, name);

				return new FileHandleNodejs(name, newPath);
			} else {
				return undefined;
			}
		}
	}

	async removeEntry(name: string) {
		const entryPath = join(this.path, name);
		await rm(entryPath);
	}
}

/**
 * Converts a standard permission mode to a nodejs-compatible access flag.
 */
function fileSystemPermissionModeToNodejsFlags(mode: undefined): undefined;
function fileSystemPermissionModeToNodejsFlags(
	mode: FileSystemHandlePermissionMode,
): number;
function fileSystemPermissionModeToNodejsFlags(
	mode?: FileSystemHandlePermissionMode,
) {
	switch (mode) {
		case undefined: {
			return undefined;
		}
		case "read": {
			return constants.R_OK;
		}
		case "readwrite": {
			return constants.R_OK | constants.W_OK;
		}
	}
}
