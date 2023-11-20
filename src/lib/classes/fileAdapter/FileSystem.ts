export abstract class FileSystem {
	abstract openDialog(): Promise<string | undefined>;
	abstract saveDialog(path: string | undefined): Promise<string | undefined>;
	abstract exists(path: string): Promise<boolean>;
	abstract createDir(path: string): Promise<void>;
	abstract writeFile(path: string, content: string): Promise<void>;
	abstract readDir(path: string): Promise<string[]>;
	abstract isFile(path: string): boolean;
	abstract isDirectory(path: string): boolean;
	abstract readFile(path: string): Promise<string>;
	static supported: boolean;
}
