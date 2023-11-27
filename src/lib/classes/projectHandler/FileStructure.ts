import { z } from "zod";
import type {
	IDirectoryHandle,
	IFileHandle,
	IFileSystemHandle,
} from "../fileSystem/FileSystemImplementation";
import { deserializeRaw, serializeRaw } from "./zodSerializers";
import { ZodRawComponent } from "../automaton/component/raw/RawComponent";
import { ZodRawSystem } from "../automaton/system/raw/RawSystem";
import { ZodRawQuery } from "../automaton/raw/RawQuery";
import { ZodRawGlobalDeclarations } from "../automaton/raw/RawGlobalDeclarations";
import { ZodRawSystemDeclarations } from "../automaton/raw/RawSystemDeclarations";
import { ZodRawProject, type RawProject } from "../automaton/raw/RawProject";

/**
 * Represents a generic file structure.
 * This is used by the FileAdapter to wirte and read the Project from the file system.
 */
abstract class FileStructure<
	R extends z.infer<z.AnyZodObject | z.ZodUndefined>,
	H extends IFileSystemHandle,
> {
	/**
	 * Takes a FileSystemHandle and reads it to produce a raw representation of the item.
	 */
	abstract toRaw(handle: H): Promise<z.infer<z.ZodType<R>> | undefined>;
	/**
	 * Taks a raw representation of the item and writes it to a FileSystemHandle.
	 */
	abstract fromRaw(handle: H, raw: R): Promise<boolean>;
}

/**
 * Represents a generic file in the file structure.
 */
class FileStructureFile<
	R extends z.infer<z.AnyZodObject | z.ZodUndefined>,
> extends FileStructure<R, IFileHandle> {
	constructor(readonly rawParser: z.ZodType<R>) {
		super();
	}
	async toRaw(handle: IFileHandle) {
		const serialized = await (await handle.getFile()).text();
		return deserializeRaw(this.rawParser, serialized);
	}
	async fromRaw(handle: IFileHandle, raw: R) {
		const serialized = raw ? serializeRaw(raw) : undefined;
		const fileStream = await handle.createWritable({
			keepExistingData: false,
		});
		if (serialized) await fileStream.write(serialized);
		await fileStream.close();
		return true;
	}
}

/**
 * Represents a generic directory in the file structure.
 */
abstract class FileStructureDirectory<
	R extends z.infer<z.AnyZodObject | z.ZodUndefined>,
> extends FileStructure<R, IDirectoryHandle<IFileSystemHandle, IFileHandle>> {}

/**
 * Represents a named item entry in a directory.
 */
type DirectoryNamedEntry<R extends z.infer<z.AnyZodObject>> = {
	[K in keyof R]: {
		name: FileSystemFileHandle["name"];
		structure: FileStructureFile<R[K]> | FileStructureDirectory<R[K]>;
	};
};

/**
 * Represents a generic directory in the file structure, which has named entries for specific files.
 *
 * When writing to this directory, file that are not part of the entries are not removed.
 */
class FileStructureDirectoryNamed<
	R extends z.infer<z.AnyZodObject>,
