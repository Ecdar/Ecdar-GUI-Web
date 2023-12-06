import type * as mime from "mime";

/* eslint-disable @typescript-eslint/no-unused-vars -- We declare global interfaces in here that are used elsewhere, but eslint thinks they are unused */

/**
 * As of 2023, the File System Access API is still experimental, so we have to define it ourselves.
 * It is very unlikely that the API will change in a way that would break this, so we are crossing our fingers and taking the chance.
 *
 * We are only defining the parts we use, so please check elsewhere if you are looking for the full spec.
 *
 * Most descriptions are imported from MDN: https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle
 */
type FileSystemHandlePermissionMode = "read" | "readwrite";
type FileSystemPickerOptions = {
	/**
	 * A string that defaults to "read" for read-only access or "readwrite" for read and write access to the directory.
	 */
	mode?: FileSystemHandlePermissionMode;
	/**
	 * A FileSystemHandle or a well known directory to open the dialog in.
	 */
	startIn?:
		| FileSystemHandle
		| "desktop"
		| "documents"
		| "downloads"
		| "images";
};
type FileSystemPickerTypes = {
	description?: string;
	accept: {
		[key: keyof mime.TypeMap]: string[];
	};
}[];
export global {
	NotAllowedError;
	/**
	 * Displays a directory picker which allows the user to select a directory.
	 */
	function showDirectoryPicker(
		options?: FileSystemPickerOptions,
	): Promise<FileSystemDirectoryHandle>;
	/**
	 * Shows a file picker which allows the user to select a file.
	 */
	function showOpenFilePicker(
		options?: FileSystemPickerOptions & {
			multiple?: boolean;
		},
	): Promise<FileSystemFileHandle[]>;
	/**
	 * Shows a file picker that allows a user to save a file. Either by selecting an existing file, or entering a name for a new file.
	 */
	function showSaveFilePicker(
		options?: FileSystemPickerOptions & {
			suggestedName?: string;
			types?: FileSystemPickerTypes;
		},
	): Promise<FileSystemFileHandle>;
	interface FileSystemHandle {
		/**
		 * Queries the current permission state of the current handle.
		 */
		queryPermission: (fileSystemHandlePermissionDescriptor?: {
			/**
			 * The permission mode to query for.
			 */
			mode?: FileSystemHandlePermissionMode;
		}) => Promise<PermissionStatus>;
		/**
		 * Requests read or readwrite permissions for the file handle.
		 */
		requestPermission: (fileSystemHandlePermissionDescriptor?: {
			/**
			 * The permission mode to query for.
			 */
			mode?: FileSystemHandlePermissionMode;
		}) => Promise<"granted" | "denied">;
	}
	interface FileSystemDirectoryHandle {
		entries: () => AsyncIterableIterator<
			[FileSystemHandle["name"], FileSystemHandle]
		>;
		values: () => AsyncIterableIterator<FileSystemHandle>;
	}
}
