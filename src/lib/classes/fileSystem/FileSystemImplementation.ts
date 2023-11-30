import type * as mime from "mime";
import type {
	IProjectAccess,
	ISerializedProjectAccess,
} from "../projectHandler/ProjectAccess";

export enum FileSystemHandlePermissionMode {
	read = "read",
	readwrite = "readwrite",
}

export type FileSystemQueryState = "granted" | "denied" | "prompt";
export type FileSystemRequestState = "granted" | "denied";

/**
 * A stream that allows you to write content to a file in the file system.
 */
export interface IFileSystemWriteable {
	/**
	 * Will write the content to the file.
	 * Data is appended to any existing data in the file.
	 *
	 * WARNING: The file is not actually written to the disk until the `close` method is called.
	 */
	write(data: string): Promise<void>;
	/**
	 * Will close the stream and write the file to the actual file system.
	 */
	close(): Promise<void>;
}

export type FileSystemCreateWritableOptions = {
	/**
	 * If true, the writer will append all data to the file.
	 * If false, the writer will overwrite the contenst of the file.
	 */
	keepExistingData?: boolean;
};

/**
 * Represents an item in the file system.
 */
export interface IFileSystemHandle {
	/**
	 * Whether its a file or directory.
	 */
	kind: FileSystemHandle["kind"];
	/**
	 * The name of the item, e.g. "Queries.json" or "Systems".
	 */
	name: FileSystemHandle["name"];
	/**
	 * Check whether the user has granted access to the item.
	 */
	queryPermission(options: {
		mode: FileSystemHandlePermissionMode;
	}): Promise<{ state: FileSystemQueryState }>;
	/**
	 * Ask the user for permission to access the item.
	 */
	requestPermission(options: {
		mode: FileSystemHandlePermissionMode;
	}): Promise<FileSystemRequestState>;
}

/**
 * Represents a file in the file system.
 */
export interface IFileHandle extends IFileSystemHandle {
	kind: FileSystemFileHandle["kind"];
	/**
	 * Get an interface that allows you to read the contents of the file.
	 */
	getFile: FileSystemFileHandle["getFile"];
	/**
	 * Get a stream that writes to the file.
	 */
	createWritable(
		options?: FileSystemCreateWritableOptions,
	): Promise<IFileSystemWriteable>;
}

export type DirectoryGetHandleOptions = {
	/**
	 * If the item does not exist, should it be created?
	 */
	create: boolean;
};

export type DirectoryRemoveOptions = {
	/**
	 * If false and the item is a directory with contents, the function will reject.
	 * If true, the function will always remove the directory.
	 */
	recursive: boolean;
};

/**
 * Represents a directory in the file system.
 */
export interface IDirectoryHandle<
	I extends IFileSystemHandle,
	F extends IFileHandle,
> extends IFileSystemHandle {
	kind: FileSystemDirectoryHandle["kind"];
	/**
	 * Asynchronously returns all files and directories in the directory.
	 */
	values(): AsyncIterableIterator<I>;
	/**
	 * Asynchronously returns all files and directories in the directory, mapped by their name.
	 */
	entries(): AsyncIterableIterator<[IFileSystemHandle["name"], I]>;
	/**
	 * Gets the directory with that name.
	 *
	 * TODO: This is causing type errors in the implementations. Seems like it has something to do with it returning "this". Please fix.
	 *
	 * @throws can either return undefined or throw an error if the item os not accessible.
	 */
	getDirectoryHandle(
		name: IFileSystemHandle["name"],
		options?: DirectoryGetHandleOptions,
	): Promise<this | undefined>;
	/**
	 * Gets the file with that name.
	 *
	 * @throws can either return undefined or throw an error if the item os not accessible.
	 */
	getFileHandle(
		name: IFileSystemHandle["name"],
		options?: DirectoryGetHandleOptions,
	): Promise<F | undefined>;
	/**
	 * Removes a named directory in the directory.
	 */
	removeEntry(
		name: FileSystemFileHandle["name"],
		options?: DirectoryRemoveOptions,
	): Promise<void>;
}

