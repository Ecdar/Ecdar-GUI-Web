import type {
	IDirectoryHandle,
	IFileHandle,
	IFileSystemHandle,
} from "../fileSystem/FileSystemImplementation";

/**
 * Defines a project stored in the file system.
 * The serialized version is used when saving to IndexedDB. Remember to deserialize it before using it.
 */
export interface ISerializedProjectAccess {
	/**
	 * A timestamp of the last time the user opened the project.
	 */
	lastAccessed: number;
	/**
	 * The DirectoryHandle that gives access to the project.
	 * Please remember to query and request permission to ensure you have access.
	 */
	directoryHandle: {
		name: string;
	};
}

/**
 * Defines a project stored in the filesystem.
 * Used to save recently accessed projects for easy resuming.
 */
export interface IProjectAccess<
	I extends IFileSystemHandle,
	F extends IFileHandle,
	D extends IDirectoryHandle<I, F>,
> extends ISerializedProjectAccess {
	/**
	 * A timestamp of the last time the user opened the project.
	 */
	lastAccessed: number;
	/**
	 * The DirectoryHandle that gives access to the project.
	 * Remember to query and request permission to ensure you have access.
	 */
	directoryHandle: D;
}

/**
 * Check if an object from the database satisfies the requirements for a ProjectAccess interface.
 *
 */
export function isSerializedProjectAccess(
	serialized: unknown,
): serialized is ISerializedProjectAccess {
	if (typeof serialized !== "object" || serialized === null) {
		return false;
	}
	if (
		!("lastAccessed" in serialized) ||
		typeof serialized.lastAccessed !== "number"
	) {
		return false;
	}
	if (
		!("directoryHandle" in serialized) ||
		typeof serialized.directoryHandle !== "object" ||
		serialized.directoryHandle === null
	) {
		return false;
	}
	if (
		!("name" in serialized.directoryHandle) ||
		typeof serialized.directoryHandle.name !== "string" ||
		serialized.directoryHandle.name === ""
	) {
		return false;
	}
	return true;
}
