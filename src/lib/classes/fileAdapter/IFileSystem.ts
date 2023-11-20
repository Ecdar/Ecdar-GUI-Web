export interface IFileSystem {
	openDialog(): Promise<string | undefined>;
	saveDialog(path: string | undefined): Promise<string | undefined>;
	exists(path: string): Promise<boolean>;
	createDir(path: string): Promise<void>;
	writeFile(path: string, content: string): Promise<void>;
	readDir(path: string): Promise<string[]>;
	isFile(path: string): boolean;
	isDirectory(path: string): boolean;
	readFile(path: string): Promise<string>;
}