export enum FileSystemWellKnownDirectory {
	desktop = "desktop",
	documents = "documents",
	downloads = "downloads",
	images = "images",
}

export type FileSystemPickerOptions<
	I extends IFileSystemHandle,
	F extends IFileHandle,
	D extends IDirectoryHandle<I, F>,
> = {
	/**
	 * A string that defaults to "read" for read-only access or "readwrite" for read and write access to the directory.
	 */
	mode: FileSystemHandlePermissionMode;
	/**
	 * An IDirectoryHandle or a well known directory to open the dialog in.
	 */
	startIn?: D | FileSystemWellKnownDirectory;
	/**
	 * Define what the title of the picker should be.
	 */
	pickerTitle?: string;
	/**
	 * This will be the default name of the item.
	 */
	suggestedName?: string;
};

export type FileSystemSaveDirectoryPickerOptions<
	I extends IFileSystemHandle,
	F extends IFileHandle,
	D extends IDirectoryHandle<I, F>,
> = FileSystemPickerOptions<I, F, D> & {
	/**
	 * If true, will ensure that the directory returned has the suggestedName.
	 * If the user picks a directory that does not have the name, a subdirectory is created with that name.
	 */
	enforceName?: boolean;
};

export type FileSystemFilePickerOptions<
	I extends IFileSystemHandle,
	F extends IFileHandle,
	D extends IDirectoryHandle<I, F>,
> = FileSystemPickerOptions<I, F, D> & {
	/**
	 * A list of filetypes that are allowed.
	 */
	types?: FileSystemSaveTypes;
};

export type FileSystemSaveTypes = {
	/**
	 * An optional description of the file type.
	 */
	description: string;
	/**
	 * An object with keys of mime types corresponding to an array of file extensions that should match that mime type.
	 */
	accept: {
		[key: keyof mime.TypeMap]: string[];
	};
}[];

export type FileSystemOpenFilePickerOptions<
	I extends IFileSystemHandle,
	F extends IFileHandle,
	D extends IDirectoryHandle<I, F>,
> = FileSystemFilePickerOptions<I, F, D> & {
	/**
	 * Whether the user can define multiple files to be opened, or just one.
	 */
	multiple?: boolean;
};

/**
 * Defines a standard interface for accessing the file system.
 *
 * We can then write different adapters for different environments.
 */
export abstract class FileSystemImplementation<
	I extends IFileSystemHandle,
	F extends IFileHandle,
	D extends IDirectoryHandle<I, F>,
> {
	/**
	 * Displays a directory picker which allows the user to grant access to a directory.
	 */
	abstract showDirectoryPicker(
		options: FileSystemPickerOptions<I, F, D>,
	): Promise<D | undefined>;

	/**
	 * Displays a directory picker which allows the user to create a new directory or select an existing one and grant access to it.
	 */
	abstract showSaveDirectoryPicker(
		options: FileSystemSaveDirectoryPickerOptions<I, F, D>,
	): Promise<D | undefined>;

	/**
	 * Displays a file picker which allows the user to grant access to a file.
	 */
	abstract showFilePicker(
		options: FileSystemOpenFilePickerOptions<I, F, D>,
	): Promise<F[] | undefined>;

	/**
	 * Displays a file picker which allows the user to create a new file or select an existing one and grant access to it.
	 */
	abstract showSaveFilePicker(
		options: FileSystemFilePickerOptions<I, F, D>,
	): Promise<F | undefined>;

	/**
	 * Takes a serialized project access DirectoryHandle and returns a deserialized version.
	 * @throws if the serialized version was made by an incompatible file system implementation.
	 */
	abstract deserializeProjectAccess(
		projectAccess: ISerializedProjectAccess,
	): IProjectAccess<I, F, D>;
}
