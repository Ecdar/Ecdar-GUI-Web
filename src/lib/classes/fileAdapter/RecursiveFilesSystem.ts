import type { FileSystem } from "./FileSystem";

export interface IFileElement {
	type: "file" | "directory";
	filename: string;
	content?: string;
	children?: IFileElement[];
}

export async function writeProjectRecursive(
	fileElement: IFileElement,
	relativePath: string,
	fs: FileSystem,
): Promise<void> {
	console.info("WRITING TO " + relativePath + fileElement.filename);

	switch (fileElement.type) {
		case "directory": {
			if (!(await fs.exists(relativePath + fileElement.filename))) {
				await fs.createDir(relativePath + fileElement.filename);
			}

			for (const childElement of fileElement.children ?? []) {
				await writeProjectRecursive(
					childElement,
					relativePath + fileElement.filename + "/",
					fs,
				);
			}

			break;
		}

		case "file": {
			await fs.writeFile(
				relativePath + fileElement.filename,
				fileElement.content ?? "",
			);
			break;
		}
	}
}

export async function readProjectRecursive(
	relativePath: string,
	fs: FileSystem,
): Promise<IFileElement> {
	const fileElement: IFileElement = {
		type: "directory",
		filename: relativePath.split("/").slice(-2)[0],
		children: [],
	};

	const filenames = await fs.readDir(relativePath);

	for (const filename of filenames) {
		if (fs.isDirectory(relativePath + filename)) {
			if (/\/\.[^/]*\/?$/u.test(relativePath + filename + "/")) continue;

			fileElement.children?.push(
				await readProjectRecursive(relativePath + filename + "/", fs),
			);
		} else if (fs.isFile(relativePath + filename)) {
			fileElement.children?.push({
				type: "file",
				filename,
				content: await fs.readFile(relativePath + filename),
			});
		}
	}

	return fileElement;
}