> extends FileStructureDirectory<R> {
	constructor(
		readonly rawParser: z.ZodType<R>,
		readonly entries: DirectoryNamedEntry<R>,
	) {
		super();
	}
	async toRaw(
		handle: IDirectoryHandle<IFileSystemHandle, IFileHandle>,
	): Promise<{
		[K in keyof R]: Awaited<
			ReturnType<DirectoryNamedEntry<R>[K]["structure"]["toRaw"]>
		>;
	}> {
		const raw: Partial<R> = {};
		for (const key in this.entries) {
			const entry = this.entries[key];
			if (entry.structure instanceof FileStructureFile) {
				let itemHandle: IFileHandle | undefined;
				try {
					itemHandle = await handle.getFileHandle(entry.name, {
						create: false,
					});
				} catch {
					continue;
				}
				if (!itemHandle) continue;
				raw[key] = await entry.structure.toRaw(itemHandle);
			} else if (entry.structure instanceof FileStructureDirectory) {
				let itemHandle:
					| IDirectoryHandle<IFileSystemHandle, IFileHandle>
					| undefined;
				try {
					itemHandle = await handle.getDirectoryHandle(entry.name, {
						create: false,
					});
				} catch {
					continue;
				}
				if (!itemHandle) continue;
				raw[key] = await entry.structure.toRaw(itemHandle);
			} else {
				throw new TypeError("Unknown file structure");
			}
		}
		return raw as R;
	}
	async fromRaw(
		handle: IDirectoryHandle<IFileSystemHandle, IFileHandle>,
		raw: R,
	) {
		for (const key in this.entries) {
			const entry = this.entries[key];
			if (raw[key]) {
				if (entry.structure instanceof FileStructureFile) {
					const itemHandle = await handle.getFileHandle(entry.name, {
						create: true,
					});
					if (!itemHandle) return false;
					await entry.structure.fromRaw(itemHandle, raw[key]);
				} else {
					const itemHandle = await handle.getDirectoryHandle(
						entry.name,
						{
							create: true,
						},
					);
					if (!itemHandle) return false;
					await entry.structure.fromRaw(itemHandle, raw[key]);
				}
			} else {
				await handle.removeEntry(entry.name, { recursive: true });
			}
		}
		return true;
	}
}

/**
 * Represents a generic directory in the file structure, where each file in the directory is part of an array of items.
 *
 * When writing to this directory, files that are not part of the array will be removed.
 */
class FileStructureArrayDirectory<
	R extends z.infer<z.AnyZodObject | z.ZodUndefined> & { name: string },
> extends FileStructureDirectory<R[]> {
	constructor(readonly rawParser: z.ZodType<R>) {
		super();
	}
	async toRaw(handle: IDirectoryHandle<IFileSystemHandle, IFileHandle>) {
		const rawItems: R[] = [];
		for await (const itemHandle of handle.values()) {
			if (!isFileHandle(itemHandle)) continue;
			const serialized = await (await itemHandle.getFile()).text();
			rawItems.push(deserializeRaw(this.rawParser, serialized));
		}
		if (rawItems.length === 0) {
			return undefined;
		} else {
			return rawItems;
		}
	}
	async fromRaw(
		handle: IDirectoryHandle<IFileSystemHandle, IFileHandle>,
		rawItems: R[],
	) {
		const names = new Set(rawItems.map((rawItem) => rawItem.name));
		// Remove files that should not be there
		for await (const itemHandle of handle.values()) {
			if (
				!isFileHandle(itemHandle) ||
				!itemHandle.name.endsWith(".json") ||
				!names.has(itemHandle.name.slice(0, -5))
			) {
				await handle.removeEntry(itemHandle.name, { recursive: true });
			}
		}
		// Add/overwrite files with the new content
		for (const rawItem of rawItems) {
			const fileHandleName = `${rawItem.name}.json`;
			const fileHandle = await handle.getFileHandle(fileHandleName, {
				create: true,
			});
			if (!fileHandle) return false;
			const fileStream = await fileHandle.createWritable({
				keepExistingData: false,
			});
			await fileStream.write(serializeRaw(rawItem));
			await fileStream.close();
		}
		return true;
	}
}

/**
 * Represents the structure of the Project in the file system.
 */
export class FileStructureProject extends FileStructureDirectoryNamed<RawProject> {
	constructor() {
		super(ZodRawProject, {
			components: {
				name: "Components",
				structure: new FileStructureArrayDirectory(ZodRawComponent),
			},
			systems: {
				name: "Systems",
				structure: new FileStructureArrayDirectory(ZodRawSystem),
			},
			queries: {
				name: "Queries.json",
				structure: new FileStructureFile(z.array(ZodRawQuery)),
			},
			globalDeclarations: {
				name: "GlobalDeclarations.json",
				structure: new FileStructureFile(ZodRawGlobalDeclarations),
			},
			systemDeclarations: {
				name: "SystemDeclarations.json",
				structure: new FileStructureFile(ZodRawSystemDeclarations),
			},
		});
	}
}

function isFileHandle(handle: IFileSystemHandle): handle is IFileHandle {
	return handle.kind === "file";
}
