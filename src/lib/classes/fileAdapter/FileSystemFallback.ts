import { FileSystem } from "./FileSystem";

export class FileSystemFallback extends FileSystem {
	private fileInput: HTMLInputElement;

	constructor() {
		super();
		this.fileInput = document.createElement("input");
		this.fileInput.type = "file";
		this.fileInput.webkitdirectory = true;
	}

	exists(path: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	readDir(path: string): Promise<string[]> {
		// now that we have the relative wekit path, we can use it to get the directory
		return new Promise<string[]>((resolve, reject) => {
			if (this.fileInput.files && this.fileInput.files.length > 0) {
				const files = Array.from(this.fileInput.files)
					.filter((file: File) =>
						file.webkitRelativePath.startsWith(path),
					)
					.map((file: File) => file.webkitRelativePath);

				// some elements have too deep a path, so we filter them out

				const seenFolders: string[] = [];

				let filteredFiles = files.filter((file) => {
					const splitPath = file.split("/");

					// here we check if the split path is deeper than the path we are looking for
					// if it is we save the folder name and return false

					if (splitPath.length > path.split("/").length - 1) {
						const folderName =
							splitPath[path.split("/").length - 1];

						if (!seenFolders.includes(folderName)) {
							seenFolders.push(folderName);
							return false;
						}
					}

					return splitPath.length === path.split("/").length; // this starts with a / and there for we do not add one to the length
				});

				filteredFiles = filteredFiles.concat(seenFolders);
				resolve(filteredFiles);
			} else {
				reject("No files selected.");
			}
		});
	}

	async openDialog(): Promise<string | undefined> {
		return new Promise<string | undefined>((resolve) => {
			this.fileInput.addEventListener("change", () => {
				if (
					this.fileInput.files != null &&
					this.fileInput.files.length > 0
				) {
					resolve(
						this.fileInput.files[0].webkitRelativePath
							.split("/")
							.slice(0, -1)
							.join("/"),
					);
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
		if (path.endsWith(".json")) return Promise.resolve(true);

		return Promise.resolve(false);
	}

	async isDirectory(path: string): Promise<boolean> {
		return !(await this.isFile(path));
	}

	async readFile(path: string): Promise<string> {
		console.log("reading " + path);

		const test = await new Promise<string>((resolve, reject) => {
			if (this.fileInput.files != null) {
				for (const file of this.fileInput.files) {
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
				reject(new Error(`File ${path} not found in selected files`));
			} else {
				reject(new Error("No files selected"));
			}
			//input.click();
		});

		console.log(test);

		return test;
	}
}
