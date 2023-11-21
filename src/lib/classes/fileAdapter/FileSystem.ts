export abstract class FileSystem {
	/**
	 * A method to open the file dialog to open a project
	 * @returns The path to the project
	 */
	abstract openDialog(): Promise<string | undefined>;

	/**
	 * A method to open the file dialog to save a project
	 * @param path The path to save the project to
	 * @returns The path the project was saved to
	 */
	abstract saveDialog(path: string | undefined): Promise<string | undefined>;

	/**
	 * A method to check if a path exists
	 * @param path The path to check
	 * @returns Whether the path exists
	 */
	abstract exists(path: string): Promise<boolean>;

	/**
	 * A method to create a directory
	 * @param path The path to create the directory at
	 * @returns A promise that resolves when the directory is created
	 */
	abstract createDir(path: string): Promise<void>;

	/**
	 * A method to write a JSON file
	 * @param path The path to write the file to
	 * @param content The content to write to the file
	 * @returns A promise that resolves when the file is written
	 */
	abstract writeFile(path: string, content: string): Promise<void>;

	/**
	 * A method to read a directory
	 * @param path The path to read
	 * @returns A promise that resolves with the contents of the directory
	 */
	abstract readDir(path: string): Promise<string[]>;

	/**
	 * A method to check whether a path is a file or not
	 * @param path The path to check
	 * @returns A boolean of whether the path is a file
	 */
	abstract isFile(path: string): Promise<boolean>;

	/**
	 * A method to check whether a path is a directory or not
	 * @param path The path to check
	 * @returns A boolean of whether the path is a directory
	 */
	abstract isDirectory(path: string): Promise<boolean>;

	/**
	 * A method to read a file
	 * @param path The path to read
	 * @returns A promise that resolves with the contents of the file
	 */
	abstract readFile(path: string): Promise<string>;

	// A boolean of whether the file system is supported
	static supported: boolean;
}
