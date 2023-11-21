import { FileSystem } from "./FileSystem";
import type { IFileElement } from "./RecursiveFilesSystem";

export class FileSystemFallback extends FileSystem {
	private fileInput: HTMLInputElement;

	constructor() {
		super();
		this.fileInput = document.createElement("input");
		this.fileInput.type = "file";
		this.fileInput.webkitdirectory = true;
	}

	exists(path: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.fileInput.addEventListener("change", () => {
				if (this.fileInput.files != null) {
					const files = Array.from(this.fileInput.files).map(
						(file) => file.webkitRelativePath,
					);
					resolve(files.includes(path));
				} else {
					reject(new Error("No files selected"));
				}
			});
			this.fileInput.click();
		});
	}

	readDir(path: string): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			this.fileInput.addEventListener("change", () => {
				if (this.fileInput.files != null) {
					const files = Array.from(this.fileInput.files)
						.map((file) => file.webkitRelativePath)
						.filter((filePath) => filePath.startsWith(path));
					resolve(files);
				} else {
					reject(new Error("No files selected"));
				}
			});
			this.fileInput.click();
		});
	}

	async openDialog(): Promise<string | undefined> {
		return new Promise<string | undefined>((resolve) => {
			this.fileInput.addEventListener("change", () => {
				if (
					this.fileInput.files != null &&
					this.fileInput.files.length > 0
				) {
					resolve(this.fileInput.files[0].webkitRelativePath);
				} else {
					resolve(undefined);
				}
			});
			this.fileInput.click();
		});
	}

	saveDialog(path: string | undefined): Promise<string | undefined> {
		throw new Error("Method not implemented.");
	}

	createDir(path: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	writeFile(path: string, content: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async isFile(path: string): Promise<boolean> {
		if (path.endsWith(".json")) return true;

		return false;
	}
	async isDirectory(path: string): Promise<boolean> {
		return !this.isFile(path);
	}

	async readFile(path: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const input = document.createElement("input");
			input.type = "file";
			input.addEventListener("change", () => {
				if (input.files != null) {
					for (const file of input.files) {
						if (file.webkitRelativePath === path) {
							const reader = new FileReader();
							reader.addEventListener(
								"load",
								() => {
									resolve(reader.result as string);
								},
								{ once: true },
							);
							reader.readAsText(file);
							return;
						}
					}
					reject(
						new Error(`File ${path} not found in selected files`),
					);
				} else {
					reject(new Error("No files selected"));
				}
			});
			input.click();
		});
	}
}
