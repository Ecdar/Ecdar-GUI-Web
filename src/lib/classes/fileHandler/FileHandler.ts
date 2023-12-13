import {
	FileSystemHandlePermissionMode,
	type FileSystemFilePickerOptions,
	type FileSystemImplementation,
	type IDirectoryHandle,
	type IFileHandle,
	type IFileSystemHandle,
	type FileSystemOpenFilePickerOptions,
} from "../fileSystem/FileSystemImplementation";
import { getBestFileSystemImplementation } from "../fileSystem/FileSystemImplementations";
import type { z } from "zod";
import { deserializeRaw, serializeRaw } from "../projectHandler/zodSerializers";

const jsonAcceptType = {
	description: "JSON file",
	accept: {
		"application/json": [".json"],
	},
};

/**
 * A helper class to quickly load/export Projects to/from JSON:
 */
class FileHandler {
	fileSystem: FileSystemImplementation<
		IFileSystemHandle,
		IFileHandle,
		IDirectoryHandle<IFileSystemHandle, IFileHandle>
	> = getBestFileSystemImplementation();

	/**
	 * Will ask the user to choose a file in the filesystem, then open it and return its contents.
	 */
	async openFile(
		options?: Partial<
			FileSystemOpenFilePickerOptions<
				IFileSystemHandle,
				IFileHandle,
				IDirectoryHandle<IFileSystemHandle, IFileHandle>
			>
		>,
	): Promise<string[] | undefined> {
		const fileHandles = await this.fileSystem.showFilePicker({
			...options,
			mode: FileSystemHandlePermissionMode.read,
		});
		if (!fileHandles?.[0]) return;
		const contents = await Promise.all(
			fileHandles.map(async (fileHandle) => {
				const file = await fileHandle.getFile();
				return await file.text();
			}),
		);
		return contents;
	}

	/**
	 * Will ask the user to choose a file in the filesystem, then open it and return the deserialized object it contained.
	 */
	async openJsonFile<T>(
		schema: z.ZodType<T>,
		options?: Partial<
			FileSystemOpenFilePickerOptions<
				IFileSystemHandle,
				IFileHandle,
				IDirectoryHandle<IFileSystemHandle, IFileHandle>
			>
		>,
	): Promise<z.infer<typeof schema>[] | undefined> {
		const contents = await this.openFile({
			types: [jsonAcceptType],
			...options,
		});
		if (!contents) return;
		return contents.map((content) => {
			return deserializeRaw(schema, content);
		});
	}

	/**
	 * Will ask the user where to save a file in the system, then write the contents to that file.
	 */
	async saveFile(
		contents: string,
		options?: Partial<
			FileSystemFilePickerOptions<
				IFileSystemHandle,
				IFileHandle,
				IDirectoryHandle<IFileSystemHandle, IFileHandle>
			>
		>,
	): Promise<void> {
		const fsOptions = {
			...options,
			mode: FileSystemHandlePermissionMode.readwrite,
		};
		// ensure that there is a valid extension in the suggested name
		if (
			options?.suggestedName &&
			options.types?.[0] &&
			!options.suggestedName.match(/\..{1,10}$/gu)
		) {
			const extension = Object.values(options.types[0].accept)[0][0];
			if (extension)
				fsOptions.suggestedName = `${options.suggestedName}${extension}`;
		}
		const fileHandle = await this.fileSystem.showSaveFilePicker(fsOptions);
		if (!fileHandle) return;
		const writable = await fileHandle.createWritable({
			keepExistingData: false,
		});
		await writable.write(contents);
		await writable.close();
	}

	/**
	 * Will ask the user where to save a file in the system, then write the object serialized to that file.
	 */
	async saveJsonFile(
		contents: z.infer<z.AnyZodObject>,
		options?: Partial<
			FileSystemFilePickerOptions<
				IFileSystemHandle,
				IFileHandle,
				IDirectoryHandle<IFileSystemHandle, IFileHandle>
			>
		>,
	): Promise<void> {
		const text = serializeRaw(contents);
		await this.saveFile(text, { types: [jsonAcceptType], ...options });
	}
}

export const fileHandler = new FileHandler();
